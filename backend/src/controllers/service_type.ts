import { Request, Response } from 'express';
import { ServiceType } from '../models/service_type';
import HttpStatus from 'http-status-codes';
import * as serviceTypeService from '../services/service_type';
import { ApiResponse } from '../api/api_response';
import * as serviceTypeRules from '../rules/service_type';

export async function index(req: Request, res: Response) {
    let response = await serviceTypeService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("All Service Types", "All Service Types Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("All Service Types", "All Service Types Success", HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {
    let response = await serviceTypeService.show(Number(req.params.id));
    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Service Type", "Service Type Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Service Type", "Service Type Success", HttpStatus.OK, response));
    }
}

export async function create(req: Request, res: Response) {
    if (!serviceTypeRules.createRules(req.body)) {
        return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("New Service Type", "New Service Type", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));
    }

    let response = await serviceTypeService.create(req.body.service_type);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("New Service Type", "New Service Type Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("New Service Type", "New Service Type Success", HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {
    if (!serviceTypeRules.updateRules(req.body)) {
        return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("Update Service Type", "Update Service Type Failed", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));
    }

    let response = await serviceTypeService.update(req.body.service_type, Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Service Type", "Update Service Type Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Update Service Type", "Update Service Type Success", HttpStatus.OK, response));
    }
}

export async function remove(req: Request, res: Response) {
    let response = await serviceTypeService.remove(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Delete Service Type", "Delete Service Type Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Delete Service Type", "Delete Service Type Success", HttpStatus.OK, response));
    }
}