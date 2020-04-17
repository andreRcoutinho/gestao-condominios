import { Request, Response, response } from "express";
import userService from "../services/user";
import { ApiResponse } from "../api/api_response";
import HttpStatus from 'http-status-codes';
import * as userRules from '../rules/user';

export default {
  async index(req: Request, res: Response) {},
  async show(req: Request, res: Response) {},
  // TO DO
  // REPEAT NEW PASSWORD?
  async updatePassword(req: Request, res: Response) {

    if(!userRules.updatePasswordRules(req.body)){
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Password", "Invalid Body", HttpStatus.BAD_REQUEST, {}));
    }

    let response: {} = await userService.updatePassword(req.body);

    if (response) {
      return res.send(new ApiResponse("Update Password", "Success", HttpStatus.OK, response));
    }else {
      return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("Update Password", "Update Password Failed", HttpStatus.BAD_REQUEST, {}));
    }
  },
};
