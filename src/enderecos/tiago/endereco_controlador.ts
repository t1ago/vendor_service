import { Request, Response } from "express"
import { buscarTodosEstados, buscarLocalidadePorCep } from "./endereco_servico"


export const buscarEstados = async (req: Request, res: Response) => {
    const resultado = await buscarTodosEstados()

    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

export const buscarLocalidadeCep = async (req: Request, res: Response) => {
    const resultado = await buscarLocalidadePorCep(req.params.cep)

    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
