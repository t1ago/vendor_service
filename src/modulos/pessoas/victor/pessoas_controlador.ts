import { Request,Response } from "express";
import { responseInternalServerError,processarDadosEmpty,responseAPI } from "../../../utils/utils";
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { 
    servicoAtualizar,
    servicoBuscar,
    servicoBuscarEnderecos,
    servicoBuscarVinculos,
    servicoCriar,
    servicoInativar 
} from "./pessoas_servico";
import { bodyMapeado,validarPessoa } from "./validacoes_entrada";

let resultado : IResultadoAPI;

export const criar = async(req:Request,res:Response) => {
    const parametros = bodyMapeado(req);
    const validacao = validarPessoa(parametros);

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
    const validacao = validarPessoa(parametros);

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
export const buscar = async(req:Request,res:Response) => {
    let parametros: any = {};
    if(req.params != undefined && req.params.id) {
    } else if (req.query != undefined && req.query.filtro) {
        parametros['tipo_pessoa'] = req.query.esp;
        parametros['filtro'] = req.query.filtro;
    } else {
        parametros['tipo_pessoa'] = req.query.esp;
    }
    resultado = await servicoBuscar(parametros);
    responseAPI(res,resultado);
}
export const buscarVinculos = async(req:Request,res:Response) => {
    resultado = await servicoBuscarVinculos();
    responseAPI(res,resultado);
}
export const buscarEnderecos = async(req:Request,res:Response) => {
    const parametros = {
        id_endereco: req.params.id ? req.params.id : req.body.id_pessoa
    }
    resultado = await servicoBuscarEnderecos(parametros);
    responseAPI(res,resultado);
}