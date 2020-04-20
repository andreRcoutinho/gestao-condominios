import { Request, Response, response } from "express";
import * as userService from "../services/user";
import { ApiResponse } from "../api/api_response";
import HttpStatus from 'http-status-codes';
import * as userRules from '../rules/user';

export async function index(req: Request, res: Response) { }

export async function show(req: Request, res: Response) { }

export async function updatePassword(req: Request, res: Response) {
    if (!userRules.updatePasswordRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Password", "Update Password Failed", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));

    let response = await userService.updatePassword(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Password", "Update Password Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Update Password", "Update Password Success", HttpStatus.OK, response));
    }
}
