import { Request, Response } from "express";
import { service_Endereco, service_get, service_inativar, service_insert, service_update, service_Vinculos } from "./pessoa_miguel_servico";

export const control_insert = async (req: Request, res: Response) => {
    try {
        const pessoa = req.body;
        const resultado = await service_insert(pessoa);

        res.status(resultado.executado ? 200 : 500).json(resultado);

    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            executado: false,
            mensagem: "Erro ao inserir pessoa",
            data: []
        });
    }
}

export const control_update = async (req: Request, res: Response) => {
    const pessoa = req.body;
    pessoa.id = req.params.id;

    const resultado = await service_update(pessoa);
    res.status(resultado.executado ? 200 : 500).json(resultado);
}

export const control_inativar = async (req: Request, res: Response) => {
    const pessoa = { id: req.params.id };
    const resultado = await service_inativar(pessoa);
    res.status(resultado.executado ? 200 : 500).json(resultado);
}

// Arquivo: controlador.ts
// NOVO CÓDIGO PARA control_get

export const control_get = async (req: Request, res: Response) => {

    const tipoPessoaFinal = (req.query.tipo_pessoa || req.query.tipo) as string | undefined;

    const parametros = {
        id: req.query.id as string | undefined,
        tipo_pessoa: tipoPessoaFinal, 
        filtro: req.query.filtro as string | undefined
    }

    const resultado = await service_get(parametros);

    res.status(resultado.executado ? 200 : 500).json(resultado);
}

export const control_Vinculos = async (req: Request, res: Response) => {
    const resultado = await service_Vinculos();
    res.status(resultado.executado ? 200 : 500).json(resultado);
}

export const control_Endereco = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await service_Endereco(parametros);

    res.status(resultado.executado ? 200 : 500).json(resultado);
}

export const control_getPorId = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await service_get(parametros);
    res.json(resultado);
};
