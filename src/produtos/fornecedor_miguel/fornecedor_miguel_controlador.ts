import { Request, Response } from "express";
import { MicroservicoDelete, MicroservicoGet_ALl, MicroservicoGet_Id, MicroservicoGet_name, MicroservicoInsert, MicroservicoUpdate } from "./fornecedor_miguel_servico";

export const NovoPost = async (req:Request, res:Response) => {
    let parametros = {
        nome: req.body.nome,
        descricao: req.body.descricao
    }
    const resultado_post = await MicroservicoInsert(parametros)
    if(resultado_post.executado){
        res.status(200).json(resultado_post)
    }else {
        res.status(500).json(resultado_post)
    }
}

export const NovoGet_All = async (res: Response) => {

    const resultado_Get_tudo = await MicroservicoGet_ALl()
    if(resultado_Get_tudo.executado){
        res.status(200).json(resultado_Get_tudo)
    }else {
        res.status(500).json(resultado_Get_tudo)
    }
}

export const NovoGet_Id = async (req:Request, res:Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado_Get_Id = await MicroservicoGet_Id(parametros)
    if(resultado_Get_Id.executado){
        res.status(200).json(resultado_Get_Id)
    }else {
        res.status(500).json(resultado_Get_Id)
    }
}


export const NovoUpdate = async (req:Request, res:Response) => {
    let parametros = {
        id: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    }
    const resultado_update = await MicroservicoUpdate(parametros)
    if(resultado_update.executado){
        res.status(200).json(resultado_update)
    }else {
        res.status(500).json(resultado_update)
    }
}


export const NovoDelete = async (req:Request, res:Response) => {
    let parametros = {
        id: req.params.id
    }
    const resultado_Delete = await MicroservicoDelete(parametros)
    if(resultado_Delete.executado){
        res.status(200).json(resultado_Delete)
    }else {
        res.status(500).json(resultado_Delete)
    }
}

export const NovoGet_Name = async (req:Request, res:Response) => {
    let parametros = {
        nome: req.body.nome
    }
    const resultado_Get_Name = await MicroservicoGet_name(parametros)
    if(resultado_Get_Name.executado){
        res.status(200).json(resultado_Get_Name)
    }else {
        res.status(500).json(resultado_Get_Name)
    }
}





