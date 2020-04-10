import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

export default {
  async index(req: Request, res: Response){
    try{

    }catch(error){
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."})
    }
  },
  async show(req: Request, res: Response){
    try{

    }catch(error){
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."})
    }
  },
  async update(req: Request, res: Response){
    try{

    }catch(error){
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."})
    }
  },
  async delete(req: Request, res: Response){
    try{

    }catch(error){
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Alguma coisa correu mal ..."})
    }
  }
}