import { Request, Response } from "express";
import { User } from "../models/user";
import HttpStatus from "http-status-codes";
import authServices from "../services/auth";
import { ApiResponse } from '../api/api_response';
import * as authRules from '../rules/auth';

export default {
    async signUp(req: Request, res: Response) {

        if (!authRules.signUpRules(req.body)) {
            return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Sign Up", "Invalid Body", HttpStatus.BAD_REQUEST, {}));
        }

        let user: User = await authServices.signUp(req.body);

        if (user) {
            return res.send(new ApiResponse("Sign Up", "Sign Up Success", HttpStatus.OK, user));
        } else {
            return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Sign Up", "Sign Up Failed", HttpStatus.BAD_REQUEST, user));
        }
    },
    async signIn(req: Request, res: Response) {
        if (!authRules.signInRules(req.body)) {
            return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Sign In", "Invalid Body", HttpStatus.BAD_REQUEST, {}));
        }

        let response: {} = await authServices.signIn(req.body);

        if (response) {
            return res.send(new ApiResponse("Sign In", "Sign In Success", HttpStatus.OK, response));
        } else {
            return res.send(new ApiResponse("Sign In", "Sign In Failed", HttpStatus.BAD_REQUEST, response));
        }
    },
    async forgot_password(req: Request, res: Response) { },
    async reset_password(req: Request, res: Response) { },
};
