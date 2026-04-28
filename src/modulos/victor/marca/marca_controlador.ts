import { Request, Response } from "express";
import { alterarMarcaServico, buscarMarcaServico, deletarMarcaServico, inserirMarcaServico } from "./marca_servico";
import { responseAPI } from "../../../utils/utils";

export const inserirMarca = async(req: Request, res: Response) => {
    const parametro = {
        nome: req.body.nome
    }
    const resultado = await inserirMarcaServico(parametro);
    responseAPI(res,resultado);
}

export const buscarMarcaId = async(req:Request,res:Response) => {
    const parametro = {
        id: req.params.id
    }
    const resultado = await buscarMarcaServico(parametro);
    responseAPI(res,resultado);
}

export const buscarMarca = async(req:Request,res:Response) => {
    var parametro : any = null
    if(req.body) {
        parametro = {
            nome : req.body.nome
        }
    }
    const resultado = await buscarMarcaServico(parametro)
    responseAPI(res,resultado);
}

export const alterarMarca = async(req: Request, res: Response) => {
    const parametro = {
        nome: req.body.nome,
        id: req.params.id
    }
    const resultado = await alterarMarcaServico(parametro)
    responseAPI(res,resultado);
}

export const deletarMarca = async(req: Request, res: Response) => {
    const parametro = {
        id: req.params.id
    }
    const resultado = await deletarMarcaServico(parametro)
    responseAPI(res,resultado);
}