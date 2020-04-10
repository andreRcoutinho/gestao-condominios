import { Request, Response } from 'express';
import { Role } from '../models/role';

export default {
  async index(req: Request, res: Response) {
    try {
      var roles: Role[] = await Role.find();
      return res.status(200).send(roles);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
  // It makes no sense to do others requests
};
