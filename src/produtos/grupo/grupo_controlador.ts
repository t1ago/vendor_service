
import { novogrupo, alterargruposervico, removergruposervico, buscargrupoServico, buscargruposServico} from "./grupo_servico"
import { Request, Response } from "express"

export const inserirgrupo = async (req: Request, res: Response) => {
    let parametros = {
        nome: req.body.nome
    }
    const resultado_inserir = await novogrupo(parametros)
    if(resultado_inserir.executado) {
        res.status(200).json(resultado_inserir)
    }else {
        res.status(500).json(resultado_inserir)
    }
}

export const alterargrupo = async (req: Request, res: Response) => {
    let parametros = {
        nome: req.body.nome,
        id: req.params.id
    }
    const resultado_update = await novogrupo(parametros)
    if(resultado_update.executado) {
        res.status(200).json(resultado_update)
    }else {
        res.status(500).json(resultado_update)
    }
}

export const removergrupo = async (req: Request, res: Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado_delete = await novogrupo(parametros)
    if(resultado_delete.executado) {
        res.status(200).json(resultado_delete)
    }else {
        res.status(500).json(resultado_delete)
    }
}

export const buscargrupo = async (req: Request, res: Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado_id = await novogrupo(parametros)
    if(resultado_id.executado) {
        res.status(200).json(resultado_id)
    }else {
        res.status(500).json(resultado_id)
    }
}

export const buscargrupos = async (_: Request, res: Response) => {
    const resultado_all = await novogrupo(_)
    if(resultado_all.executado) {
        res.status(200).json(resultado_all)
    }else {
        res.status(500).json(resultado_all)
    }
}