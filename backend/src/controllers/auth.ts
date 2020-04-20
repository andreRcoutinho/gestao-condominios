import { Request, Response } from "express";
import { User } from "../models/user";
import HttpStatus from "http-status-codes";
import * as authServices from "../services/auth";
import { ApiResponse } from '../api/api_response';
import * as authRules from '../rules/auth';

export async function signUp(req: Request, res: Response) {
    if (!authRules.signUpRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Sign Up", "Sign Up Failed", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));
    }

    let response = await authServices.signUp(req.body);

    if (response instanceof Error) {
        console.log(response);
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Sign Up", "Sign Up Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Sign Up", "Sign Up Success", HttpStatus.OK, response));
    }
}

export async function signIn(req: Request, res: Response) {
    if (!authRules.signInRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Sign In", "Sign In Failed", HttpStatus.BAD_REQUEST, {}, "Invalid Body"));
    }

    let response = await authServices.signIn(req.body);

    if (response instanceof Error) {
        console.log(response);
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Sign In", "Sign In Failed", HttpStatus.BAD_REQUEST, {}, response.message));
    } else {
        return res.send(new ApiResponse("Sign In", "Sign In Success", HttpStatus.OK, response));
    }
}

export async function forgot_password(req: Request, res: Response) { }

export async function reset_password(req: Request, res: Response) { }