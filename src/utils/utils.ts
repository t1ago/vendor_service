import axios, { HttpStatusCode } from "axios"
import { Response } from "express"
import { IResultadoAPI } from "../interfaces/resultado_api"
import { ERROR_MESSAGES } from "./error_messages";

export const limparResultadoAPI = (data: IResultadoAPI) => {
    data.executado = false;
    data.mensagem = '';
    data.data = {};
}

export const responseOK = (res: Response, data: IResultadoAPI) => {
    res.status(HttpStatusCode.Ok).json(data);
}

export const responseInternalServerError = (res: Response, data: IResultadoAPI) => {
    res.status(HttpStatusCode.InternalServerError).json(data);
}

export const responseAPI = (res: Response, data: IResultadoAPI) => {
    if (data.mensagem.trim() == '') {
        responseOK(res, data);
    } else {
        responseInternalServerError(res, data);
    }
}

export const processarRequest = async <T>(request: T, mapearDados: <D>(data: any) => D) => {

    const resultado: IResultadoAPI = {} as IResultadoAPI

    try {
        const response: any = await request;

        resultado.executado = true;
        resultado.mensagem = '';
        resultado.data = mapearDados(response.data);

    } catch (erro: any) {
        resultado.executado = false;
        resultado.mensagem = ERROR_MESSAGES.DEFAULT_MESSAGE.replace('{error}', erro);
        resultado.data = {};
    }

    return resultado
}

export const processarDados = <T>(mapearDados: () => T) => {
    const resultado: IResultadoAPI = {} as IResultadoAPI
    resultado.executado = true;
    resultado.mensagem = '';
    resultado.data = mapearDados();
    return resultado
}

export const processarDadosEmpty = (mensagem: string) => {
    const resultado: IResultadoAPI = {} as IResultadoAPI
    resultado.executado = false;
    resultado.mensagem = mensagem;
    resultado.data = {};
    return resultado
}