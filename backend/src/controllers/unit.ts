import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as unitService from '../services/unit';
import * as unitRules from '../rules/unit';
import { ApiResponse } from '../api/api_response';
import { INVALID_JSON_BODY } from '../api/api_errors';

//Index
const UNIT_INDEX_REQUEST: String = "Get all units";
const UNIT_INDEX_MESSAGE_SUCCESS: String = "Retrieved all units successfully";
const UNIT_INDEX_MESSAGE_FAILED: String = "Failed to retrieve all units";
//Show
const UNIT_SHOW_REQUEST: String = "Get specific unit";
const UNIT_SHOW_MESSAGE_SUCCESS: String = "Retrieved specific unit successfully";
const UNIT_SHOW_MESSAGE_FAILED: String = "Failed to retrieve specific unit";
//Update
const UNIT_UPDATE_REQUEST: String = "Update unit";
const UNIT_UPDATE_MESSAGE_SUCCESS: String = "Updated unit successfully";
const UNIT_UPDATE_MESSAGE_FAILED: String = "Failed to update unit";

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