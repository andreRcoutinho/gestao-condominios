import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as paymentMapService from '../services/payment_map';
import * as paymentMapRules from '../rules/payment_map';
import { ApiResponse } from "../api/api_response";
import { INVALID_JSON_BODY } from "../api/api_errors";

//Index
const PAYMENT_MAP_INDEX_REQUEST: String = 'Get all payment maps';
const PAYMENT_MAP_INDEX_SUCCESS: String = 'All payment maps retrieved successfully';
const PAYMENT_MAP_INDEX_FAIL: String = 'Failed to retrieve all payment maps';
//Show
const PAYMENT_MAP_SHOW_REQUEST: String = 'Get payment map';
const PAYMENT_MAP_SHOW_SUCCESS: String = 'Payment map retrieved successfully';
const PAYMENT_MAP_SHOW_FAIL: String = 'Failed to retrieve payment map';
//Show Anual Payment Map
const ANUAL_PAYMENT_MAP_SHOW_REQUEST: String = 'Get anual payment map';
const ANUAL_PAYMENT_MAP_SHOW_SUCCESS: String = 'Anual Payment map retrieved successfully';
const ANUAL_PAYMENT_MAP_SHOW_FAIL: String = 'Failed to retrieve anual payment map';
//Create
const PAYMENT_MAP_CREATE_REQUEST: String = 'Create payment map';
const PAYMENT_MAP_CREATE_SUCCESS: String = 'Payment map created successfully';
const PAYMENT_MAP_CREATE_FAIL: String = 'Failed to create payment map';
//Simulate
const PAYMENT_MAP_SIMULATE_REQUEST: String = 'Simulate anual payment map';
const PAYMENT_MAP_SIMULATE_SUCCESS: String = 'Anual payment map simulated successfully';
const PAYMENT_MAP_SIMULATE_FAIL: String = 'Failed to simulate anual payment map';
//Update
const PAYMENT_MAP_UPDATE_REQUEST: String = 'Update payment map';
const PAYMENT_MAP_UPDATE_SUCCESS: String = 'Payment map updated successfully';
const PAYMENT_MAP_UPDATE_FAIL: String = 'Failed to update payment map';
//Remove
const PAYMENT_MAP_REMOVE_REQUEST: String = 'Remove payment map';
const PAYMENT_MAP_REMOVE_SUCCESS: String = 'Payment map removed successfully';
const PAYMENT_MAP_REMOVE_FAIL: String = 'Failed to remove payment map';

//Close
const CLOSE_PAYMENT_MAP_REQUEST: String = 'Close payment map';
const CLOSE_PAYMENT_MAP_SUCCESS: String = 'Payment map closed successfully';
const CLOSE_PAYMENT_MAP_FAIL: String = 'Failed to close payment map';

export async function create(req: Request, res: Response) {
    if (!paymentMapRules.createRules(req.body)) {
        return res.send(new ApiResponse(PAYMENT_MAP_CREATE_REQUEST, PAYMENT_MAP_CREATE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY))
    }

    let response = await paymentMapService.create(req.body);
    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_CREATE_REQUEST, PAYMENT_MAP_CREATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_CREATE_REQUEST, PAYMENT_MAP_CREATE_SUCCESS, HttpStatus.OK, response))
    }
}

export async function index(req: Request, res: Response) {
    let response = await paymentMapService.index((req.query.year) ? req.query.year.toString() : null);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_INDEX_REQUEST, PAYMENT_MAP_INDEX_FAIL, HttpStatus.NOT_FOUND, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_INDEX_REQUEST, PAYMENT_MAP_INDEX_SUCCESS, HttpStatus.OK, response))
    }

}

export async function show(req: Request, res: Response) {
    let response = await paymentMapService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_SHOW_REQUEST, PAYMENT_MAP_SHOW_FAIL, HttpStatus.NOT_FOUND, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_SHOW_REQUEST, PAYMENT_MAP_SHOW_SUCCESS, HttpStatus.OK, response))
    }
}

export async function getAnualPaymentMap(req: Request, res: Response) {

    let response = await paymentMapService.getAnualPaymentMap((req.query.year) ? req.query.year.toString() : null);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(ANUAL_PAYMENT_MAP_SHOW_REQUEST, ANUAL_PAYMENT_MAP_SHOW_FAIL, HttpStatus.NOT_FOUND, {}, response.message))
    } else {
        return res.send(new ApiResponse(ANUAL_PAYMENT_MAP_SHOW_REQUEST, ANUAL_PAYMENT_MAP_SHOW_SUCCESS, HttpStatus.OK, response))
    }
}

export async function update(req: Request, res: Response) {
    let response = await paymentMapService.update(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_UPDATE_REQUEST, PAYMENT_MAP_UPDATE_FAIL, HttpStatus.NOT_FOUND, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_UPDATE_REQUEST, PAYMENT_MAP_UPDATE_SUCCESS, HttpStatus.OK, response))
    }
}

export async function close(req: Request, res: Response) {
    let response = await paymentMapService.closePaymentMap(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(CLOSE_PAYMENT_MAP_REQUEST, CLOSE_PAYMENT_MAP_FAIL, HttpStatus.NOT_FOUND, {}, response.message))
    } else {
        return res.send(new ApiResponse(CLOSE_PAYMENT_MAP_REQUEST, CLOSE_PAYMENT_MAP_SUCCESS, HttpStatus.OK, response))
    }
}

export async function simulate(req: Request, res: Response) {
    if (!paymentMapRules.createRules(req.body)) {
        return res.send(new ApiResponse(PAYMENT_MAP_SIMULATE_REQUEST, PAYMENT_MAP_SIMULATE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY))
    }

    let response = await paymentMapService.simulate(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_SIMULATE_REQUEST, PAYMENT_MAP_SIMULATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_SIMULATE_REQUEST, PAYMENT_MAP_SIMULATE_SUCCESS, HttpStatus.OK, response))
    }
}