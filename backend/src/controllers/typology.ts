import { Request, Response } from 'express';
import { Typology } from '../models/typology';
import Validator from 'validatorjs';
import HttpStatus from 'http-status-codes';
import * as typologyRules from '../rules/typology';
import * as typologyServices from '../services/typology';
import { ApiResponse } from '../api/api_response';

export async function index(req: Request, res: Response) {
    var response = await typologyServices.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Get all typologies", "Get all typologies Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Get all typologies", "Get all typologies Success", HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {
    var response = await typologyServices.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Get typology", "Get typology Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Get typology", "Get typology Success", HttpStatus.OK, response));
    }
}

export async function create(req: Request, res: Response) {
    if (!typologyRules.createRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Create Typology", "Create Typology Failed", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));

    var response = await typologyServices.create(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Create Typology", "Create Typology Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Create Typology", "Create Typology Success", HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {
    if (!typologyRules.updateRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Typology", "Update Typology Failed", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));
    }

    var response = await typologyServices.update(req.body, Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Typology", "Update Typology Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Update Typology", "Update Typology Success", HttpStatus.OK, response));
    }
}

export async function remove(req: Request, res: Response) {
    var response = await typologyServices.remove(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Delete Typology", "Delete Typology Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Delete Typology", "Delete Typology Success", HttpStatus.OK, response));
    }
}

