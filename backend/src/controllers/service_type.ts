import { Request, Response } from 'express';
import { ServiceType } from '../models/service_type';
import HttpStatus from 'http-status-codes';
import * as serviceTypeService from '../services/service_type';
import { ApiResponse } from '../api/api_response';
import * as serviceTypeRules from '../rules/service_type';

export async function index(req: Request, res: Response) {
    let service_types: ServiceType[] = await serviceTypeService.index();
    if (service_types)
        return res.send(new ApiResponse("All Service Types", "All Service Types Success", HttpStatus.OK, service_types));
    return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("All Service Types", "All Service Types Failed", HttpStatus.BAD_REQUEST, {}));
}

export async function show(req: Request, res: Response) {
    let service_type: ServiceType = await serviceTypeService.show(Number(req.params.id));
    if (service_type)
        return res.send(new ApiResponse("Service Type", "Service Type Success", HttpStatus.OK, service_type));
    return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("Service Type", "Service Type Failed", HttpStatus.BAD_REQUEST, {}));
}

export async function create(req: Request, res: Response) {
    if (!serviceTypeRules.createRules(req.body)) {
        return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("New Service Type", "Invalid Body", HttpStatus.BAD_REQUEST, {}));
    }
    let new_service_type: ServiceType = await serviceTypeService.create(req.body.service_type);
    if (new_service_type)
        return res.send(new ApiResponse("New Service Type", "New Service Type Success", HttpStatus.OK, {}));
    return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("New Service Type", "New Service Type Failed", HttpStatus.BAD_REQUEST, {}));

}

export async function update(req: Request, res: Response) {
    if (!serviceTypeRules.updateRules(req.body)) {
        return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("Update Service Type", "Invalid Body", HttpStatus.BAD_REQUEST, {}));
    }
    let update_service_type: ServiceType = await serviceTypeService.update(req.body.service_type, Number(req.params.id));
    if (update_service_type)
        return res.send(new ApiResponse("Update Service Type", "Update Service Type Success", HttpStatus.OK, {}));
    return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("Update Service Type", "Update Service Type Failed", HttpStatus.BAD_REQUEST, {}));
}

export async function remove(req: Request, res: Response) {
    let delete_service_type: ServiceType = await serviceTypeService.remove(Number(req.params.id));
    if (delete_service_type)
        return res.send(new ApiResponse("Delete Service Type", "Delete Service Type Success", HttpStatus.OK, {}));
    return res.status(HttpStatus.NOT_FOUND).send(new ApiResponse("Delete Service Type", "Delete Service Type Failed", HttpStatus.BAD_REQUEST, {}));

}