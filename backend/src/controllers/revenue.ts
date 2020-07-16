import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as revenueService from '../services/revenue';
import * as revenueRules from '../rules/revenue';
import { ApiResponse } from '../api/api_response';

const REVENUE_INDEX_REQUEST: String = 'Todas as receitas.';
const REVENUE_INDEX_SUCCESS: String = 'Todas as receitas retornadas com sucesso!';
const REVENUE_INDEX_FAIL: String = 'Ocorreu um erro ao retornar todas as receitas.';

const PAYMENT_RECORD_REQUEST: String = 'Registar receita';
const PAYMENT_RECORD_REQUEST_SUCCESS: String = 'Movimento registado!';
const PAYMENT_RECORD_REQUEST_FAIL: String = 'Ocorreu um erro! Tente novamente.';

export async function payment_record(req: Request, res: Response) {
    if (!revenueRules.paymentRecordRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_RECORD_REQUEST, PAYMENT_RECORD_REQUEST_FAIL, HttpStatus.BAD_REQUEST, {}, PAYMENT_RECORD_REQUEST_FAIL));
    }

    let response = await revenueService.payment_record(req.body);
    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_RECORD_REQUEST, PAYMENT_RECORD_REQUEST_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(PAYMENT_RECORD_REQUEST, PAYMENT_RECORD_REQUEST_SUCCESS, HttpStatus.OK, response));
    }
}

export async function index(req: Request, res: Response) {
    let response = await revenueService.index((req.query.year) ? req.query.year.toString() : null);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(REVENUE_INDEX_REQUEST, REVENUE_INDEX_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(REVENUE_INDEX_REQUEST, REVENUE_INDEX_SUCCESS, HttpStatus.OK, response));
    }
}
