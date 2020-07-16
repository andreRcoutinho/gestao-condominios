import { Request, Response, request } from 'express';
import * as supplierService from '../services/supplier';
import { ApiResponse } from '../api/api_response';
import HttpStatus from "http-status-codes";
import * as supplierRules from '../rules/supplier';
import { INVALID_JSON_BODY } from '../api/api_errors';

//Create
const SUPPLIER_CREATE_REQUEST: String = "Create supplier";
const SUPPLIER_CREATE_MESSAGE_SUCCESS: String = "Supplier created successfully";
const SUPPLIER_CREATE_MESSAGE_FAIL: String = "Failed to create the supplier";
//Show
const SUPPLIER_SHOW_REQUEST: String = "Get supplier";
const SUPPLIER_SHOW_MESSAGE_SUCCESS: String = "Retrieved supplier successfully";
const SUPPLIER_SHOW_MESSAGE_FAIL: String = "Failed to retrieve supplier";
const SUPPLIER_SHOW_MESSAGE_NOT_FOUND: String = "No supplier found with given id"
//Index
const SUPPLIER_INDEX_REQUEST: String = 'Get all supplier';
const SUPPLIER_INDEX_SUCCESS: String = 'All suppliers retrieved successfully';
const SUPPLIER_INDEX_FAIL: String = 'Failed to retrieve all suppliers';
//Update
const SUPPLIER_UPDATE_REQUEST: String = 'Update supplier';
const SUPPLIER_UPDATE_SUCCESS: String = 'Supplier updated successfully';
const SUPPLIER_UPDATE_FAIL: String = 'Failed to update supplier';
//Remove
const SUPPLIER_REMOVE_REQUEST: String = 'Remove supplier';
const SUPPLIER_REMOVE_MESSAGE_SUCCESS: String = 'Supplier remove successfully';
const SUPPLIER_REMOVE_MESSAGE_FAILED: String = 'Failed to remove supplier';

export async function create(req: Request, res: Response) {
    if (!supplierRules.createRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.create(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.CREATED, {}, response.message));
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


// TO DO RESPONSE MESSAGES
export async function addContact(req: Request, res: Response) {

    if (!supplierRules.addContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.addContact(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_FAIL, HttpStatus.OK, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}

// TO DO RESPONSE MESSAGES
export async function updateContact(req: Request, res: Response) {
    if (!supplierRules.updateContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.updateContact(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_FAIL, HttpStatus.OK, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}

// TO DO RESPONSE MESSAGES
export async function deleteContact(req: Request, res: Response) {
    if (!supplierRules.deleteContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.deleteContact(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_FAIL, HttpStatus.OK, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}

// TO DO RESPONSE MESSAGES
export async function addServiceType(req: Request, res: Response) {
    if (!supplierRules.addServiceTypeRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.addServiceTypeSupplier(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_FAIL, HttpStatus.OK, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}

// TO DO RESPONSE MESSAGES
export async function deleteServiceType(req: Request, res: Response) {
    if (!supplierRules.deleteServiceTypeRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.deleteServiceTypeSupplier(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_FAIL, HttpStatus.OK, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, HttpStatus.OK, response));
    }
}