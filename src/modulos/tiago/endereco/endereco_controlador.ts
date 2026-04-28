import { Request, Response } from 'express';
import { buscarTodosEstados, buscarLocalidadePorCep } from './endereco_servico';
import { responseAPI } from '../../../utils/utils';

export const buscarEstados = async (req: Request, res: Response) => {
    const resultado = await buscarTodosEstados();
    responseAPI(res, resultado);
};

export const buscarLocalidadeCep = async (req: Request, res: Response) => {
    const cep = Array.isArray(req.params.cep) ? req.params.cep[0] : req.params.cep;

    const resultado = await buscarLocalidadePorCep(cep);
    responseAPI(res, resultado);
};
