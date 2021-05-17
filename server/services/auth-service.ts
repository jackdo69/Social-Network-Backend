import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

enum type {
    access = 'access',
    refresh = 'refresh'
}
const generateToken = (type: type, username: string) => {
    switch (type) {
        case 'access':
            return jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        case 'refresh':
            return jwt.sign(username, REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
    }
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({
        message: 'Unauthorized'
    });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, username) => {
        if (err) res.status(403).json({
            message: 'Fobidden!'
        });
        req.body.username = username;
        next();
    });
};

export {
    generateToken, authenticate
};