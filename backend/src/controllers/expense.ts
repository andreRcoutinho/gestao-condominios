import { Request, Response } from "express";
import * as expenseService from '../services/expense';
import * as expenseRules from '../rules/expense';
import { ApiResponse } from "../api/api_response";
import { INVALID_JSON_BODY } from '../api/api_errors';
import HttpStatus from "http-status-codes";

//Create
const EXPENSE_CREATE_REQUEST: String = "Create Expense";
const EXPENSE_CREATE_MESSAGE_SUCCESS: String = "Expense created successfully";
const EXPENSE_CREATE_MESSAGE_FAIL: String = "Failed to create the Expense";
//Show
const EXPENSE_SHOW_REQUEST: String = "Get Expense";
const EXPENSE_SHOW_MESSAGE_SUCCESS: String = "Retrieved expense successfully";
const EXPENSE_SHOW_MESSAGE_FAIL: String = "Failed to retrieve expense";
const EXPENSE_SHOW_MESSAGE_NOT_FOUND: String = "No expense found with given id"
//Index
const EXPENSE_INDEX_REQUEST: String = 'Get all expenses';
const EXPENSE_INDEX_SUCCESS: String = 'All expenses retrieved successfully';
const EXPENSE_INDEX_FAIL: String = 'Failed to retrieve all expenses';
//Update
const EXPENSE_UPDATE_REQUEST: String = 'Update expense';
const EXPENSE_UPDATE_SUCCESS: String = 'Expense updated successfully';
const EXPENSE_UPDATE_FAIL: String = 'Failed to update expense';
//Remove
const EXPENSE_REMOVE_REQUEST: String = "Remove expense";
const EXPENSE_REMOVE_MESSAGE_SUCCESS: String = "Removed expense successfully";
const EXPENSE_REMOVE_MESSAGE_FAIL: String = "Failed to remove expense";

export async function index(req: Request, res: Response) {
    let response = await expenseService.index();
    if (response instanceof Error) {
        return res.send(new ApiResponse(EXPENSE_INDEX_REQUEST, EXPENSE_INDEX_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_INDEX_REQUEST, EXPENSE_INDEX_SUCCESS, HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {
    let response = await expenseService.show(Number(req.params.id));
    if (response instanceof Error) {
        return res.send(new ApiResponse(EXPENSE_SHOW_REQUEST, EXPENSE_SHOW_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_SHOW_REQUEST, EXPENSE_SHOW_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function create(req: Request, res: Response) {
    if (!expenseRules.createRules(req.body)) {
        return res.send(new ApiResponse(EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await expenseService.create(req.body);
    if (response instanceof Error) {
        return res.send(new ApiResponse(EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_MESSAGE_SUCCESS, HttpStatus.OK, true));
    }
}

export async function update(req: Request, res: Response) {
    let response = await expenseService.update(Number(req.params.id), req.body);
    if (response instanceof Error) {
        return res.send(new ApiResponse(EXPENSE_UPDATE_REQUEST, EXPENSE_UPDATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_UPDATE_REQUEST, EXPENSE_UPDATE_SUCCESS, HttpStatus.OK, true));
    }
}

export async function remove(req: Request, res: Response) {
    let response = await expenseService.remove(Number(req.params.id));
    if (response instanceof Error) {
        return res.send(new ApiResponse(EXPENSE_REMOVE_REQUEST, EXPENSE_REMOVE_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(EXPENSE_REMOVE_REQUEST, EXPENSE_REMOVE_MESSAGE_SUCCESS, HttpStatus.OK, true));
    }
}