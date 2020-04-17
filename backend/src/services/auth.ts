import { User } from '../models/user';
import { UserPassword } from '../models/user_password';
import { UserAlreadyExists, RoleNotExists, UnitNotExists, UserNotExists, InvalidPassword } from '../api/api_error';
import { Role } from '../models/role';
import { Unit } from '../models/unit';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

async function hasUser(email: String): Promise<boolean | User> {
    try {
        let hasUser: User = await User.findOne({ where: { email } })
        if (hasUser)
            return true;
        return false;
    } catch (e) {
        return false;
    }
}


export async function signUp(body: any) {
    try {
        if (await hasUser(body.email)) {
            throw new UserAlreadyExists();
        }

        var role = await Role.findOne({ where: { id: body.role_id } });
        if (!role) {
            throw new RoleNotExists();
        }

        var user_password: UserPassword = new UserPassword(body.password);

        var user: User = new User(body.email, body.first_name, body.last_name, body.IBAN, body.NIF, role, user_password);

        await user_password.save();

        let units = await Unit.findByIds(body.units_id);
        if (!units) {
            throw new UnitNotExists();
        }

        user.setUnits(units);
        await user.save();

        return user;
    } catch (e) {
        return;
    }
}

export async function signIn(body: any) {
    try {
        if (await !hasUser(body.email)) {
            throw new UserNotExists();
        }

        let user: User = await User.findOne({ where: { email: body.email } });

        if (!user.getUser_password().verify_password(body.password)) {
            throw new InvalidPassword();
        }

        const token: string = jwt.sign(
            { id: user.getId(), role: user.getRole().getRole_name() },
            authConfig.secret,
            {
                expiresIn: 86400,
            }
        );

        const response = {
            user: {
                id: user.getId(),
                first_name: user.getFirst_name(),
                last_name: user.getLast_name(),
                role_name: user.getRole().getRole_name()
            },
            token
        }
        return response;

    } catch (e) {
        return;
    }
}
