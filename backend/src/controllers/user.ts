import { Request, Response, request } from "express";
import * as userService from "../services/user";
import { ApiResponse } from "../api/api_response";
import HttpStatus from 'http-status-codes';
import * as userRules from '../rules/user';
import { INVALID_JSON_BODY } from "../api/api_errors";

//Index
const USER_INDEX_REQUEST: String = "Get all users";
const USER_INDEX_MESSAGE_SUCCESS: String = "Retrieved all users successfully";
const USER_INDEX_MESSAGE_FAILED: String = "Failed to retrieve all users";
//Show
const USER_SHOW_REQUEST: String = "Get specific user";
const USER_SHOW_MESSAGE_SUCCESS: String = "Retrieved specific user successfully";
const USER_SHOW_MESSAGE_FAILED: String = "Failed to retrieve specific user";
//Update
const USER_UPDATE_REQUEST: String = "Update user";
const USER_UPDATE_MESSAGE_SUCCESS: String = "User update successfully";
const USER_UPDATE_MESSAGE_FAILED: String = "Failed to update user";
//UpdatePassword
const USER_UPDATEPASSWORD_REQUEST: String = "Update user password";
const USER_UPDATEPASSWORD_MESSAGE_SUCCESS: String = "Updated user password successfully";
const USER_UPDATEPASSWORD_MESSAGE_FAILED: String = "Failed to update user password";

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

export async function updatePassword(req: Request, res: Response) {
    if (!userRules.updatePasswordRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.updatePassword(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

//TO DO RESPONSE MESSAGESS
export async function updateRole(req: Request, res: Response) {
    if (!userRules.updateRoleRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.updateRole(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

//TO DO RESPONSE MESSAGESS
export async function addContact(req: Request, res: Response) {
    if (!userRules.addContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.addContact(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

//TO DO RESPONSE MESSAGESS
export async function updateContact(req: Request, res: Response) {
    if (!userRules.updateContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.updateContact(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

//TO DO RESPONSE MESSAGESS
export async function deleteContact(req: Request, res: Response) {
    if (!userRules.deleteContactRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.updateContact(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

//TO DO RESPONSE MESSAGESS
export async function addUnit(req: Request, res: Response) {
    if (!userRules.addUnitRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.addUnit(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

//TO DO RESPONSE MESSAGESS
export async function deleteUnit(req: Request, res: Response) {
    if (!userRules.deleteUnitRules(req.body))
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATEPASSWORD_REQUEST, USER_UPDATEPASSWORD_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));

    let response = await userService.deleteUnit(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_FAILED, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(USER_UPDATE_REQUEST, USER_UPDATE_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}