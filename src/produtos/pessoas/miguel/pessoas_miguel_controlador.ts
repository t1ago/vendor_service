import { Request, Response } from "express";
import { service_delete, service_get, service_insert, service_update } from "./pessoas_miguel_servico";



export const insert = async (req: Request, res: Response) => {
    const parametros = {
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        idade: req.body.idade,
        rg: req.body.rg,
        cpf: req.body.cpf,
        ativo: req.body.ativo,
        vinculo: req.body.vinculo
    }
    const resultado_parametros = await service_insert(parametros)
    if (resultado_parametros.executado) {
        res.status(200).json(resultado_parametros)
    } else {
        res.status(500).json(resultado_parametros)
    }
}

export const update = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id,
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        idade: req.body.idade,
        rg: req.body.rg,
        cpf: req.body.cpf,
        ativo: req.body.ativo,
        vinculo: req.body.vinculo
    }
    const resultado_parametros = await service_update(parametros)
    if (resultado_parametros.executado) {
        res.status(200).json(resultado_parametros)
    } else {
        res.status(500).json(resultado_parametros)
    }
}

export const control_delete = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id
    }
    const resultado_parametros = await service_delete(parametros)
    if (resultado_parametros.executado) {
        res.status(200).json(resultado_parametros)
    } else {
        res.status(500).json(resultado_parametros)
    }
}

export const control_get = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id,
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        idade: req.body.idade,
        rg: req.body.rg,
        cpf: req.body.cpf,
        ativo: req.body.ativo,
        vinculo: req.body.vinculo
    }
    const resultado_parametros = await service_get(parametros)
    if (resultado_parametros.executado) {
        res.status(200).json(resultado_parametros)
    } else {
        res.status(500).json(resultado_parametros)
    }
}