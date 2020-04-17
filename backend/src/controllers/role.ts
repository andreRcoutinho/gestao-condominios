import { Request, Response } from 'express';
import RoleService from '../services/role';
import {ApiResponse} from '../api/api_response';
import HttpStatus from "http-status-codes";
import { Role } from '../models/role';

export default {
  async index(req: Request, res: Response) {
      let roles : Role[] = await RoleService.index();
      if(roles)
          return res.send(new ApiResponse("All roles", "Success", HttpStatus.OK, roles));
      return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse("All roles", "Request Failed", HttpStatus.BAD_REQUEST, []));
  }
};
