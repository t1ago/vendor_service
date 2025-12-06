import { Request, Response } from "express"
import { buscarTodosEstados, buscarLocalidadePorCep } from "./endereco_servico"
import { responseAPI } from "../../../utils/utils";


export const buscarEstados = async (req: Request, res: Response) => {
    const resultado = await buscarTodosEstados();
    responseAPI(res, resultado);
}

export const buscarLocalidadeCep = async (req: Request, res: Response) => {
    const resultado = await buscarLocalidadePorCep(req.params.cep);
    responseAPI(res, resultado);
}
