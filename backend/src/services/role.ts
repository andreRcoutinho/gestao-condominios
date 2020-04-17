import { Role } from '../models/role';
import { RoleNotExists } from '../api/api_error';

export default {
    async index() {
        try {
            var roles: Role[] = await Role.find();
            if (!roles)
                throw new RoleNotExists();
            return roles;
        } catch (e) {
            return;
        }
    }
}