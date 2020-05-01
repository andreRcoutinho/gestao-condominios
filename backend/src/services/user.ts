import { User } from '../models/user';
import { UserPassword } from '../models/user_password';
import * as api_errors from '../api/api_errors';
import { Contact } from '../models/contact';


async function findUser(email: Number): Promise<User> {
    let user: User = await User.findOne({ where: { email } });
    if (user)
        return user;
}

export async function index() {
    try {
        let users: User[] = await User.find();
        let user_res: { id, name, email, role_name, units, contacts }[] = [];
        for (let i = 0; i < users.length; i++) {
            let user_units = users[i].getUnits();
            let units: {}[] = [];
            let contacts: {}[] = [];
            let user_contacts = await Contact.find({ where: { user: users[i] } });
            for (let j = 0; j < user_contacts.length; j++) {
                contacts.push(user_contacts[j].getPhone_number());
            }
            for (let j = 0; j < user_units.length; j++) {
                units.push(user_units[j].getUnit());
            }
            user_res.push({
                id: users[i].getId(),
                name: users[i].getFirst_name() + ' ' + users[i].getLast_name(),
                email: users[i].getEmail(),
                role_name: users[i].getRole().getRole_name(),
                units: units,
                contacts: contacts
            })
        }
        return user_res;
    } catch (error) {
        return error;
    }
}

export async function show(id: Number) {
    try {

    } catch (error) {
        return error;
    }
}

export async function update(id: Number, body: any) {
    try {

    } catch (error) {
        return error;
    }
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
