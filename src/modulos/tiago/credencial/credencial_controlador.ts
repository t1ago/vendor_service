import { Request, Response } from 'express';
import { responseAPI, responseUnauthorizedError } from '../../../utils/utils';
import { ERROR_MESSAGES } from '../../../utils/error_messages';
import { validarLoginServico, buscarUsuarioServico } from './credencial_servico';

export const validarLogin = async (req: Request, res: Response) => {
    try {
        if (req.headers.authorization == undefined) {
            responseUnauthorizedError(res);
            return;
        }

        const auth = atob(req.headers.authorization.split(' ')[1]);
        const authSplited = auth.split(':');

        const parametros = {
            username: authSplited[0],
            pwd: authSplited[1],
        };

        const resultado = await validarLoginServico(parametros);

        if (ERROR_MESSAGES.CREDENCIAL_INVALIDA == resultado.mensagem) {
            responseUnauthorizedError(res);
        } else {
            responseAPI(res, resultado);
        }
    } catch {
        responseUnauthorizedError(res);
    }
};

export const buscarUsuario = (req: Request, res: Response) => {
    const resultado = buscarUsuarioServico((req as any).user);
    responseAPI(res, resultado);
};
