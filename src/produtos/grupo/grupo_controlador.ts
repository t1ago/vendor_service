
import { novogrupo, alterargruposervico, removergruposervico, buscargrupoServico, buscargruposServico} from "./grupo_servico"
import { Request, Response } from "express"

export const inserirgrupo = async (req: Request, res: Response) => {
    let parametros = {
        nome: req.body.nome
    }
    const resultado = await novogrupo(parametros)
    if(resultado.executado) {
        res.status(200).json(resultado)
    }else {
        res.status(500).json(resultado)
    }
}

export const alterargrupo = async (req: Request, res: Response) => {
    let parametros = {
        nome: req.body.nome,
        id: req.params.id
    }
    const resultado = await alterargruposervico(parametros)
    if(resultado.executado) {
        res.status(200).json(resultado)
    }else {
        res.status(500).json(resultado)
    }
}

export const removergrupo = async (req: Request, res: Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado = await removergruposervico(parametros)
    if(resultado.executado) {
        res.status(200).json(resultado)
    }else {
        res.status(500).json(resultado)
    }
}

export const buscargrupo = async (req: Request, res: Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado = await buscargrupoServico(parametros)
    if(resultado.executado) {
        res.status(200).json(resultado)
    }else {
        res.status(500).json(resultado)
    }
}

export const buscargrupos = async (_: Request, res: Response) => {
    const resultado = await buscargruposServico()
    if(resultado.executado) {
        res.status(200).json(resultado)
    }else {
        res.status(500).json(resultado)
    }
}