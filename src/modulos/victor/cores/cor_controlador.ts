import { Request, Response } from 'express';
import { responseAPI } from '../../../utils/utils';
import { atualizarCorServico, buscarCorServico, criarCorServico, deletarCorServico } from './cor_servico';

export const criarCor = async (req: Request, res: Response) => {
    const parametros = {
        hexadecimal: req.body.hexadecimal,
        ativo: 'A',
    };

    const resultado = await criarCorServico(parametros);
    responseAPI(res, resultado);
};

export const buscarCor = async (req: Request, res: Response) => {
    if (req.params.id) {
        const parametros = {
            id: req.params.id,
        };

        const resultado = await buscarCorServico(parametros);
        responseAPI(res, resultado);
    } else {
        const resultado = await buscarCorServico(null);
        responseAPI(res, resultado);
    }
};


export const alterarCor = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id ? req.params.id : req.body.id,
        hexadecimal: req.body.hexadecimal,
        ativo: req.body.ativo,
    };

    const resultado = await atualizarCorServico(parametros);
    responseAPI(res, resultado);
};

export const deletarCor = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id,
    };

    const resultado = await deletarCorServico(parametros);
    responseAPI(res, resultado);
};
