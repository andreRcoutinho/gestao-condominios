import { ServiceType } from '../models/service_type';

export async function index() {
    try {
        let service_types: ServiceType[] = await ServiceType.find();
        if (!service_types) {
            throw new Error('Não existem Tipos de Serviço na base de dados');
        }
        return service_types;
    } catch (e) {
        return;
    }
}
export async function show(id: number) {
    try {
        let service_type: ServiceType = await ServiceType.findOne({ where: { id } });
        if (!service_type) {
            throw new Error('Não existe nenhum Tipo de Servico na base de dados com esse id')
        }
        return service_type;
    } catch (e) {
        return;
    }
}
export async function create(service_type: string) {
    try {
        let has_service_type: ServiceType = await ServiceType.findOne({ where: { service_type } });
        if (has_service_type) {
            throw new Error('Já existe um Tipo de Serviço com esse nome na base de dados');
        }
        let new_service_type: ServiceType = new ServiceType(service_type);
        await new_service_type.save();
        return new_service_type;
    } catch (e) {
        return;
    }
}
export async function update(service_type_name: string, id: number) {
    try {
        let service_type: ServiceType = await ServiceType.findOne({ where: { id } });
        if (!service_type) {
            throw new Error('Não existe nenhum Tipo de Servico na base de dados com esse id')
        }
        service_type.setService_type(service_type_name);
        await service_type.save();
        return service_type;
    } catch (e) {
        return;
    }
}
export async function remove(id: number) {
    try {
        let service_type: ServiceType = await ServiceType.findOne({ where: { id } });
        if (!service_type) {
            throw new Error('Não existe nenhum Tipo de Servico na base de dados com esse id')
        }
        await ServiceType.remove(service_type);
        return service_type;
    } catch (e) {
        return;
    }
}

