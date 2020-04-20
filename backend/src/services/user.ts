import { User } from '../models/user';
import { UserPassword } from '../models/user_password';
import * as api_errors from '../api/api_errors';


async function findUser(email: Number): Promise<User> {
    let user: User = await User.findOne({ where: { email } });
    if (user)
        return user;
}


export async function updatePassword(body: any) {

    try {
        let user = await findUser(body.email);

        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        var user_password: UserPassword = user.getUser_password();
        user_password.update_password(body.new_password);
        await user_password.save();

        return {};
    } catch (error) {
        return error;
    }
}
