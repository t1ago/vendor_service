
import { novogrupo, alterargruposervico, removergruposervico, buscargrupoServico, buscargruposServico} from "./grupo_servico"
import { Request, Response } from "express"

export const inserirgrupo = async (req: Request, res: Response) => {
    let parametros = {
        nome: req.body.nome
    }
    const resultado_insert = await novogrupo(parametros)
    if(resultado_insert.executado) {
        res.status(200).json(resultado_insert)
    }else {
        res.status(500).json(resultado_insert)
    }
}

export const alterargrupo = async (req: Request, res: Response) => {
    let parametros = {
        nome: req.body.nome,
        id: req.params.id
    }
    const resultado_atualizar = await alterargruposervico(parametros)
    if(resultado_atualizar.executado) {
        res.status(200).json(resultado_atualizar)
    }else {
        res.status(500).json(resultado_atualizar)
    }
}

export const removergrupo = async (req: Request, res: Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado_deletar = await removergruposervico(parametros)
    if(resultado_deletar.executado) {
        res.status(200).json(resultado_deletar)
    }else {
        res.status(500).json(resultado_deletar)
    }
}

export const buscargrupo = async (req: Request, res: Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado_unidade = await buscargrupoServico(parametros)
    if(resultado_unidade.executado) {
        res.status(200).json(resultado_unidade)
    }else {
        res.status(500).json(resultado_unidade)
    }
}

export const buscargrupos = async (_: Request, res: Response) => {
    const resultado_tudo = await buscargruposServico()
    if(resultado_tudo.executado) {
        res.status(200).json(resultado_tudo)
    }else {
        res.status(500).json(resultado_tudo)
    }
}