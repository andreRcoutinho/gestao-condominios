import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as authServices from '../services/auth';
import { ApiResponse } from '../api/api_response';
import * as authRules from '../rules/auth';
import { INVALID_JSON_BODY } from '../api/api_errors';

const AUTH_SIGN_UP_REQUEST: String = 'Registo';
const AUTH_SIGN_UP_MESSAGE_SUCCESS: String = 'Utilizador registado com sucesso!';
const AUTH_SIGN_UP_MESSAGE_FAIL: String = 'Ocorreu um erro ao registar um utilizador.';

const AUTH_SIGN_IN_REQUEST: String = 'Sign in';
const AUTH_SIGN_IN_MESSAGE_SUCCESS: String = 'Sign in com sucesso!';
const AUTH_SIGN_IN_MESSAGE_FAIL: String = 'Ocorreu um erro no Sign in.';

const FORGOT_PASSWORD_REQUEST: String = 'Recuperação da Password';
const FORGOT_PASSWORD_SUCCESS: String = 'Recuperação da Password com sucesso!';
const FORGOT_PASSWORD_FAIL: String = 'Ocorreu um erro na recuperação da Password.'

const RESET_PASSWORD_REQUEST: String = 'Reset Password';
const RESET_PASSWORD_SUCCESS: String = 'Reset Password com sucesso!';
const RESET_PASSWORD_FAIL: String = 'Ocorreu um erro no reset da Password'

export async function signUp(req: Request, res: Response) {
    if (!authRules.signUpRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(AUTH_SIGN_UP_REQUEST, AUTH_SIGN_UP_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await authServices.signUp(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(AUTH_SIGN_UP_REQUEST, AUTH_SIGN_UP_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(AUTH_SIGN_UP_REQUEST, AUTH_SIGN_UP_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function signIn(req: Request, res: Response) {
    if (!authRules.signInRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(AUTH_SIGN_IN_REQUEST, AUTH_SIGN_IN_MESSAGE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await authServices.signIn(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(AUTH_SIGN_IN_REQUEST, AUTH_SIGN_IN_MESSAGE_FAIL, HttpStatus.UNAUTHORIZED, {}, response.message));
    } else {
        return res.send(new ApiResponse(AUTH_SIGN_IN_REQUEST, AUTH_SIGN_IN_MESSAGE_SUCCESS, HttpStatus.OK, response));
    }
}

export async function forgot_password(req: Request, res: Response) {
    if (!authRules.forgotPasswordRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await authServices.forgotPassword(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, HttpStatus.OK, response));
    }
}

export async function reset_password(req: Request, res: Response) {
    if (!authRules.resetPasswordRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY));
    }

    let response = await authServices.resetPassword(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse(RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, HttpStatus.OK, response));
    }
}
