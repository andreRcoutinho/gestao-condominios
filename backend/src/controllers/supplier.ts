import { Request, Response, request } from 'express';
import * as supplierService from '../services/supplier';
import { ApiResponse } from '../api/api_response';
import HttpStatus from "http-status-codes";
import * as supplierRules from '../rules/supplier';
import { INVALID_JSON_BODY } from '../api/api_errors';

const SUPPLIER_CREATE_REQUEST: String = "Registar Fornecedor";
const SUPPLIER_CREATE_MESSAGE_SUCCESS: String = "Fornecedor registado com sucesso!";
const SUPPLIER_CREATE_MESSAGE_FAIL: String = "Ocorreu um erro no registo do fornecedor";

const SUPPLIER_SHOW_REQUEST: String = "Fornecedor";
const SUPPLIER_SHOW_MESSAGE_SUCCESS: String = "Fornecedor retornado com sucesso!";
const SUPPLIER_SHOW_MESSAGE_FAIL: String = "Ocorreu um erro ao retornar o fornecedor.";
const SUPPLIER_SHOW_MESSAGE_NOT_FOUND: String = "Não existe nenhum fornecedor com esse id."

const SUPPLIER_INDEX_REQUEST: String = 'Todos os Fornecedores';
const SUPPLIER_INDEX_SUCCESS: String = 'Todos os Fornecedores retornados com sucesso!';
const SUPPLIER_INDEX_FAIL: String = 'Ocorreu um erro ao retornar todos os fornecedores.';

const SUPPLIER_UPDATE_REQUEST: String = 'Editar Fornecedor';
const SUPPLIER_UPDATE_SUCCESS: String = 'Fornecedor editado com sucesso!';
const SUPPLIER_UPDATE_FAIL: String = 'Ocorreu um erro ao editar o fornecedor.';

const SUPPLIER_REMOVE_REQUEST: String = 'Remover Fornecedor';
const SUPPLIER_REMOVE_MESSAGE_SUCCESS: String = 'Fornecedor removido com sucesso!';
const SUPPLIER_REMOVE_MESSAGE_FAILED: String = 'Ocorreu um erro ao remover o fornecedor.';

const SUPPLIER_ADD_CONTACT_REQUEST: String = 'Adicionar Contacto ao fornecedor';
const SUPPLIER_ADD_CONTACT_MESSAGE_SUCCESS: String = 'Contacto adicionado com sucesso!';
const SUPPLIER_ADD_CONTACT_MESSAGE_FAILED: String = 'Ocorreu um erro ao adicionar o contacto.';

const SUPPLIER_UPDATE_CONTACT_REQUEST: String = 'Editar Contacto do fornecedor';
const SUPPLIER_UPDATE_CONTACT_MESSAGE_SUCCESS: String = 'Contacto editado com sucesso!';
const SUPPLIER_UPDATE_CONTACT_MESSAGE_FAILED: String = 'Ocorreu um erro ao editar o contacto.';

const SUPPLIER_REMOVE_CONTACT_REQUEST: String = 'Remover Contacto do fornecedor';
const SUPPLIER_REMOVE_CONTACT_MESSAGE_SUCCESS: String = 'Contacto removido com sucesso!';
const SUPPLIER_REMOVE_CONTACT_MESSAGE_FAILED: String = 'Ocorreu um erro ao remover o contacto.';

const SUPPLIER_ADD_SERVICE_TYPE_REQUEST: String = 'Adicionar tipo de serviço ao fornecedor';
const SUPPLIER_ADD_SERVICE_TYPE_MESSAGE_SUCCESS: String = 'Tipo de Serviço adicionado com sucesso!';
const SUPPLIER_ADD_SERVICE_TYPE_MESSAGE_FAILED: String = 'Ocorreu um erro ao adicionar o tipo de serviço.';

const SUPPLIER_REMOVE_SERVICE_TYPE_REQUEST: String = 'Remover tipo de serviço do fornecedor';
const SUPPLIER_REMOVE_SERVICE_TYPE_MESSAGE_SUCCESS: String = 'Tipo de Serviço removido com sucesso!';
const SUPPLIER_REMOVE_SERVICE_TYPE_MESSAGE_FAILED: String = 'Ocorreu um erro ao remover tipo de serviço.';

export async function create(req: Request, res: Response) {
    if (!supplierRules.createRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.create(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_SUCCESS, HttpStatus.CREATED, response));
    }
}


export async function show(req: Request, res: Response) {
    let response = await supplierService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_SHOW_REQUEST, SUPPLIER_SHOW_MESSAGE_NOT_FOUND, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_SHOW_REQUEST, SUPPLIER_SHOW_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function index(req: Request, res: Response) {
    let response = await supplierService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_INDEX_REQUEST, SUPPLIER_INDEX_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_INDEX_REQUEST, SUPPLIER_INDEX_SUCCESS, HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {
    let response = await supplierService.update(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function remove(req: Request, res: Response) {
    let response = await supplierService.remove(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_REMOVE_REQUEST, SUPPLIER_REMOVE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_REMOVE_REQUEST, SUPPLIER_REMOVE_MESSAGE_SUCCESS, HttpStatus.OK, response))
    }
}

export async function addContact(req: Request, res: Response) {

    if (!supplierRules.addContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_ADD_CONTACT_REQUEST, SUPPLIER_ADD_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.addContact(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_ADD_CONTACT_REQUEST, SUPPLIER_ADD_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_ADD_CONTACT_REQUEST, SUPPLIER_ADD_CONTACT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function updateContact(req: Request, res: Response) {

    if (!supplierRules.updateContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_CONTACT_REQUEST, SUPPLIER_UPDATE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.updateContact(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_CONTACT_REQUEST, SUPPLIER_UPDATE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_CONTACT_REQUEST, SUPPLIER_UPDATE_CONTACT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function deleteContact(req: Request, res: Response) {

    if (!supplierRules.deleteContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_REMOVE_CONTACT_REQUEST, SUPPLIER_REMOVE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.deleteContact(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_REMOVE_CONTACT_REQUEST, SUPPLIER_REMOVE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_REMOVE_CONTACT_REQUEST, SUPPLIER_REMOVE_CONTACT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function addServiceType(req: Request, res: Response) {

    if (!supplierRules.addServiceTypeRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_ADD_SERVICE_TYPE_REQUEST, SUPPLIER_ADD_SERVICE_TYPE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.addServiceTypeSupplier(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_ADD_SERVICE_TYPE_REQUEST, SUPPLIER_ADD_SERVICE_TYPE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_ADD_SERVICE_TYPE_REQUEST, SUPPLIER_ADD_SERVICE_TYPE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function deleteServiceType(req: Request, res: Response) {

    if (!supplierRules.deleteServiceTypeRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_REMOVE_SERVICE_TYPE_REQUEST, SUPPLIER_REMOVE_SERVICE_TYPE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.deleteServiceTypeSupplier(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_REMOVE_SERVICE_TYPE_REQUEST, SUPPLIER_REMOVE_SERVICE_TYPE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_REMOVE_SERVICE_TYPE_REQUEST, SUPPLIER_REMOVE_SERVICE_TYPE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}