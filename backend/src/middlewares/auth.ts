import jwt from 'jsonwebtoken';
import { SECRET } from '../config/auth';
import { Request, Response, NextFunction } from 'express';

import { NO_PERMISSION, INVALID_TOKEN_FORMATT, INVALID_TOKEN } from '../api/api_errors';
import HttpStatus from 'http-status-codes';
import { ApiResponse } from '../api/api_response';

const REQUEST: String = 'Request';
const REQUEST_FAILED: String = 'Failed to request'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    var authHeader: string = req.headers.authorization;

    if (!authHeader) {
        return res.send(new ApiResponse(REQUEST, REQUEST_FAILED, HttpStatus.UNAUTHORIZED, {}, NO_PERMISSION))
    }

    var parts: string[] = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.send(new ApiResponse(REQUEST, REQUEST_FAILED, HttpStatus.UNAUTHORIZED, {}, INVALID_TOKEN_FORMATT))
    }

    var [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.send(new ApiResponse(REQUEST, REQUEST_FAILED, HttpStatus.UNAUTHORIZED, {}, INVALID_TOKEN_FORMATT))
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err)
            return res.send(new ApiResponse(REQUEST, REQUEST_FAILED, HttpStatus.UNAUTHORIZED, {}, INVALID_TOKEN))
        req["role"] = decoded["role"];
        return next();
    });
};

export default authMiddleware;
