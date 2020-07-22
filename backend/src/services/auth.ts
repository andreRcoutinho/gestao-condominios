import { User } from '../models/user';
import { UserPassword } from '../models/user_password';
import { Role } from '../models/role';
import { Unit } from '../models/unit';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/auth';
import * as api_errors from '../api/api_errors';
import { Contact } from '../models/contact';
import crypto from 'crypto';
import { transporter } from '../config/email';
import { forgot_password } from '../email/forgot_password';
import { welcome } from '../email/welcome';
import { LessThan, LessThanOrEqual } from 'typeorm';

async function hasUser(email: String): Promise<boolean> {
    try {
        let hasUser: User = await User.findOne({ where: { email } });

        if (hasUser) {
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}

export async function signUp(body: any) {
    try {
        if (await hasUser(body.email)) {
            throw new Error(api_errors.USER_ALREADY_EXISTS);
        }

        var role = await Role.findOne({ where: { id: body.role_id } });
        if (!role) {
            throw new Error(api_errors.ROLE_NOT_EXISTS);
        }

        let password: String = 'lei2020';

        if (body.password) {
            password = body.password
        }

        let user_password: UserPassword = new UserPassword(password);

        let user: User = new User(body.email, body.first_name, body.last_name, body.IBAN, body.NIF, role, user_password);

        await user_password.save();

        if (body.units_id) {
            let units = await Unit.findByIds(body.units_id);
            if (!units) {
                throw new Error(api_errors.UNIT_NOT_EXISTS);
            }
            user.setUnits(units);
        }

        await user.save();

        for (let index = 0; index < body.contacts.length; index++) {
            let contact = body.contacts[index];
            let c: Contact = new Contact(contact, user, null);
            await c.save();
        }

        if (!body.password) {
            await sendWelcomeEmail(user)
        }

        return true;
    } catch (error) {
        return error;
    }
}

async function sendWelcomeEmail(user: User) {
    try {
        let token = crypto.randomBytes(20).toString('hex');

        let now = new Date();
        now.setHours(now.getHours() + 4);

        let user_password: UserPassword = user.getUser_password();
        user_password.setPassword_expire_date(now);
        user_password.setPassword_reset_token(token);
        await user_password.save();

        transporter.sendMail({
            to: String(user.getEmail()),
            from: 'lei.gestao.condominios@gmail.com',
            subject: 'Bem-vindo',
            html: welcome(token, user.getEmail())
        });

        return true;
    } catch (error) {
        console.log(error);
    }

}

export async function signIn(body: any) {
    try {
        if (!(await hasUser(body.email))) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let user: User = await User.findOne({ where: { email: body.email } });

        if (!user.getUser_password().verify_password(body.password)) {
            throw new Error(api_errors.INVALID_PASSWORD);
        }

        const token: string = jwt.sign(
            { id: user.getId(), role: user.getRole().getRole_name() },
            SECRET,
            {
                expiresIn: '2h',
            }
        );

        const response = {
            id: user.getId(),
            first_name: user.getFirst_name(),
            last_name: user.getLast_name(),
            role_name: user.getRole().getRole_name(),
            token,
        };
        return response;
    } catch (error) {
        return error;
    }
}

export async function forgotPassword(body: any) {
    try {
        let user: User = await User.findOne({ where: { email: body.email } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        let user_password: UserPassword = await UserPassword.findOne({ where: { user } });
        user_password.setPassword_expire_date(now);
        user_password.setPassword_reset_token(token);
        await user_password.save();

        transporter.sendMail({
            to: body.email,
            from: 'lei.gestao.condominios@gmail.com',
            subject: 'Recuperar Password',
            html: forgot_password(token, user.getEmail())

        });

        return true;
    } catch (error) {
        return error;
    }
}

export async function resetPassword(body: any) {
    try {
        let user: User = await User.findOne({ where: { email: body.email } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let user_password: UserPassword = user.getUser_password();
        if (body.token != user_password.getPassword_reset_token()) {
            throw new Error(api_errors.INVALID_TOKEN);
        }

        let now = new Date();
        if (now > user_password.getPassword_expire_date()) {
            throw new Error(api_errors.TOKEN_EXPIRED);
        }

        if (body.new_password !== body.new_password_repeat) {
            throw new Error(api_errors.NEW_PASSWORD_REPEAT_ERROR);
        }

        user_password.update_password(body.new_password);
        user_password.save();

        return true;

    } catch (error) {
        return error;
    }
}

