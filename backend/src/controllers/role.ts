import { Request, Response } from 'express';
import * as roleService from '../services/role';
import { ApiResponse } from '../api/api_response';
import HttpStatus from "http-status-codes";
import { Role } from '../models/role';

export async function index(req: Request, res: Response) {
    let response = await roleService.index();

    if (response instanceof Error) {
        console.log(response);
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("All roles", "All roles Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("All roles", "All roles Success", HttpStatus.OK, response));
    }
}
