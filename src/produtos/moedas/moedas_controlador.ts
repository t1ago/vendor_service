import { Request, Response } from "express"
import { moedaBuscar, moedaDelete, moedainsert, moedaUpdate } from "./moedas_servico"

export const inserir = async (req: Request, res: Response) => {
    let parametros = {
        nome: req.body?.nome,
        moeda: req.body?.moeda
    }
    const resultado_insert = await moedainsert(parametros)
    if (resultado_insert.executado) {
        res.status(200).json(resultado_insert)
    } else {
        res.status(500).json(resultado_insert)
    }
}

export const update = async (req: Request, res: Response) => {
    let parametros = {
        "id": req.body?.id,
        "nome": req.body?.nome,
        "moeda": req.body?.moeda
    }
    const resultado_insert = await moedaUpdate(parametros)
    if (resultado_insert.executado) {
        res.status(200).json(resultado_insert)
    } else {
        res.status(500).json(resultado_insert)
    }
}

export const delet = async (req: Request, res: Response) => {
    let parametros = {
        id: req.params?.id
    }
    const resultado_insert = await moedaDelete(parametros)
    if (resultado_insert.executado) {
        res.status(200).json(resultado_insert)
    } else {
        res.status(500).json(resultado_insert)
    }
}

export const buscar = async (req: Request, res: Response) => {
    // CORREÇÃO: agora pega os parâmetros de busca da URL (GET)
    const parametros = {
        'id': req.query?.id,
        'nome': req.query?.nome,
        'moeda': req.query?.moeda
    };
    const resultado_busca = await moedaBuscar(parametros)
    if (resultado_busca && resultado_busca.executado) {
        res.status(200).json(resultado_busca)
    } else {
        res.status(500).json(resultado_busca)
    }
}