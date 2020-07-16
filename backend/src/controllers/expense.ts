import { Request, Response } from 'express';
import * as expenseService from '../services/expense';
import * as expenseRules from '../rules/expense';
import { ApiResponse } from '../api/api_response';
import { INVALID_JSON_BODY } from '../api/api_errors';
import HttpStatus from 'http-status-codes';

const EXPENSE_CREATE_REQUEST: String = 'Registar despesa';
const EXPENSE_CREATE_MESSAGE_FAIL: String = 'Ocorreu um erro ao registar uma despesa.';
const EXPENSE_CREATE_MESSAGE_SUCCESS: String = 'Despesa registada!';

const EXPENSE_SHOW_REQUEST: String = 'Visualizar Despesa';
const EXPENSE_SHOW_MESSAGE_SUCCESS: String = 'Despesa visualizada com sucesso!';
const EXPENSE_SHOW_MESSAGE_FAIL: String = 'Ocorreu um erro ao visualizar uma despesa.';

const EXPENSE_INDEX_REQUEST: String = 'Todas as Despesas';
const EXPENSE_INDEX_SUCCESS: String = 'Todas as Despesas com sucesso.';
const EXPENSE_INDEX_FAIL: String = 'Ocorreu um erro ao recuperar todas as despesas.';

const EXPENSE_UPDATE_REQUEST: String = 'Alterar Despesa.';
const EXPENSE_UPDATE_SUCCESS: String = 'Despesa alterada com sucesso!';
const EXPENSE_UPDATE_FAIL: String = 'Ocorreu um erro ao alterar a despesa.';

const EXPENSE_REMOVE_REQUEST: String = 'Remover uma Despesa';
const EXPENSE_REMOVE_MESSAGE_SUCCESS: String = 'Despesa removida com sucesso!';
const EXPENSE_REMOVE_MESSAGE_FAIL: String = 'Ocorreu um erro ao remover a despesa.';

export async function index(req: Request, res: Response) {
    let response = await expenseService.index((req.query.year) ? req.query.year.toString() : null);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(EXPENSE_INDEX_REQUEST, EXPENSE_INDEX_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_INDEX_REQUEST, EXPENSE_INDEX_SUCCESS, HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {
    let response = await expenseService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(EXPENSE_SHOW_REQUEST, EXPENSE_SHOW_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_SHOW_REQUEST, EXPENSE_SHOW_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function create(req: Request, res: Response) {
    if (!expenseRules.createRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await expenseService.create(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, response, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {
    let response = await expenseService.update(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(EXPENSE_UPDATE_REQUEST, EXPENSE_UPDATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_UPDATE_REQUEST, EXPENSE_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function remove(req: Request, res: Response) {
    let response = await expenseService.remove(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(EXPENSE_REMOVE_REQUEST, EXPENSE_REMOVE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_REMOVE_REQUEST, EXPENSE_REMOVE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}
