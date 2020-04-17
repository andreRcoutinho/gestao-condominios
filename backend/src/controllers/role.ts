import { Request, Response } from 'express';
import * as roleService from '../services/role';
import { ApiResponse } from '../api/api_response';
import HttpStatus from "http-status-codes";
import { Role } from '../models/role';

export async function index(req: Request, res: Response) {
    let roles: Role[] = await roleService.index();
    if (roles)
        return res.send(new ApiResponse("All roles", "Success", HttpStatus.OK, roles));
    return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("All roles", "Request Failed", HttpStatus.BAD_REQUEST, []));
}
