import { Request, Response } from 'express';
import { ServiceType } from '../models/service_type';
import HttpStatus from 'http-status-codes';
import * as serviceTypeService from '../services/service_type';
import { ApiResponse } from '../api/api_response';
import * as serviceTypeRules from '../rules/service_type';
import { INVALID_JSON_BODY } from '../api/api_errors';

//Index
const SERVICE_TYPE_INDEX_REQUEST: String = 'Get all service types';
const SERVICE_TYPE_INDEX_SUCCESS: String = 'All service types retrieved successfully';
const SERVICE_TYPE_INDEX_FAIL: String = 'Failed to retrieve all service types';
//Show
const SERVICE_TYPE_SHOW_REQUEST: String = 'Get service type';
const SERVICE_TYPE_SHOW_SUCCESS: String = 'Service type retrieved successfully';
const SERVICE_TYPE_SHOW_FAIL: String = 'Failed to retrieve service type';
//Create
const SERVICE_TYPE_CREATE_REQUEST: String = 'Create service type';
const SERVICE_TYPE_CREATE_SUCCESS: String = 'Service type created successfully';
const SERVICE_TYPE_CREATE_FAIL: String = 'Failed to create service type';
//Update
const SERVICE_TYPE_UPDATE_REQUEST: String = 'Update service type';
const SERVICE_TYPE_UPDATE_SUCCESS: String = 'Service type updated successfully';
const SERVICE_TYPE_UPDATE_FAIL: String = 'Failed to update service type';
//Remove
const SERVICE_TYPE_REMOVE_REQUEST: String = 'Remove service type';
const SERVICE_TYPE_REMOVE_SUCCESS: String = 'Service type removed successfully';
const SERVICE_TYPE_REMOVE_FAIL: String = 'Failed to remove service type';


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
        return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse(SERVICE_TYPE_CREATE_REQUEST, SERVICE_TYPE_CREATE_REQUEST, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
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
        return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse(SERVICE_TYPE_UPDATE_REQUEST, SERVICE_TYPE_UPDATE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
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