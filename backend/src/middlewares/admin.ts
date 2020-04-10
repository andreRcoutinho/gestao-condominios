import { Request, Response, NextFunction } from 'express';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req["role"] === "Administrador"){
        next();
    }else {
        return res.status(401).send({message: "Sem autorização de administrador para executar a funcionalidade"})
    }
}

export default adminMiddleware;