import { Request, Response } from 'express';
import { User } from '../models/user';
import { Role } from '../models/role';
import { UserPassword } from '../models/user_password';
import Validator, { Rules } from 'validatorjs';
import { Unit } from '../models/unit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import HttpStatus from 'http-status-codes';

export default {
  async signUp(req: Request, res: Response) {
    // Validation
    try {
      var rules: Rules = {
        first_name: 'required',
        last_name: 'required',
        email: 'required|email',
        password: 'required',
        NIF: 'required',
        IBAN: 'required',
        role_id: 'required',
        unit_id: 'required',
        phone_numbers: 'required',
      };

      var validation = new Validator(req.body, rules);
      if (validation.fails()) {
        return res
          .status(400)
          .send({ message: 'Faltam informações para completar o registo!' });
      }

      // Check if the user exists in database
      var has_user = await User.getRepository().findOne({
        where: { email: req.body.email },
      });
      if (has_user) {
        return res.status(400).send({
          message: 'Já existe um utilizador registado com esse email!',
        });
      }
      // Create User Password
      var user_password = new UserPassword(req.body.password);
      await user_password.save();

      // Find role
      var role = await Role.findOne({ where: { id: req.body.role_id } });
      if (!role) {
        return res.status(400).send({
          message: 'Não existe nenhuma role correspondente ao enviado',
        });
      }

      // Create User
      var user = new User(
        req.body.email,
        req.body.first_name,
        req.body.last_name,
        req.body.IBAN,
        req.body.NIF,
        role,
        user_password
      );

      // Associate untis
      let units = await Unit.findByIds(req.body.unit_id);
      user.setUnits(units);
      await user.save();

      return res.status(HttpStatus.OK).send({ message: 'Sucesso', user });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
  async signIn(req: Request, res: Response) {
    try {
      let rules = {
        email: 'required|email',
        password: 'required',
      };
      var validation = new Validator(req.body, rules);
      if (validation.fails()) {
        return res
          .status(400)
          .send({ message: 'Faltam informações para completar o registo!' });
      }

      let user: User = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(400).send({ message: 'Utilizador não existente' });
      }

      if (
        !bcrypt.compareSync(
          req.body.password,
          user.getUser_password().getPassword_hash().toString()
        )
      ) {
        res.status(400).send({ message: 'Password Inválida' });
      }

      const token = jwt.sign(
        { id: user.getId(), role: user.getRole().getRole_name()},
        authConfig.secret,
        {
          expiresIn: 86400,
        }
      );

      return res.status(HttpStatus.OK).send({ user, token });
    } catch (error) {}
  },
  //TO DO
  async forgotPassowrd(req: Request, res: Response) {},
  //TO DO
  async resetPassword(req: Request, res: Response) {},
};
