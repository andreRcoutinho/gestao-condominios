import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as revenueService from '../services/revenue';
import * as revenueRules from '../rules/revenue';
import { ApiResponse } from "../api/api_response";
import { INVALID_JSON_BODY } from "../api/api_errors";

//Payment Record
const PAYMENT_RECORD_REQUEST: String = 'Payment Record Request';
const PAYMENT_RECORD_REQUEST_SUCCESS: String = 'Payment Record successfully';
const PAYMENT_RECORD_REQUEST_FAIL: String = 'Failed to Payment Record';

export async function payment_record(req: Request, res: Response) {
    if (!revenueRules.paymentRecordRules(req.body)) {
        return res.send(new ApiResponse(PAYMENT_RECORD_REQUEST, PAYMENT_RECORD_REQUEST_FAIL, HttpStatus.NOT_FOUND, {}, INVALID_JSON_BODY))
    }

    let response = await revenueService.payment_record(req.body);
    if (response instanceof Error) {
        return res.send(new ApiResponse(PAYMENT_RECORD_REQUEST, PAYMENT_RECORD_REQUEST_FAIL, HttpStatus.NOT_FOUND, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_RECORD_REQUEST, PAYMENT_RECORD_REQUEST_SUCCESS, HttpStatus.OK, response))
    }
}