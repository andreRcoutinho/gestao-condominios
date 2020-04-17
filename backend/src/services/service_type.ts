import { ServiceType } from '../models/service_type';

export default {
    async index(){
        try{
            let service_types: ServiceType[] = await ServiceType.find();
            if(!service_types){
                throw new Error('Não existem Tipos de Serviço na base de dados');
            }
            return service_types;
        }catch(e){
            return;
        }
    },
    async show(id: number){

    }
}
