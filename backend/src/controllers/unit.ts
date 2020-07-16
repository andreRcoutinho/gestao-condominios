import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as unitService from '../services/unit';
import * as unitRules from '../rules/unit';
import { ApiResponse } from '../api/api_response';
import { INVALID_JSON_BODY } from '../api/api_errors';

const UNIT_INDEX_REQUEST: String = "Frações";
const UNIT_INDEX_MESSAGE_SUCCESS: String = "Todas as frações retornadas com sucesso!";
const UNIT_INDEX_MESSAGE_FAILED: String = "Ocorreu um erro ao retornar todas as frações.";

const UNIT_SHOW_REQUEST: String = "Fração";
const UNIT_SHOW_MESSAGE_SUCCESS: String = "Fração retornada com sucesso!";
const UNIT_SHOW_MESSAGE_FAILED: String = "Ocorreu um erro ao retornar a fração.";

const UNIT_CREATE_REQUEST: String = "Criar Fração";
const UNIT_CREATE_MESSAGE_SUCCESS: String = "Fração criada com sucesso!";
const UNIT_CREATE_MESSAGE_FAILED: String = "Ocorreu um erro ao criada fração.";

const UNIT_UPDATE_REQUEST: String = "Alterar Fração";
const UNIT_UPDATE_MESSAGE_SUCCESS: String = "Fração alterada com sucesso!";
const UNIT_UPDATE_MESSAGE_FAILED: String = "Ocorreu um erro ao alterar fração.";

export async function index(req: Request, res: Response) {
    var response = await unitService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(UNIT_INDEX_REQUEST, UNIT_INDEX_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(UNIT_INDEX_REQUEST, UNIT_INDEX_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {
    var response = await unitService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(UNIT_SHOW_REQUEST, UNIT_SHOW_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(UNIT_SHOW_REQUEST, UNIT_SHOW_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function create(req: Request, res: Response) {
    if (!unitRules.createRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(UNIT_CREATE_REQUEST, UNIT_CREATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    var response = await unitService.create(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(UNIT_CREATE_REQUEST, UNIT_CREATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(UNIT_CREATE_REQUEST, UNIT_CREATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {
    if (!unitRules.updateRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(UNIT_UPDATE_REQUEST, UNIT_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    var response = await unitService.update(req.body, Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(UNIT_UPDATE_REQUEST, UNIT_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(UNIT_UPDATE_REQUEST, UNIT_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}