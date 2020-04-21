import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as typologyRules from '../rules/typology';
import * as typologyServices from '../services/typology';
import { ApiResponse } from '../api/api_response';
import { INVALID_JSON_BODY } from '../api/api_errors';

//Index
const TYPOLOGY_INDEX_REQUEST: String = "Get all typologies";
const TYPOLOGY_INDEX_MESSAGE_SUCCESS: String = "Retrieved all tipologies successfully";
const TYPOLOGY_INDEX_MESSAGE_FAIL: String = "Failed to retrieve all tipologies";

//Show
const TYPOLOGY_SHOW_REQUEST: String = "Get typology";
const TYPOLOGY_SHOW_MESSAGE_SUCCESS: String = "Retrieved typology successfully";
const TYPOLOGY_SHOW_MESSAGE_FAIL: String = "Failed to retreive typology";

//Create
const TYPOLOGY_CREATE_REQUEST: String = "Create typology";
const TYPOLOGY_CREATE_MESSAGE_SUCCESS: String = "Created typology successfully";
const TYPOLOGY_CREATE_MESSAGE_FAIL: String = "Failed to create typology";

//Update
const TYPOLOGY_UPDATE_REQUEST: String = "Update typology";
const TYPOLOGY_UPDATE_MESSAGE_SUCCESS: String = "Updated typology successfully";
const TYPOLOGY_UPDATE_MESSAGE_FAIL: String = "Failed to update typology";

//Remove
const TYPOLOGY_REMOVE_REQUEST: String = "Remove typology";
const TYPOLOGY_REMOVE_MESSAGE_SUCCESS: String = "Removed typology successfully";
const TYPOLOGY_REMOVE_MESSAGE_FAIL: String = "Failed to remove typology";


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

