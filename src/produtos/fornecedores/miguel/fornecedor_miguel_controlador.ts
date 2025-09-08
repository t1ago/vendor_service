import { Request, Response } from "express";
import { buscar, MicroservicoDelete, MicroservicoInsert, MicroservicoUpdate } from "./fornecedor_miguel_servico";

export const NovoPost = async (req: Request, res: Response) => {
    let parametros = {
        'id_categoria': req.body.id_categoria,
        'id_cor': req.body.id_cor,
        'id_unidade_medida': req.body.id_unidade_medida,
        'id_grupo': req.body.id_grupo,
        'id_moeda': req.body.id_moeda,
        'nome': req.body.nome,
        'descricao': req.body.descricao,
        'preco_venda': req.body.preco_venda,
        'preco_compra': req.body.preco_compra,
        'id_marca': req.body.id_marca
    }

    const resultado_post = await MicroservicoInsert(parametros)
    if (resultado_post.executado) {
        res.status(200).json(resultado_post)
    } else {
        res.status(500).json(resultado_post)
    }
}


export const NovoUpdate = async (req: Request, res: Response) => {
    let parametros = {
        'id': req.params.id,
        'id_categoria': req.body.id_categoria,
        'id_cor': req.body.id_cor,
        'id_unidade_medida': req.body.id_unidade_medida,
        'id_grupo': req.body.id_grupo,
        'id_moeda': req.body.id_moeda,
        'nome': req.body.nome,
        'descricao': req.body.descricao,
        'preco_venda': req.body.preco_venda,
        'preco_compra': req.body.preco_compra,
        'id_marca': req.body.id_marca
    };
    const resultado_update = await MicroservicoUpdate(parametros)
    if (resultado_update.executado) {
        res.status(200).json(resultado_update)
    } else {
        res.status(500).json(resultado_update)
    }
}


export const NovoDelete = async (req: Request, res: Response) => {
    let parametros = {
        // CORREÇÃO: O ID para o DELETE deve vir da URL, assim como o PUT.
        id: req.params.id
    }
    const resultado_Delete = await MicroservicoDelete(parametros)
    if (resultado_Delete.executado) {
        res.status(200).json(resultado_Delete)
    } else {
        res.status(500).json(resultado_Delete)
    }
}

export const buscar_new = async (req: Request, res: Response) => {
  
    const parametros = {
    'id': req.params.id ? Number(req.params.id) : null,
    'nome': req.query.nome,
    'id_categoria': req.query.id_categoria,
    'id_cor': req.query.id_cor,
    'id_unidade_medida': req.query.id_unidade_medida,
    'id_grupo': req.query.id_grupo,
    'id_moeda': req.query.id_moeda,
    'descricao': req.query.descricao,
    'preco_venda': req.query.preco_venda,
    'preco_compra': req.query.preco_compra,
    'id_marca': req.query.id_marca
};


    const resultado_new = await buscar(parametros);

    if (resultado_new.executado) {
        res.status(200).json(resultado_new);
    } else {
        res.status(500).json(resultado_new);
    }
};

// ...existing code...

export const buscar_por_id = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id
    };

    const resultado = await buscar(parametros);

    if (resultado.executado) {
        res.status(200).json(resultado);
    } else {
        res.status(500).json(resultado);
    }
};