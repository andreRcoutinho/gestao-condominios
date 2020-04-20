import { Role } from '../models/role';
import * as api_errors from '../api/api_errors';


export async function index() {
    try {
        var roles: Role[] = await Role.find();
        if (!roles)
            throw new Error(api_errors.ROLES_EMPTY);
        return roles;
    } catch (e) {
        return e;
    }
}
