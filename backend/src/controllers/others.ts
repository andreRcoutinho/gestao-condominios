import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { ApiResponse } from '../api/api_response';

// Sign up
const MONTHLY_DATE_REQUEST = "";
const MONTHLY_DATA_INVALID: String = 'Invalid year and month in Monthly Data request';


export async function monthlyData(req: Request, res: Response) {
    if (!req.query.year || !req.query.month) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(MONTHLY_DATE_REQUEST, MONTHLY_DATA_INVALID, HttpStatus.NOT_FOUND, {}, "Invalid or nonexistent year or month"))
    }


}

export async function simPaymentMap(req: Request, res: Response) {
    return res.send('TO DO')
}