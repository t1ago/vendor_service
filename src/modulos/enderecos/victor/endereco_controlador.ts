import { Request,Response } from "express";
import { responseAPI } from "../../../utils/utils";
import { servicoEstados,servicoCep } from "./endereco_servico";

export const buscarEstados = async(req:Request,res:Response) => {
    const resultado_estados = await servicoEstados();
    responseAPI(res,resultado_estados);
}
export const buscarPorCep = async(req:Request,res:Response) => {
    const resultado_cep = await servicoCep(req.body.cep);
    responseAPI(res,resultado_cep);
}