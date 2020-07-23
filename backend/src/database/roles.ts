import { Role } from '../models/role';

export async function SeedRoles(): Promise<boolean> {

    try {
        var roles: Role[] = await Role.find();

        if (!roles.length) {
            var role_admin: Role = new Role('Administrador');
            await role_admin.save();
            var role_owner: Role = new Role('Condómino');
            await role_owner.save();
        }

    } catch (error) {
        return false;
    }

    return true;
}