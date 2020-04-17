import { Request, Response } from 'express';
import { Typology } from '../models/typology';
import Validator from 'validatorjs';
import HttpStatus from 'http-status-codes';
import * as typologyRules from '../rules/typology';
import * as typologyServices from '../services/typology';
import { ApiResponse } from '../api/api_response';

export async function index(req: Request, res: Response) {
    var typologies: Typology[] = await typologyServices.index();
    return res.status(HttpStatus.OK).send(new ApiResponse("Get all typologies", "All typologies retrieved.", HttpStatus.OK, typologies));
}

export async function show(req: Request, res: Response) {
    var typology: Typology = await typologyServices.show(Number(req.params.id));
    return res.status(HttpStatus.OK).send(new ApiResponse("Get typology by id.", "Retrieved typology with id " + typology.getId(), HttpStatus.OK, typology));
}

export async function create(req: Request, res: Response) {
    if (!typologyRules.createRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Create Typology", "Invalid Body", HttpStatus.BAD_REQUEST, {}));

    var typology: Typology = await typologyServices.create(req.body);
    return res.status(HttpStatus.CREATED).send(new ApiResponse("Create Typology", "Created new typology", HttpStatus.CREATED, typology));
}

export async function update(req: Request, res: Response) {
    if (!typologyRules.updateRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Typology", "Invalid Body", HttpStatus.BAD_REQUEST, {}));

    var typology: Typology = await typologyServices.update(req.body, Number(req.params.id));
    return res.status(HttpStatus.OK).send(new ApiResponse("Update Typology", `Typology with id ${typology.getId()} updated`, HttpStatus.OK, typology));
}

export async function remove(req: Request, res: Response) {
    var typology: Typology = await typologyServices.remove(Number(req.params.id));
    return res.status(HttpStatus.OK).send(new ApiResponse("Remove Typology", `Typology removed with id ${typology.getId()}`, HttpStatus.OK, typology));
}

