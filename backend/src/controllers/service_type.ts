import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as serviceTypeService from '../services/service_type';
import { ApiResponse } from '../api/api_response';
import * as serviceTypeRules from '../rules/service_type';
import { INVALID_JSON_BODY } from '../api/api_errors';

const SERVICE_TYPE_INDEX_REQUEST: String = 'Tipos de Serviço';
const SERVICE_TYPE_INDEX_SUCCESS: String = 'Tipos de Serviço retornados com sucesso!';
const SERVICE_TYPE_INDEX_FAIL: String = 'Ocorreu um erro ao retornar os tipos de serviço.';

const SERVICE_TYPE_SHOW_REQUEST: String = 'Tipo de Serviço';
const SERVICE_TYPE_SHOW_SUCCESS: String = 'Tipo de Serviço retornado com sucesso!';
const SERVICE_TYPE_SHOW_FAIL: String = 'Ocorreu um erro ao retornar o tipo de serviço.';

const SERVICE_TYPE_CREATE_REQUEST: String = 'Criar Tipo de Serviço';
const SERVICE_TYPE_CREATE_SUCCESS: String = 'Tipo de Serviço criado com sucesso!';
const SERVICE_TYPE_CREATE_FAIL: String = 'Ocorreu um erro na criação do Tipo de Serviço.';

const SERVICE_TYPE_UPDATE_REQUEST: String = 'Alterar Tipo de Serviço';
const SERVICE_TYPE_UPDATE_SUCCESS: String = 'Tipo de Serviço alterado com sucesso!';
const SERVICE_TYPE_UPDATE_FAIL: String = 'Ocorreu um erro ao alterar o Tipo de Serviço.';

const SERVICE_TYPE_REMOVE_REQUEST: String = 'Remover Tipo de Serviço';
const SERVICE_TYPE_REMOVE_SUCCESS: String = 'Tipo de Serviço removido com sucesso!';
const SERVICE_TYPE_REMOVE_FAIL: String = 'Ocorreu um erro ao remover o tipo de serviço.';


export async function index(req: Request, res: Response) {
    let response = await serviceTypeService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SERVICE_TYPE_INDEX_REQUEST, SERVICE_TYPE_INDEX_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SERVICE_TYPE_INDEX_REQUEST, SERVICE_TYPE_INDEX_SUCCESS, HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {
    let response = await serviceTypeService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SERVICE_TYPE_SHOW_REQUEST, SERVICE_TYPE_SHOW_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SERVICE_TYPE_SHOW_REQUEST, SERVICE_TYPE_SHOW_SUCCESS, HttpStatus.OK, response));
    }
}

export async function create(req: Request, res: Response) {
    if (!serviceTypeRules.createRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SERVICE_TYPE_CREATE_REQUEST, SERVICE_TYPE_CREATE_REQUEST, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await serviceTypeService.create(req.body.service_type);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SERVICE_TYPE_CREATE_REQUEST, SERVICE_TYPE_CREATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SERVICE_TYPE_CREATE_REQUEST, SERVICE_TYPE_CREATE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {
    if (!serviceTypeRules.updateRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SERVICE_TYPE_UPDATE_REQUEST, SERVICE_TYPE_UPDATE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await serviceTypeService.update(req.body.service_type, Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SERVICE_TYPE_UPDATE_REQUEST, SERVICE_TYPE_UPDATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SERVICE_TYPE_UPDATE_REQUEST, SERVICE_TYPE_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function remove(req: Request, res: Response) {
    let response = await serviceTypeService.remove(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SERVICE_TYPE_REMOVE_REQUEST, SERVICE_TYPE_REMOVE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SERVICE_TYPE_REMOVE_REQUEST, SERVICE_TYPE_REMOVE_SUCCESS, HttpStatus.OK, response));
    }
}