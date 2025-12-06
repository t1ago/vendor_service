import { Request, Response } from "express"
import {
    buscarVinculosServico,
    criarServico,
    buscarServico,
    inativarServico,
    buscarEnderecoServico,
    alterarServico,

} from "./pessoas_servico"
import { IResultadoAPI } from "../../../interfaces/resultado_api"
import { processarDadosEmpty, responseAPI, responseInternalServerError } from "../../../utils/utils"
import { mapear_body, validar_regras_pessoa } from "./pessoas_validacoes"
import { ERROR_MESSAGES } from "../../../utils/error_messages"

export const buscarVinculos = async (req: Request, res: Response) => {
    const resultado = await buscarVinculosServico();
    responseAPI(res, resultado);
}

export const criar = async (req: Request, res: Response) => {
    let resultado: IResultadoAPI;

    const parametros = mapear_body(req);
    const validacao_mensagem = validar_regras_pessoa(parametros);

    if (validacao_mensagem != '') {
        resultado = processarDadosEmpty(validacao_mensagem);
        responseInternalServerError(res, resultado);
    } else {
        resultado = await criarServico(parametros);
        responseAPI(res, resultado);
    }
}

export const alterar = async (req: Request, res: Response) => {
    let resultado: IResultadoAPI;

    const parametros = mapear_body(req);
    let validacao_mensagem = validar_regras_pessoa(parametros);

    if (validacao_mensagem != '') {
        resultado = processarDadosEmpty(validacao_mensagem);
        responseInternalServerError(res, resultado);
    } else {
        resultado = await alterarServico(parametros);
        responseAPI(res, resultado);
    }
}

export const inativar = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await inativarServico(parametros);

    responseAPI(res, resultado);
}

export const buscar = async (req: Request, res: Response) => {
    let parametros: any = {};
    let resultado: IResultadoAPI;

    if (req.params != undefined && req.params.id) {
        parametros['id'] = req.params.id;
    } else if (req.query != undefined && req.query.q) {
        parametros['termo'] = req.query.q;
        parametros['tipo_pessoa'] = req.query.tipo_pessoa;
    } else {
        parametros['tipo_pessoa'] = req.query.tipo_pessoa;
    }

    if (req.params.id == undefined && parametros.tipo_pessoa == undefined) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.PESSOA_TIPO_PESSOA_NAO_INFORMADO);
        responseInternalServerError(res, resultado);
    } else {
        resultado = await buscarServico(parametros);
        responseAPI(res, resultado);
    }
}

export const buscarEndereco = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await buscarEnderecoServico(parametros);

    responseAPI(res, resultado);
}