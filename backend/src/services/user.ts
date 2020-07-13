import { User } from '../models/user';
import { UserPassword } from '../models/user_password';
import * as api_errors from '../api/api_errors';
import { Contact } from '../models/contact';
import { Unit } from '../models/unit';
import { Role } from '../models/role';

async function findUser(email: Number): Promise<User> {
    let user: User = await User.findOne({ where: { email } });
    if (user) return user;
}

export async function index() {
    try {
        let users: User[] = await User.find();
        let user_res: { id; name; email; IBAN; NIF; role_name; units; contacts }[] = [];
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
                IBAN: users[i].getIBAN(),
                NIF: users[i].getNIF(),
                role_name: users[i].getRole().getRole_name(),
                units: units,
                contacts: contacts,
            });
        }
        return user_res;
    } catch (error) {
        return error;
    }
}

export async function show(id: Number) {
    try {
        let user_res: { id; name; email; iban; nif; role_name; units; contacts };
        let user: User = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let user_contacts: Contact[] = await Contact.find({ where: { user } });
        let user_units: Unit[] = user.getUnits();
        let units: {}[] = [];
        for (let i = 0; i < user_units.length; i++) {
            units.push(user_units[i].getUnit());
        }

        user_res = {
            id: user.getId(),
            name: user.getFirst_name() + ' ' + user.getLast_name(),
            email: user.getEmail(),
            iban: user.getIBAN(),
            nif: user.getNIF(),
            role_name: user.getRole().getRole_name(),
            units,
            contacts: user_contacts,
        };

        return user_res;
    } catch (error) {
        return error;
    }
}

export async function update(id: Number, body: any) {
    try {
        let user: User = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        await User.update(Number(user.getId()), body);

        return true;
    } catch (error) {
        return error;
    }
}

export async function remove(id: Number) {
    try {
        let user: User = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let user_contacts: Contact[] = await Contact.find({ where: { user } });

        await Contact.remove(user_contacts);
        await User.remove(user);
        return user;

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

export async function updateRole(id: Number, body: any) {
    try {
        let user: User = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let role: Role = await Role.findOne({ where: { id: body.role_id } });
        if (!role) {
            throw new Error(api_errors.ROLE_NOT_EXISTS);
        }

        user.setRole(role);
        await user.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function addContact(id: Number, body: any) {
    try {
        let user: User = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let contact: Contact = new Contact(body.phone_number, user, null);
        await contact.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function updateContact(body: any) {
    try {
        let contact: Contact = await Contact.findOne({ where: { id: body.contact_id } });
        if (!contact) {
            throw new Error(api_errors.CONTACT_NOT_EXISTS);
        }
        contact.setPhone_number(body.phone_number);
        await contact.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function deleteContact(body: any) {
    try {
        let contact: Contact = await Contact.findOne({ where: { id: body.contact_id } });
        if (!contact) {
            throw new Error(api_errors.CONTACT_NOT_EXISTS);
        }
        await Contact.remove(contact);

        return true;
    } catch (error) {
        return error;
    }
}

export async function addUnit(id: Number, body: any) {
    try {
        let user: User = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let unit: Unit = await Unit.findOne({ where: { id: body.unit_id } });
        if (!unit) {
            throw new Error(api_errors.UNIT_NOT_EXISTS);
        }

        let units: Unit[] = user.getUnits();
        units.push(unit);

        user.setUnits(units);
        await user.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function deleteUnit(id: Number, body: any) {
    try {
        let user: User = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error(api_errors.USER_NOT_EXISTS);
        }

        let unit_remove: Unit = await Unit.findOne({ where: { id: body.unit_id } });
        if (!unit_remove) {
            throw new Error(api_errors.UNIT_NOT_EXISTS);
        }

        let units: Unit[] = user.getUnits();
        units.filter((unit, index) => {
            if (unit.getId() === unit_remove.getId()) {
                delete units[index];
            }
        });

        user.setUnits(units);
        await user.save();

        return true;
    } catch (error) {
        return error;
    }
}
