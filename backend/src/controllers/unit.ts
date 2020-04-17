import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { Unit } from '../models/unit';
import Validator from 'validatorjs';

export async function index(req: Request, res: Response) {
    try {
        let units = await Unit.find();
        res.status(HttpStatus.OK).send(units);
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Alguma coisa correu mal ..." })
    }
}
export async function show(req: Request, res: Response) {
    try {
        let unit = await Unit.findOne({ where: { id: req.params.id } });
        if (!unit) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: "O ID dessa Unidade não existe na base de dados" })
        }
        return res.status(HttpStatus.OK).send(unit);
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Alguma coisa correu mal ..." })
    }
}
export async function update(req: Request, res: Response) {
    try {
        let rules = {
            unit: 'required'
        };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(400).send({
                message: 'Faltam campos para completar o update!',
            });
        }

        let unit = await Unit.findOne({ where: { id: req.params.id } });
        if (!unit) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: "O ID dessa Unidade não existe na base de dados" })
        }

        unit.setUnit(req.body.unit);
        await unit.save();
        return res.send({ success: true, unit });

    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Alguma coisa correu mal ..." })
    }
}