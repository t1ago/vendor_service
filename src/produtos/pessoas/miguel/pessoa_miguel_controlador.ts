import { Request, Response } from "express";
import { service_get, service_inativar, service_insert, service_update } from "./pessoa_miguel_servico";


export const insert = async (req: Request, res: Response) => {

    const parametros = {
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        data_nascimento: req.body.data_nascimento,
        documento_estadual: req.body.documento_estadual,
        documento_federal: req.body.documento_federal,
        ativo: req.body.ativo,
        id_vinculo: req.body.id_vinculo 
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
        data_nascimento: req.body.data_nascimento,
        documento_estadual: req.body.documento_estadual,
        documento_federal: req.body.documento_federal,
        ativo: req.body.ativo,
        id_vinculo: req.body.id_vinculo
    }

    const resultado_parametros = await service_update(parametros)
    if (resultado_parametros.executado) {
        res.status(200).json(resultado_parametros)
    } else {
        res.status(500).json(resultado_parametros)
    }
}

export const control_inativar = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id 
    }
    
    const resultado_inativacao = await service_inativar(parametros) 
    if (resultado_inativacao.executado) {
        res.status(200).json(resultado_inativacao)
    } else {
        res.status(500).json(resultado_inativacao)
    }
}
export const control_get = async (req: Request, res: Response) => {

    const parametros = {
        id: req.params.id,
        tipo_pessoa: (req.query.tipo as string) || "",  
    }

    const resultado = await service_get(parametros);

    if (resultado.executado) {
        res.status(200).json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}