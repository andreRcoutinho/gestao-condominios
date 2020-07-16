import { Request, Response } from 'express';
import * as roleService from '../services/role';
import { ApiResponse } from '../api/api_response';
import HttpStatus from "http-status-codes";

const GET_ROLES_REQUEST: String = 'Permissões';
const GET_ROLES_SUCCESS: String = 'Permissões retornadas com sucesso!';
const GET_ROLES_FAIL: String = 'Ocorreu um erro ao retornar todas as permissões.';

export async function index(req: Request, res: Response) {
    let response = await roleService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(GET_ROLES_REQUEST, GET_ROLES_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(GET_ROLES_REQUEST, GET_ROLES_SUCCESS, HttpStatus.OK, response));
    }
}
