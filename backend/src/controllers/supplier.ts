import { Request, Response } from 'express';
import * as supplierService from '../services/supplier';
import { ApiResponse } from '../api/api_response';
import HttpStatus from "http-status-codes";
import { Supplier } from '../models/supplier';
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

export async function create(req: Request, res: Response) {
    if (!supplierRules.createRules(req.body))
        return res.send(new ApiResponse(SUPPLIER_CREATE_REQUEST, INVALID_JSON_BODY, HttpStatus.BAD_REQUEST, {}));

    let supplier: Supplier = await supplierService.create(req.body);

    return res.send(res.send(new ApiResponse(SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_MESSAGE_SUCCESS, HttpStatus.CREATED, supplier)));
}


export async function show(req: Request, res: Response) {
    let supplier: Supplier = await supplierService.show(Number(req.params.id));

    if (!supplier)
        return res.send(new ApiResponse(SUPPLIER_SHOW_REQUEST, SUPPLIER_SHOW_MESSAGE_NOT_FOUND, HttpStatus.OK, {}));

    return res.send(new ApiResponse(SUPPLIER_SHOW_REQUEST, SUPPLIER_SHOW_MESSAGE_SUCCESS, HttpStatus.OK, supplier));
}
