import { Request, Response } from 'express';
import { ServiceType } from '../models/service_type';
import Validador from 'validatorjs';
import HttpStatus from 'http-status-codes';
import Validator from 'validatorjs';

export default {
    async index(req: Request, res: Response){
        try{
            let service_types = await ServiceType.find();
            return res.send(service_types);
        }catch(error){
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."});
        }
    },
    async show(req: Request, res: Response){
        try{
            let service_type = await ServiceType.findOne({ where: { id: req.params.id }})
            if(!service_type){
                return res.status(HttpStatus.NOT_FOUND).send({message: "O ID desse Tipo de Serviço não existe na base de dados"})
            }
            return res.status(HttpStatus.OK).send(service_type);
        }catch(error){
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."});
        }
    },
    async create(req: Request, res: Response){
        try{
            let rules = {
                service_type: "required"
            }
            var validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res.status(400).send({ message: 'Faltam campos para completar a criação do tipo de serviço!' });
            }

            let service_type = new ServiceType(req.body.service_type);
            await service_type.save();
            return res.status(HttpStatus.OK).send(service_type);
        }catch(error){
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."});
        }
    },
    async update(req: Request, res: Response){
        try{
            let rules = {
                service_type: "required"
            }
            var validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res.status(400).send({ message: 'Faltam campos para completar a criação do tipo de serviço!' });
            }

            let service_type = await ServiceType.findOne({ where : { id: req.params.id }})
            if(!service_type){
                return res.status(HttpStatus.NOT_FOUND).send({ message: "Tipo de serviço não encontrado na base de dados" })
            }
            service_type.setService_type(req.body.service_type);
            await service_type.save();

            return res.status(HttpStatus.OK).send(service_type);
        }catch(error){
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."});
        }
    },
    async delete(req: Request, res: Response){
        try{
            let service_type = await ServiceType.findOne({ where : { id: req.params.id }});
            if(!service_type){
                return res.status(HttpStatus.NOT_FOUND).send({message: "Não existe nenhum serviço na base de dados com esse id"});
            }
            await ServiceType.remove(service_type);
            return res.status(HttpStatus.OK).send({message: "Tipo de Serviço apagado com sucesso"});
        }catch(error){
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."});
        }
    }
};