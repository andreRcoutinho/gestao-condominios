import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as unitService from '../services/unit';
import * as unitRules from '../rules/unit';
import { ApiResponse } from '../api/api_response';


export async function index(req: Request, res: Response) {
    var response = await unitService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Get all units", "Get all units Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Get all units", "Get all units Success", HttpStatus.OK, response));
    }
}
export async function show(req: Request, res: Response) {
    var response = await unitService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Unit", "Unit Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Unit", "Unit Success", HttpStatus.OK, response));
    }
}
export async function update(req: Request, res: Response) {
    if (!unitRules.updateRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Unit", "Update Unit Failed", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));
    }

    var response = await unitService.update(req.body, Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Unit", "Update Unit Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Update Unit", "Update Unit Success", HttpStatus.OK, response));
    }
}