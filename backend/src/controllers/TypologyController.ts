import { Request, Response } from 'express';
import { Typology } from '../models/typology';
import Validator from 'validatorjs';

export default {
  async index(req: Request, res: Response) {
    try {
      var typologys: Typology[] = await Typology.find();
      return res.send(typologys);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
  async show(req: Request, res: Response) {
    try {
      var typology: Typology = await Typology.findOne({
        where: { id: req.params.id },
      });
      return res.send(typology);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
  async create(req: Request, res: Response) {
    try {
      let rules = {
        typology: 'required',
      };
      var validation = new Validator(req.body, rules);
      if (validation.fails()) {
        return res.status(400).send({
          message: 'Faltam campos para completar a criação da tipologia!',
        });
      }

      var typology: Typology = new Typology(req.body.typology);
      await typology.save();

      return res.send({ success: true, typology });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
  async update(req: Request, res: Response) {
    try {
      let rules = {
        typology: 'required',
      };
      var validation = new Validator(req.body, rules);
      if (validation.fails()) {
        return res.status(400).send({
          message: 'Faltam campos para completar a criação da tipologia!',
        });
      }

      var updateTypology = new Typology(req.body.typology);

      await Typology.update(req.params.id, updateTypology);

      var typology: Typology = await Typology.findOne(req.params.id);

      return res.send(typology);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      var typology: Typology = await Typology.findOne({
        where: { id: req.params.id },
      });
      await Typology.remove(typology);

      return res.send({ success: true });
    } catch (error) {
      res.status(500).send({ message: 'Alguma coisa correu mal ...' });
    }
  },
};
