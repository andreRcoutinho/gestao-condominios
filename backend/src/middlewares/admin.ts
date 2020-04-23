import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../api/api_response';
import { NO_ADMIN_PERMISSION } from '../api/api_errors';
import HttpStatus from 'http-status-codes';

const REQUEST: String = 'Request';
const REQUEST_FAILED: String = 'Failed to request'

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req["role"] === "Administrador") {
        next();
    } else {
        return res.send(new ApiResponse(REQUEST, REQUEST_FAILED, HttpStatus.UNAUTHORIZED, {}, NO_ADMIN_PERMISSION));
    }
}

export default adminMiddleware;