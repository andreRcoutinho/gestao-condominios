import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  var authHeader: string = req.headers.authorization;
  
  if(!authHeader){
    return res.status(401).send({message: "Sem token de autorização!"})
  }

  var parts : string[] = authHeader.split(' ');

  if(parts.length !== 2){
    return res.status(401).send({message: "Token de autorização não está no formato correto!"})
  }

  var [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Token de autorização não está no formato correto!"});
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token de autorização inválido' });
    req["role"] = decoded.role;
    return next();
  });
};

export default authMiddleware;
