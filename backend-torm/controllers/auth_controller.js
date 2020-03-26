const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Validator = require('validatorjs')
const conn = require('typeorm');


module.exports = {
    async signIn(req, res) {
        //TO DO Validations

    },
    async signUp(req, res) {
        let rules = {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email',
            password: 'required',
            NIF: 'required',
            IBAN: 'required',
            role_id: 'required',
            unit_id: 'required',
            phone_numbers: 'required'
        }

        let validation = new Validator(req.body, rules);

        if (validation.fails()) {
            return res.status(400).send({ success: false, message: "Faltam informações" })
        }

        let salt = bcrypt.genSaltSync(10);
        let pass = bcrypt.hashSync(req.body.password, salt)
        let user_password_obj = {
            password_hash: pass,
            password_reset_token: 'teste',
            password_expire_date: new Date()
        }

        let user_password = await conn.getConnection().createQueryBuilder().insert().into('UserPassword').values(user_password_obj).execute();
        let role = await conn.getConnection().getRepository('Role').findOne({ where: { id: req.body.role_id } });

        if (!role) {
            return res.status(400).send({ success: false, message: "Faltam informações" })
        }


        let user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            NIF: req.body.NIF,
            IBAN: req.body.IBAN,
            user_password: user_password.identifiers[0],
            role: role
        }

        let created_user = await conn.getConnection().createQueryBuilder().insert().into('User').values(user).execute();

        let phone_numbers = [];
        req.body.phone_numbers.forEach(element => {
            phone_numbers.push({
                phone_number: element.phone_number,
                user: created_user.identifiers[0]
            })
        });
        console.log(phone_numbers);
        let created_contacts = await conn.getConnection().createQueryBuilder().insert().into('Contact').values(phone_numbers).execute();

        if (created_user) {
            return res.status(200).send({ success: true, message: 'Utilizador criado com sucesso!' })
        }
    }
};
