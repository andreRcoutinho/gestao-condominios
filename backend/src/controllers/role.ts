import { Request, Response } from 'express';
import * as roleService from '../services/role';
import { ApiResponse } from '../api/api_response';
import HttpStatus from "http-status-codes";

//index
const GET_ROLES_REQUEST: String = 'Get roles';
const GET_ROLES_SUCCESS: String = 'Retrieved all roles successfully';
const GET_ROLES_FAIL: String = 'Failed to retrieve all roles';

export async function index(req: Request, res: Response) {
    let response = await roleService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(GET_ROLES_REQUEST, GET_ROLES_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(GET_ROLES_REQUEST, GET_ROLES_SUCCESS, HttpStatus.OK, response));
    }
}
