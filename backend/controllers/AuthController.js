const jwt = require('jsonwebtoken');
var models = require('../models/index');

module.exports = {
  async SignIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: 'Missing Fields' });
    }

    const user = await models.User.findOne({
      where: {
        email
      },
      include: {
        model: models.User_Password,
        attributes: ['password_hash'],
        required: true
      }
    });

    if (!user) {
      return res.status(400).send({ error: 'User not exists' });
    } else {
      console.log(user);
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
      phone_numbers,
      user_password_id
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

          if (!user) {
            return res.status(400).send({ error: 'Something went wrong' });
          } else {
            return res.status(200).send({ message: 'Success Create', user });
          }
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(400).send({ error: 'Registration Failed' });
    }
  }
};
