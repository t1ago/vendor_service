import { Request, Response } from "express";
import { alterar_marca, buscar_marca, deletar_marca, inserir_marca } from "./marca_servico";

//Controle do inserir
export const control_inserir = async(req: Request, res: Response) => {
    const parametro = {
        nome: req.body.nome
    }
    const resultado_inserir = await inserir_marca(parametro)
    if (resultado_inserir.mensagem === "") {
        res.json(resultado_inserir)
    } else {
        res.status(500).json(resultado_inserir)
    }
}
//Controle do buscar por ID
export const control_buscar = async(req:Request,res:Response) => {
    const parametro = {
        id: req.body.id,
        nome: req.body.nome
    }
    const resultado_select = await buscar_marca(parametro)
    if(resultado_select.executado) {
        res.json(resultado_select)
    } else {
        res.status(500).json(resultado_select)
    }
}
//Controle do Atualizar marca
export const control_update = async(req: Request, res: Response) => {
    const parametro = {
        nome: req.body.nome,
        id: req.params.id
    }
    const resultado_update = await alterar_marca(parametro)
    if (resultado_update.mensagem === "") {
        res.json(resultado_update)
    } else {
        res.status(500).json(resultado_update)
    }
}
//Controle do deletar marca
export const control_delete = async(req: Request, res: Response) => {
    const parametro = {
        id: req.params.id
    }
    const resultado_delete = await deletar_marca(parametro)
    if (resultado_delete.mensagem === "") {
        res.json(resultado_delete)
    } else {
        res.status(500).json(resultado_delete)
    }
}