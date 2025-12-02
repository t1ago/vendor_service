import { Request, Response } from "express";
import {
    service_insert_endereco,
    service_update_endereco,
    service_delete_endereco,
    service_get_endereco
} from "./endereco_miguel_servico";

export const insert_endereco = async (req: Request, res: Response) => {
    const parametros = {
        id_pessoa: req.body.id_pessoa,
        tipo_endereco: req.body.tipo_endereco,
        ativo: req.body.ativo,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado
    };

    const resultado = await service_insert_endereco(parametros);
    res.status(resultado.executado ? 200 : 500).json(resultado);
};

export const update_endereco = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id,
        ...req.body
    };

    const resultado = await service_update_endereco(parametros);
    res.status(resultado.executado ? 200 : 500).json(resultado);
};

export const delete_endereco = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };

    const resultado = await service_delete_endereco(parametros);
    res.status(resultado.executado ? 200 : 500).json(resultado);
};

export const get_endereco = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id || null,
        id_pessoa: req.query.id_pessoa || null
    };

    const resultado = await service_get_endereco(parametros);
    res.status(resultado.executado ? 200 : 500).json(resultado);
};
