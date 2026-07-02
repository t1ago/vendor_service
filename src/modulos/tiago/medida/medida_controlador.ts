import { Request, Response } from 'express';
import { responseAPI } from '../../../utils/utils';
import { criarServico, alterarServico, buscarServico, buscarTodosServico, removerServico } from './medida_servico';

export const criar = async (req: Request, res: Response) => {
    const parametros = { nome: req.body.nome };
    const resultado = await criarServico(parametros);
    responseAPI(res, resultado);
};

export const alterar = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id, nome: req.body.nome };
    const resultado = await alterarServico(parametros);
    responseAPI(res, resultado);
};

export const buscar = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await buscarServico(parametros);
    responseAPI(res, resultado);
};

export const buscarTodos = async (req: Request, res: Response) => {
    const resultado = await buscarTodosServico();
    responseAPI(res, resultado);
};

export const remover = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await removerServico(parametros);
    responseAPI(res, resultado);
};
