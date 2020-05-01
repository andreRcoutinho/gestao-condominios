import { Request, Response } from 'express';
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

export async function create(req: Request, res: Response) {
    if (!supplierRules.createRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await supplierService.create(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_FAIL, HttpStatus.CREATED, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_SUCCESS, HttpStatus.CREATED, true));
    }
}


export async function show(req: Request, res: Response) {
    let response = await supplierService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_SHOW_REQUEST, SUPPLIER_SHOW_MESSAGE_NOT_FOUND, HttpStatus.OK, {}, response.message));
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
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_FAIL, HttpStatus.OK, {}, response.message));
    } else {
        return res.send(new ApiResponse(SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS, HttpStatus.OK, true));
    }
}
