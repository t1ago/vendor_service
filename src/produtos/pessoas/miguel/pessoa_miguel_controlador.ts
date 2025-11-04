import { Request, Response } from "express";
import { service_delete, service_get, service_insert, service_update } from "./pessoa_miguel_servico";


export const insert = async (req: Request, res: Response) => {
    
    const parametros = {
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa, 
        sexo: req.body.sexo,              
        data_inicio: req.body.data_inicio, 
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
        data_inicio: req.body.data_inicio,
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
        id: req.params.id || null,
        nome: req.query.nome || null,
        apelido: req.query.apelido || null,
        tipo_pessoa: req.query.tipo_pessoa || null,
        sexo: req.query.sexo || null,
        documento_estadual: req.query.documento_estadual || null,
        documento_federal: req.query.documento_federal || null,
        ativo: req.query.ativo || null,
        id_vinculo: req.query.id_vinculo || null
    }

    const resultado = await service_get(parametros)
    res.status(resultado.executado ? 200 : 500).json(resultado)
}