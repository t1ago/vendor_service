import axios, { HttpStatusCode } from 'axios';
import { NextFunction, Response, Request } from 'express';
import { IResultadoAPI } from '../interfaces/resultado_api';
import { ERROR_MESSAGES } from './error_messages';
import jwt from 'jsonwebtoken';

export const limparResultadoAPI = (data: IResultadoAPI) => {
    data.executado = false;
    data.mensagem = '';
    data.data = {};
};

export const responseOK = (res: Response, data: IResultadoAPI) => {
    res.status(HttpStatusCode.Ok).json(data);
};

export const responseInternalServerError = (res: Response, data: IResultadoAPI) => {
    res.status(HttpStatusCode.InternalServerError).json(data);
};

export const responseUnauthorizedError = (res: Response) => {
    res.status(HttpStatusCode.Unauthorized).end();
};

export const responseAPI = (res: Response, data: IResultadoAPI) => {
    if (data.mensagem.trim() == '') {
        responseOK(res, data);
    } else {
        responseInternalServerError(res, data);
    }
};

export const processarRequest = async <T>(request: T, mapearDados: <D>(data: any) => D) => {
    const resultado: IResultadoAPI = {} as IResultadoAPI;

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

    return resultado;
};

export const processarDados = <T>(mapearDados: () => T) => {
    const resultado: IResultadoAPI = {} as IResultadoAPI;
    resultado.executado = true;
    resultado.mensagem = '';
    resultado.data = mapearDados();
    return resultado;
};

export const processarDadosEmpty = (mensagem: string) => {
    const resultado: IResultadoAPI = {} as IResultadoAPI;
    resultado.executado = false;
    resultado.mensagem = mensagem;
    resultado.data = {};
    return resultado;
};

export const autenticadorInterceptador = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    const SECRET_KEY = process.env.SECRET_KEY || '';

    if (auth == undefined) {
        responseUnauthorizedError(res);
    } else {
        const [, token] = auth!.split(' ');

        try {
            const dadosUsuario = jwt.verify(token, SECRET_KEY);

            (req as any).user = dadosUsuario;

            return next();
        } catch (error) {
            responseUnauthorizedError(res);
        }
    }
};
