import { Request, Response } from "express";
import * as expenseService from '../services/expense';
import * as expenseRules from '../rules/expense';
import { ApiResponse } from "../api/api_response";

export async function index(req: Request, res: Response) {
    let response = await expenseService.index();
    if (response instanceof Error) {
        return res.send(new ApiResponse('Get All Expenses', 'Get All Expenses Failed', 400, {}, response.message));
    } else {
        return res.send(new ApiResponse('Get All Expenses', 'Get All Expenses Success', 400, response));
    }
}

export async function show(req: Request, res: Response) {
    let response = await expenseService.show(Number(req.params.id));
    if (response instanceof Error) {
        return res.send(new ApiResponse('Get Expense', 'Get Expense Failed', 400, {}, response.message));
    } else {
        return res.send(new ApiResponse('Get Expense', 'Get Expense Success', 400, response));
    }
}

export async function create(req: Request, res: Response) {
    if (!expenseRules.createRules(req.body)) {
        return res.send(new ApiResponse('Create Expense', 'Create Expense Failed', 400, {}, 'Invalid Body'));
    }

    let response = await expenseService.create(req.body);
    if (response instanceof Error) {
        return res.send(new ApiResponse('Create Expense', 'Create Expense Failed', 400, {}, response.message));
    } else {
        return res.send(new ApiResponse('Create Expense', 'Create Expense Success', 400, response));
    }
}

export async function update(req: Request, res: Response) {
    let response = await expenseService.update(Number(req.params.id), req.body);
    if (response instanceof Error) {
        return res.send(new ApiResponse('Update Expense', 'Update Expense Failed', 400, {}, response.message));
    } else {
        return res.send(new ApiResponse('Update Expense', 'Update Expense Success', 400, response));
    }
}

export async function remove(req: Request, res: Response) {
    let response = await expenseService.remove(Number(req.params.id));
    if (response instanceof Error) {
        return res.send(new ApiResponse('Remove Expense', 'Remove Expense Failed', 400, {}, response.message));
    } else {
        return res.send(new ApiResponse('Remove Expense', 'Remove Expense Success', 400, response));
    }
}