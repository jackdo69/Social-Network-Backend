import * as esClient from '../services/elasticsearch-service';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../services/error-service';
import validate from '../services/validate-service';
import { Request, Response, NextFunction } from 'express';
import * as auth from '../services/auth-service';
import Redis from 'ioredis';
import { REDIS_OPTIONS, REDIS_EXPIRE, REFRESH_TOKEN_SECRET } from '../config';
import jwt from 'jsonwebtoken';

const redis = new Redis(REDIS_OPTIONS);
const INDEX = process.env.NODE_ENV === 'dev' ? 'user' : 'user-test';

const usernameExisted = async (username: string) => {
  const results = await esClient.searchBySingleField(INDEX, { field: 'username', phrase: username });
  return !!results.length;
};

const emailExisted = async (email: string) => {
  const results = await esClient.searchBySingleField(INDEX, { field: 'email', phrase: email });
  return !!results.length;
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return next(new CustomError(422, 'Missing required parameters!'));
    const id = uuidv4();
    const registerUser = { id, username, email, password };
    validate('user.json', registerUser);
    const isUsernameExisted = await usernameExisted(username);
    const isEmailExisted = await emailExisted(email);
    if (isUsernameExisted || isEmailExisted)
      return next(new CustomError(422, 'The user already existed, please try to login instead!'));
    await esClient.store(INDEX, id, {
      username,
      email,
      password,
    });
    //TODO do verify email
    //log user in
    const accessToken = auth.generateToken('access', id);
    const refreshToken = auth.generateToken('refresh', id);

    //Store refresh token to redis
    redis.set(accessToken, refreshToken);
    redis.expire(accessToken, +REDIS_EXPIRE);
    res.status(201).json({ accessToken, refreshToken });
  } catch (e) {
    if (e instanceof CustomError) return next(e);
    return next(new CustomError(500, 'Internal server error!'));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const result = await esClient.searchBySingleField(INDEX, { field: 'username', phrase: username });
    if (!result.length) return next(new CustomError(401, 'Invalid username or password!'));
    const existedUser = result[0]._source;
    if (!existedUser || existedUser.password !== password)
      return next(new CustomError(401, 'Invalid username or password!'));
    const userId = result[0]._id;
    const accessToken = auth.generateToken('access', userId);
    const refreshToken = auth.generateToken('refresh', userId);
    redis.set(refreshToken, accessToken);
    redis.expire(accessToken, +REDIS_EXPIRE);
    res.status(202).json({ accessToken, refreshToken });
  } catch (e) {
    console.log(e);
    return next(new CustomError(500, 'Internal server error!'));
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) return next(new CustomError(401, 'Unauthorized!'));
  redis.del(accessToken);
  res.status(200).json({ message: 'Log out successfully!' });
};

const renewToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = req.body.refreshToken;

  if (!accessToken) return next(new CustomError(401, 'Unauthorized!'));
  if (!refreshToken) return next(new CustomError(422, 'Missing refresh token!'));
  const storedAccessToken = await redis.get(refreshToken);
  if (!storedAccessToken) return next(new CustomError(404, 'Your refresh token has been expired!'));
  const decoded: { userId: string } = jwt.decode(storedAccessToken);
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err) => {
    if (err) return next(new CustomError(500, 'Internal server error!'));
    const freshAccessToken = auth.generateToken('access', decoded.userId);
    res.status(202).json({ accessToken: freshAccessToken });
  });
};

export { register, login, logout, renewToken };
