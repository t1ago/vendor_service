import { Request , Response } from "express";
import { buscar, validar } from "./credencial_servico";
import { ERROR_MESSAGES } from "../../../utils/victor/error_messages";
import { responseAPI } from "../../../utils/utils";


export const validarCredencial = async (req: Request, res: Response) => {
    if(req.headers.authorization == undefined) {
        res.status(401).end();
    } else {
        const auth = atob(req.headers.authorization.split(" ")[1]);
        const authSplited = auth.split(":");

        const parametros = {
            email : authSplited[0],
            password : authSplited[1]
        } 

        const results = await validar(parametros);
        if(results.mensagem == ERROR_MESSAGES.NOAUTHORIZED) {
            res.status(401).end();
        } else {
            responseAPI(res,results);
        }
    }
}

export const buscarUsuario = async (req : Request, res: Response) => {
    const results = await buscar(req);
    responseAPI(res,results);
}