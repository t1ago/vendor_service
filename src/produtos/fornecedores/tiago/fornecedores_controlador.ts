import { Request, Response } from "express"
import {
    criarServico,
    alterarServico,
    removerServico,
    buscarServico
} from "./fornecedores_servico"


export const criar = async (req: Request, res: Response) => {
    const parametros = {
        'nome': req.body.nome,
        'descricao': req.body.descricao,
        'idCategoria': req.body.idCategoria
    }

    const resultado = await criarServico(parametros)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

export const alterar = async (req: Request, res: Response) => {
    const parametros = {
        'id': req.params.id,
        'nome': req.body.nome,
        'descricao': req.body.descricao,
        'idCategoria': req.body.idCategoria
    }

    const resultado = await alterarServico(parametros)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

export const remover = async (req: Request, res: Response) => {
    const parametros = {
        'id': req.params.id
    }

    const resultado = await removerServico(parametros)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

export const buscar = async (req: Request, res: Response) => {
    const parametros = {
        'id': req.body.id,
        'nome': req.body.nome
    }

    const resultado = await buscarServico(parametros)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

