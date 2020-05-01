import { ServiceType } from '../models/service_type';
import * as api_errors from '../api/api_errors';


export async function index() {
    try {
        let service_types: ServiceType[] = await ServiceType.find();
        if (service_types.length === 0) {
            throw new Error(api_errors.SERVICE_TYPES_EMPTY);
        }
        return service_types;
    } catch (error) {
        return error;
    }
}
export async function show(id: number) {
    try {
        let service_type: ServiceType = await ServiceType.findOne({ where: { id } });
        if (!service_type) {
            throw new Error(api_errors.SERVICE_TYPE_NOT_EXISTS)
        }
        return service_type;
    } catch (error) {
        return error;
    }
}
export async function create(service_type: string) {
    try {
        let has_service_type: ServiceType = await ServiceType.findOne({ where: { service_type } });
        if (has_service_type) {
            throw new Error(api_errors.SERVICE_TYPE_ALREADY_EXISTS);
        }
        let new_service_type: ServiceType = new ServiceType(service_type);
        await new_service_type.save();
        return new_service_type;
    } catch (error) {
        return error;
    }
}
export async function update(service_type_name: string, id: number) {
    try {
        let service_type: ServiceType = await ServiceType.findOne({ where: { id } });
        if (!service_type) {
            throw new Error(api_errors.SERVICE_TYPE_NOT_EXISTS)
        }
        if (service_type.getService_type() === service_type_name) {
            throw new Error(api_errors.SERVICE_TYPE_ALREADY_EXISTS);
        }
        service_type.setService_type(service_type_name);
        await service_type.save();
        return service_type;
    } catch (error) {
        return error;
    }
}
export async function remove(id: number) {
    try {
        let service_type: ServiceType = await ServiceType.findOne({ where: { id } });
        if (!service_type) {
            throw new Error(api_errors.SERVICE_TYPE_NOT_EXISTS)
        }
        await ServiceType.remove(service_type);
        return service_type;
    } catch (error) {
        return error;
    }
}

