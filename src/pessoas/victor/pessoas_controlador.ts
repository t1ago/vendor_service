import { Request,Response } from "express";
import { atualizarPessoas, buscarServico, inativarPessoas, inserirPessoas } from "./pessoas_servico";

export const novaPessoa = async(req:Request,res:Response) => {
    const parametros = {
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        idade: req.body.idade,
        documento_federal: req.body.documento_federal,
        documento_estadual: req.body.documento_estadual,
        ativo: req.body.ativo,
        id_vinculo : req.body.id_vinculo
    }
    const resultado_insert = await inserirPessoas(parametros)
    if(resultado_insert.executado){
        res.json(resultado_insert)
    } else {
        res.status(500).json(resultado_insert)
    }
}

export const novaBusca = async(req:Request,res:Response) => {
    let parametros : any
    if(req.query != undefined && req.query.tipo_pessoa){
        parametros = {
            tipo_pessoa : req.query.tipo_pessoa 
        }
    } 
    const resultado_select = await buscarServico(parametros)
    if(resultado_select.executado) {
        res.json(resultado_select)
    } else {
        res.status(500).json(resultado_select)
    }
}

export const novaAtualiza = async(req:Request,res:Response) => {
    const parametros = {
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        idade: req.body.idade,
        documento_federal: req.body.documento_federal,
        documento_estadual: req.body.documento_estadual,
        ativo: req.body.ativo,
        id_vinculo : req.body.id_vinculo,
        id_pessoa: req.body.id_pessoa || req.params.id
    }
    const resultado_update = await atualizarPessoas(parametros)
    if(resultado_update.executado) {
        res.json(resultado_update)
    } else {
        res.status(500).json(resultado_update)
    }
}

export const inativo = async(req:Request,res:Response) => {
    const parametros = {
        id_pessoa : req.params.id || req.body.id_pessoa
    }
    const resultado_delete = await inativarPessoas(parametros)
    if(resultado_delete.executado){
        res.json(resultado_delete)
    } else {
        res.status(500).json(resultado_delete)
    }
}