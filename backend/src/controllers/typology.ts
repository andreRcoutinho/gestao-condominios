import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as typologyRules from '../rules/typology';
import * as typologyServices from '../services/typology';
import { ApiResponse } from '../api/api_response';
import { INVALID_JSON_BODY } from '../api/api_errors';

const TYPOLOGY_INDEX_REQUEST: String = "Tipologias";
const TYPOLOGY_INDEX_MESSAGE_SUCCESS: String = "Todas as Tipologias retornadas com sucesso!";
const TYPOLOGY_INDEX_MESSAGE_FAIL: String = "Ocorreu um erro ao retornar todas as tipologias.";

const TYPOLOGY_SHOW_REQUEST: String = "Tipologia";
const TYPOLOGY_SHOW_MESSAGE_SUCCESS: String = "Tipologia retornada com sucesso!";
const TYPOLOGY_SHOW_MESSAGE_FAIL: String = "Ocorreu um erro ao retornar a tipologia.";

const TYPOLOGY_CREATE_REQUEST: String = "Criar Tipologia";
const TYPOLOGY_CREATE_MESSAGE_SUCCESS: String = "Tipologia criada com sucesso!";
const TYPOLOGY_CREATE_MESSAGE_FAIL: String = "Ocorreu um erro ao criar a tipologia.";

const TYPOLOGY_UPDATE_REQUEST: String = "Alterar tipologia";
const TYPOLOGY_UPDATE_MESSAGE_SUCCESS: String = "Tipologia alterada com sucesso!";
const TYPOLOGY_UPDATE_MESSAGE_FAIL: String = "Ocorreu um erro ao alterar a tipologia.";

const TYPOLOGY_REMOVE_REQUEST: String = "Remover tipologia";
const TYPOLOGY_REMOVE_MESSAGE_SUCCESS: String = "Tipologia removida com sucesso!";
const TYPOLOGY_REMOVE_MESSAGE_FAIL: String = "Ocorreu um erro ao remover a tipologia.";


export async function index(req: Request, res: Response) {

    var response = await typologyServices.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(TYPOLOGY_INDEX_REQUEST, TYPOLOGY_INDEX_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(TYPOLOGY_INDEX_REQUEST, TYPOLOGY_INDEX_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {
    var response = await typologyServices.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(TYPOLOGY_SHOW_REQUEST, TYPOLOGY_SHOW_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(TYPOLOGY_SHOW_REQUEST, TYPOLOGY_SHOW_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function create(req: Request, res: Response) {

    if (!typologyRules.createRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(TYPOLOGY_CREATE_REQUEST, TYPOLOGY_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    var response = await typologyServices.create(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(TYPOLOGY_CREATE_REQUEST, TYPOLOGY_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(TYPOLOGY_CREATE_REQUEST, TYPOLOGY_CREATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {

    if (!typologyRules.updateRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(TYPOLOGY_UPDATE_REQUEST, TYPOLOGY_UPDATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    var response = await typologyServices.update(req.body, Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(TYPOLOGY_UPDATE_REQUEST, TYPOLOGY_UPDATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(TYPOLOGY_UPDATE_REQUEST, TYPOLOGY_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function remove(req: Request, res: Response) {

    var response = await typologyServices.remove(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(TYPOLOGY_REMOVE_REQUEST, TYPOLOGY_REMOVE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(TYPOLOGY_REMOVE_REQUEST, TYPOLOGY_REMOVE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

