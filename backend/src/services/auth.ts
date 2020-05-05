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
import pug from 'pug';
import htmlToText from 'html-to-text';

async function hasUser(email: String): Promise<boolean> {
    try {
        let hasUser: User = await User.findOne({ where: { email } });
        if (hasUser) return true;
        return false;
    } catch (e) {
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

        var user_password: UserPassword = new UserPassword(body.password);

        var user: User = new User(
            body.email,
            body.first_name,
            body.last_name,
            body.IBAN,
            body.NIF,
            role,
            user_password
        );

        await user_password.save();

        let units = await Unit.findByIds(body.units_id);
        if (!units) {
            throw new Error(api_errors.UNIT_NOT_EXISTS);
        }

        user.setUnits(units);
        await user.save();

        for (let index = 0; index < body.contacts.length; index++) {
            const contact = body.contacts[index];
            let c: Contact = new Contact(contact, user, null);
            await c.save();
        }

        return true;
    } catch (e) {
        return e;
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
                expiresIn: "2h",
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
    } catch (e) {
        return e;
    }
}

export async function forgotPassword(body: any) {
    try {
        let user: User = await User.findOne({ where: { email: body.email } });
        if (!user) {
            throw new Error('Não existe nenhum utilizador com esse endereço de email');
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
            from: "lei.gestao.condominios@gmail.com",
            subject: "Recuperar Password",
            html: `
            <!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <title>Reset your password</title>
</head>

<head>
    <title>Rating Reminder</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="width=device-width" name="viewport">
    <style type="text/css">
        @font-face {
            font-family: "Postmates Std";
            font-weight: 600;
            font-style: normal;
            src: local("Postmates Std Bold"), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format("woff");
        }

        @font-face {
            font-family: "Postmates Std";
            font-weight: 500;
            font-style: normal;
            src: local("Postmates Std Medium"), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format("woff");
        }

        @font-face {
            font-family: "Postmates Std";
            font-weight: 400;
            font-style: normal;
            src: local("Postmates Std Regular"), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format("woff");
        }
    </style>
    <style media="screen and (max-width: 680px)">
        @media screen and (max-width: 680px) {
            .page-center {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            .footer-center {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
    </style>
</head>
<table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
    <tbody>
        <tr>
            <td style="text-align: center;">
                <table id="body" align="center" cellpadding="0" cellspacing="0" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
                    <tbody>
                        <tr>
                            <td>
                                <table class="page-center" align="center" cellpadding="0" cellspacing="0" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
                                    <tbody>
                                        <tr>
                                            <td style="padding-top: 24px;"><img src="https://d1pgqke3goo8l6.cloudfront.net/wRMe5oiRRqYamUFBvXEw_logo.png" style="width: 56px;"></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">Reset your password</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 48px; padding-bottom: 48px;">
                                                <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">You&apos;re receiving this e-mail because you requested a password reset for your Postmates account.</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">Please tap the button below to choose a new password.</td>
                                        </tr>
                                        <tr>
                                            <td><a data-click-track-id="37" href="https://postmates.com/" style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #00cc99; border-radius: 28px; display: block; text-align: center; text-transform: uppercase"
                                                    target="_blank">Reset Password</a></td>
                                        </tr>
                                        <p>Token provisório: ${token}</p>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
</table>`
        });

        return true;
    } catch (error) {
        return error;
    }
}

