const jwt = require('jsonwebtoken');
var models = require('../models/index');
var bcrypt = require('bcryptjs');
var authConfig = require('../config/auth');

module.exports = {
  async SignIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: 'Missing Fields' });
    }

    const hasUser = await models.User.findOne({
      where: {
        email
      },
      attributes: ['id', 'email', 'first_name', 'last_name'],
      include: [
        {
          model: models.Role,
          attributes: ['role_name']
        },
        {
          model: models.User_Password,
          attributes: ['password_hash']
        }
      ]
    });

    if (!hasUser) {
      return res.status(400).send({ error: 'User not exists' });
    } else {
      if (!bcrypt.compareSync(password, hasUser.User_Password.password_hash)) {
        return res.status(400).send({ error: 'Invalid Password' });
      }

      const token = jwt.sign(
        { id: hasUser.id, role: hasUser.Role.role_name },
        authConfig.secret,
        {
          expiresIn: 86400
        }
      );

      const response = {
        user: {
          id: hasUser.id,
          first_name: hasUser.first_name,
          last_name: hasUser.last_name,
          role: hasUser.Role.role_name,
          email: hasUser.email
        },
        token: token
      };

      return res.send({ response });
    }
  },
  async SignUp(req, res) {
    const {
      email,
      password,
      first_name,
      last_name,
      NIF,
      IBAN,
      role_id,
      unit_id,
      phone_numbers
    } = req.body;

    try {
      if (
        !email ||
        !password ||
        !first_name ||
        !NIF ||
        !last_name ||
        !IBAN ||
        !role_id ||
        !unit_id ||
        !phone_numbers
      ) {
        res.status(400).send({ error: 'Missing Fields' });
      }

      const hasUser = await models.User.findOne({
        where: {
          email
        }
      });

      if (hasUser) {
        return res.status(400).send({ error: 'User already exists' });
      } else {
        const pass = await models.User_Password.create({
          password_hash: password
        });

        if (!pass) {
          return res.status(400).send({ error: 'Something went wrong' });
        } else {
          console.log(pass.dataValues.id);
          const user = await models.User.create({
            email,
            first_name,
            last_name,
            IBAN,
            NIF,
            role_id,
            user_password_id: pass.dataValues.id
          });

          return res.status(200).send({ message: 'Success Create', user });
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(400).send({ error: 'Registration Failed' });
    }
  },
  async ForgetPassword(req, res) {}
};
