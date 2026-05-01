import { Request, Response } from 'express';
import { responseAPI, responseUnauthorizedError } from '../../../utils/utils';
import { validarLoginCredencial } from './credencial_servico';
import { ERROR_MESSAGES } from '../../../utils/error_messages';
import { IResultadoAPI } from '../../../interfaces/resultado_api';

export const validarLogin = async (req: Request, res: Response) => {
    if (req.headers.authorization == undefined) {
        responseUnauthorizedError(res);
    } else {
        const auth = atob(req.headers.authorization.split(' ')[1]);
        const authSplited = auth.split(':');

        const parametros = {
            username: authSplited[0],
            pwd: authSplited[1],
        };

        const resultado = await validarLoginCredencial(parametros);

        if (ERROR_MESSAGES.CREDENCIAL_INVALIDA == resultado.mensagem) {
            responseUnauthorizedError(res);
        } else {
            responseAPI(res, resultado);
        }
    }
};

export const buscarUsuario = async (req: Request, res: Response) => {
    const resultado: IResultadoAPI = {
        data: (req as any).user,
        executado: true,
        mensagem: '',
    };

    responseAPI(res, resultado);
};
