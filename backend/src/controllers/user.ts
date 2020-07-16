import { Request, Response, request } from 'express';
import * as userService from '../services/user';
import { ApiResponse } from '../api/api_response';
import HttpStatus from 'http-status-codes';
import * as userRules from '../rules/user';
import { INVALID_JSON_BODY } from '../api/api_errors';


const USER_INDEX_REQUEST: String = 'Utilizadores';
const USER_INDEX_MESSAGE_SUCCESS: String = 'Todos os utilizadores retornados com sucesso!';
const USER_INDEX_MESSAGE_FAILED: String = 'Ocorreu um erro ao retornar todos os utilizadores.';

const USER_SHOW_REQUEST: String = 'Utilizador';
const USER_SHOW_MESSAGE_SUCCESS: String = 'Utilizador retornado com sucesso!';
const USER_SHOW_MESSAGE_FAILED: String = 'Ocorreu um erro a retornar o utilizador';

const USER_UPDATE_REQUEST: String = 'Editar utilizador';
const USER_UPDATE_MESSAGE_SUCCESS: String = 'Utilizador editado com sucesso!';
const USER_UPDATE_MESSAGE_FAILED: String = 'Ocorreu um erro a editar o utilizador.';

const USER_REMOVE_REQUEST: String = 'Remover utilizador';
const USER_REMOVE_MESSAGE_SUCCESS: String = 'Utilizador removido com sucesso!';
const USER_REMOVE_MESSAGE_FAILED: String = 'Ocorreu um erro ao remover o utilizador.';

const USER_UPDATE_PASSWORD_REQUEST: String = 'Alterar Password';
const USER_UPDATE_PASSWORD_MESSAGE_SUCCESS: String = 'Password alterada com sucesso!';
const USER_UPDATE_PASSWORD_MESSAGE_FAILED: String = 'Ocorreu um erro ao alterar password.';

const USER_UPDATE_ROLE_REQUEST: String = 'Alterar Permissões do utilizador';
const USER_UPDATE_ROLE_MESSAGE_SUCCESS: String = 'Permissões do utilizador alteradas com sucesso!';
const USER_UPDATE_ROLE_MESSAGE_FAILED: String = 'Ocorreu um erro ao alterar permissões do utilizador.';

const USER_ADD_CONTACT_REQUEST: String = 'Adicionar Contacto ao utilizador';
const USER_ADD_CONTACT_MESSAGE_SUCCESS: String = 'Adicionado Contacto ao utilizador com sucesso!';
const USER_ADD_CONTACT_MESSAGE_FAILED: String = 'Ocorreu um erro ao adicionar contacto ao utilizador.';

const USER_UPDATE_CONTACT_REQUEST: String = 'Alterar Contacto do utilizador';
const USER_UPDATE_CONTACT_MESSAGE_SUCCESS: String = 'Contacto do utilizador alterado com sucesso!';
const USER_UPDATE_CONTACT_MESSAGE_FAILED: String = 'Ocorreu um erro ao alterar contacto do utilizador.';

const USER_REMOVE_CONTACT_REQUEST: String = 'Remover Contacto do utilizador';
const USER_REMOVE_CONTACT_MESSAGE_SUCCESS: String = 'Contacto do utilizador removido com sucesso!';
const USER_REMOVE_CONTACT_MESSAGE_FAILED: String = 'Ocorreu um erro ao remover contacto do utilizador.';

const USER_ADD_UNIT_REQUEST: String = 'Adicionar Fração ao utilizador';
const USER_ADD_UNIT_MESSAGE_SUCCESS: String = 'Adicionada Fração ao utilizador com sucesso!';
const USER_ADD_UNIT_MESSAGE_FAILED: String = 'Ocorreu um erro ao adicionar fração ao utilizador.';

const USER_REMOVE_UNIT_REQUEST: String = 'Remover fração do utilizador';
const USER_REMOVE_UNIT_MESSAGE_SUCCESS: String = 'Fração do utilizador removida com sucesso!';
const USER_REMOVE_UNIT_MESSAGE_FAILED: String = 'Ocorreu um erro ao remover fração do utilizador.';


export async function index(req: Request, res: Response) {

    let response = await userService.index();

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_INDEX_REQUEST, USER_INDEX_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_INDEX_REQUEST, USER_INDEX_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function show(req: Request, res: Response) {

    let response = await userService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_SHOW_REQUEST, USER_SHOW_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_SHOW_REQUEST, USER_SHOW_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function update(req: Request, res: Response) {

    let response = await userService.update(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function remove(req: Request, res: Response) {

    let response = await userService.remove(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_REMOVE_REQUEST, USER_REMOVE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(USER_REMOVE_REQUEST, USER_REMOVE_MESSAGE_SUCCESS, HttpStatus.OK, response))
    }
}

export async function updatePassword(req: Request, res: Response) {

    if (!userRules.updatePasswordRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.updatePassword(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function updateRole(req: Request, res: Response) {

    if (!userRules.updateRoleRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_ROLE_REQUEST, USER_UPDATE_ROLE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.updateRole(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_ROLE_REQUEST, USER_UPDATE_ROLE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_ROLE_REQUEST, USER_UPDATE_ROLE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function addContact(req: Request, res: Response) {

    if (!userRules.addContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_ADD_CONTACT_REQUEST, USER_ADD_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.addContact(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_ADD_CONTACT_REQUEST, USER_ADD_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_ADD_CONTACT_REQUEST, USER_ADD_CONTACT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function updateContact(req: Request, res: Response) {

    if (!userRules.updateContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_CONTACT_REQUEST, USER_UPDATE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.updateContact(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_CONTACT_REQUEST, USER_UPDATE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_CONTACT_REQUEST, USER_UPDATE_CONTACT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function deleteContact(req: Request, res: Response) {

    if (!userRules.deleteContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_REMOVE_CONTACT_REQUEST, USER_REMOVE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.deleteContact(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_REMOVE_CONTACT_REQUEST, USER_REMOVE_CONTACT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_REMOVE_CONTACT_REQUEST, USER_REMOVE_CONTACT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function addUnit(req: Request, res: Response) {

    if (!userRules.addUnitRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_ADD_UNIT_REQUEST, USER_ADD_UNIT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.addUnit(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_ADD_UNIT_REQUEST, USER_ADD_UNIT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_ADD_UNIT_REQUEST, USER_ADD_UNIT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function deleteUnit(req: Request, res: Response) {

    if (!userRules.deleteUnitRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_REMOVE_UNIT_REQUEST, USER_REMOVE_UNIT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.deleteUnit(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_REMOVE_UNIT_REQUEST, USER_REMOVE_UNIT_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_REMOVE_UNIT_REQUEST, USER_REMOVE_UNIT_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}
