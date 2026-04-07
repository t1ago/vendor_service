import { NextFunction, Request , Response} from "express";
import jwt from 'jsonwebtoken';
import { IResultadoAPI } from "../../interfaces/resultado_api";

export const autentificadorInterruptor = (req: Request, res :Response, next : NextFunction) => {
    const auth = req.headers.authorization;
    if(auth) {
        const [,token] = auth.split(' ');

        try {
            const dadosUsuario = jwt.verify(token, process.env.SECRET || '');

            (req as any).user = dadosUsuario;
            return next();
        } catch (erro) {
            res.status(401).end()
        } 
    } else {
        res.status(401).end()
    }
}

export const limparResultado = () => {
    return {
        executado : false,
        mensagem : "",
        data : []
    } as IResultadoAPI
}
