import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { ApiResponse } from '../api/api_response';
import * as othersService from '../services/others';

const MONTHLY_DATA_REQUEST = "Dados mensais";
const MONTHLY_DATA_INVALID: String = 'Mês ou ano inválidos.';
const MONTHLY_DATE_SUCCESS = "Dados mensais retornados com sucesso!";
const MONTHLY_DATE_FAIL = "Ocorreu um erro ao retornar os dados mensais.";

export async function monthlyData(req: Request, res: Response) {
    if (!req.query.year || !req.query.month) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(MONTHLY_DATA_REQUEST, MONTHLY_DATA_INVALID, HttpStatus.BAD_REQUEST, {}, "Invalid or nonexistent year or month"))
    }

    let response = await othersService.monthlyData(Number(req.query.month), req.query.year.toString());

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(MONTHLY_DATA_REQUEST, MONTHLY_DATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(MONTHLY_DATA_REQUEST, MONTHLY_DATE_SUCCESS, HttpStatus.OK, response))
    }
}