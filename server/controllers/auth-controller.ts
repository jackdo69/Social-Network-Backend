import * as esClient from "../services/elasticsearch-service";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../services/error-service";
import validate from '../services/validate-service';
import { Request, Response, NextFunction } from 'express';

interface registerData {
  username: string,
  email: string,
  password: string;
}

const usernameExisted = async (username: string) => {
  const results = await esClient.searchBySingleField('user', { field: 'username', phrase: username });
  return !!results.length;
};

const emailExisted = async (email: string) => {
  const results = await esClient.searchBySingleField('user', { field: 'email', phrase: email });
  return !!results.length;
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate the request
    const { username, email, password } = req.body;
    const id = uuidv4();
    const registerUser = { id, username, email, password };
    validate('user.json', registerUser);

    //check if user existed
    if (usernameExisted(username) || emailExisted(email)) throw new CustomError(422, "The user already existed, please try to login instead!");

    //created user
    await esClient.store(
      "user",
      id,
      {
        username, email, password
      }
    );
    //TODO do verify email
    //log user in
  } catch (e) {

  }


};

const login = async (req: Request, res: Response, next: NextFunction) => { };
const logout = async (req: Request, res: Response, next: NextFunction) => { };
const renewToken = async (req: Request, res: Response, next: NextFunction) => { };

export {
  register, login, logout, renewToken
};
