import { Request , Response } from "express";
import { buscar, validar } from "./credencial_servico";


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
        if(results.mensagem == "Não autorizada") {
            res.status(401).end();
        } else {
            if(results.executado) {
                res.json(results);
            } else {
                res.status(500).json(results);
            }
        }
    }
}

export const buscarUsuario = async (req : Request, res: Response) => {
    const results = await buscar(req);
    res.status(200).json(results);
}