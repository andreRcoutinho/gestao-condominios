import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { UserPassword } from '../models/user_password';
import { User } from '../models/user';
import HttpStatus from 'http-status-codes';
import { Contact } from '../models/contact';

export default {
  async index(req: Request, res: Response) {},
  async show(req: Request, res: Response) {},
  // TO DO
  // EMAIL OR ID?
  // REPEAT NEW PASSWORD?
  async updatePassword(req: Request, res: Response) {
    try {
      let rules = {
        email: 'required|email',
        new_password: 'required',
      };
      var validation = new Validator(req.body, rules);
      if (validation.fails()) {
        return res
          .status(400)
          .send({ message: 'Faltam informações para completar a ação!' });
      }

      var user: User = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res
          .status(400)
          .send({ message: 'Esse email não existe na Base de Dados!' });
      }

      var user_password: UserPassword = user.getUser_password();
      user_password.update_password(req.body.new_password);
      await user_password.save();

      return res
        .status(HttpStatus.OK)
        .send({ message: 'Password alterada com sucesso' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
};
