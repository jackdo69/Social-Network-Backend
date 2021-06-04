import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, TOKEN_EXPIRE } from '../config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from "./error-service";


const generateToken = (type: 'access' | 'refresh', userId: string) => {
    switch (type) {
        case 'access':
            return jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: +TOKEN_EXPIRE });
        case 'refresh':
            return jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET);
    }
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next(new CustomError(401, "Unauthorized!"));

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return next(new CustomError(403, "Invalid access token!"));
        next();
    });
};

export {
    generateToken, authenticate
};