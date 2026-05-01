import { Request, Response } from "express";
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { credencial_Select } from "./credencial_service";

export const credencial_selected = async (req: Request, res: Response) => {

    if (req.headers.authorization == undefined) {
        res.status(401).end()
    }
    else {
        const auth = atob(req.headers.authorization.split(" ")[1])
        const autosplit = auth.split(":");

        const params = {
            username: autosplit[0],
            password: autosplit[1]
        }

        console.log(params)

        const resultado = await credencial_Select(params);

        if (resultado.data.token) {
            res.json(resultado)
        } else {
            res.status(401).end()
        }

    }
}

export const getUsuario = async (req: Request, res: Response) => {

    const dadosUser = (req as any).user

    const resultado: IResultadoAPI = {
        executado: true,
        mensagem: '',
        data: dadosUser,
    };

    return res.json(resultado)
};
