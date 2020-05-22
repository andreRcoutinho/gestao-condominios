import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { ApiResponse } from '../api/api_response';
import * as othersService from '../services/others';

// Sign up
const MONTHLY_DATA_REQUEST = "";
const MONTHLY_DATA_INVALID: String = 'Invalid year and month in Monthly Data request';
const MONTHLY_DATE_SUCCESS = "Success";
const MONTHLY_DATE_FAIL = "Fail";


export async function monthlyData(req: Request, res: Response) {
    if (!req.query.year || !req.query.month) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(MONTHLY_DATA_REQUEST, MONTHLY_DATA_INVALID, HttpStatus.NOT_FOUND, {}, "Invalid or nonexistent year or month"))
    }

    let response = await othersService.monthlyData(Number(req.query.month), req.query.year.toString());

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(MONTHLY_DATA_REQUEST, MONTHLY_DATE_FAIL, HttpStatus.NOT_FOUND, {}, response.message))
    } else {
        return res.send(new ApiResponse(MONTHLY_DATA_REQUEST, MONTHLY_DATE_SUCCESS, HttpStatus.OK, response))
    }

}

export async function simPaymentMap(req: Request, res: Response) {
    return res.send('TO DO')
}