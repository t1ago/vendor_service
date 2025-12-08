import { Request,Response } from "express";
import { responseInternalServerError,processarDadosEmpty,responseAPI } from "../../../utils/utils";
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { 
    servicoAtualizar,
    servicoCriar,
    servicoInativar 
} from "./pessoas_servico";
import { bodyMapeado,validarPessoa } from "./validacoes_entrada";

let resultado : IResultadoAPI;

export const criar = async(req:Request,res:Response) => {
    const parametros = bodyMapeado(req);
    const validacao = validarPessoa(parametros.enderecos);

    if(validacao != '') {
        resultado = processarDadosEmpty(validacao);
        responseInternalServerError(res, resultado);
    } else {
        resultado = await servicoCriar(parametros);
        responseAPI(res,resultado);
    }
}
export const atualizar = async(req:Request,res:Response) => {
    const parametros = bodyMapeado(req);
    const validacao = validarPessoa(parametros.enderecos);

    if(validacao != ''){
        resultado = processarDadosEmpty(validacao);
        responseInternalServerError(res, resultado);
    } else {
        resultado = await servicoAtualizar(parametros);
        responseAPI(res,resultado);
    }
}
export const inativar = async(req:Request,res:Response) => {
    const parametros = {
        id_pessoa : req.params.id
    }
    resultado = await servicoInativar(parametros);

    responseAPI(res,resultado);
}