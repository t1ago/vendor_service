import { Request , Response } from "express";
import { buscarServico, deleteProduto, inserirProduto, updateProduto } from "./produto_servico";

export const Produtonovo = async(req:Request,res:Response) => {
    const parametros = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        id_categoria: req.body.id_categoria,
        id_moeda: req.body.id_moeda,
        id_marca: req.body.id_marca,
        id_cores: req.body.id_cores,
        id_unidade_medida: req.body.id_unidade_medida,
        id_grupo: req.body.id_grupo,
        preco_compra: req.body.preco_compra,
        preco_venda: req.body.preco_venda
    }
    const resultado_insert = await inserirProduto(parametros)
    if(resultado_insert.executado) {
        res.json(resultado_insert)
    } else {
        res.status(500).json(resultado_insert)
    }
}
export const buscarProduto = async(req:Request,res:Response) => {
    let parametros: any 
    if(req.params.id) {
        parametros = {
            id: req.params.id
        } 
    } else if (req.query != undefined && req.query.nome) {
        parametros = {
            nome: req.query.nome
        }
    }
    const resultado_select = await buscarServico(parametros)
    if(resultado_select.executado) {
        res.json(resultado_select)
    } else {
        res.status(500).json(resultado_select)
    }
}

export const atualizarProduto = async(req:Request,res:Response) => {
    const parametros = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        id_categoria: req.body.id_categoria,
        id_moeda: req.body.id_moeda,
        id_marca: req.body.id_marca,
        id_cores: req.body.id_cores,
        id_unidade_medida: req.body.id_unidade_medida,
        id_grupo: req.body.id_grupo,
        preco_compra: req.body.preco_compra,
        preco_venda: req.body.preco_venda,
        id: req.params.id
    }
    const resultado_update = await updateProduto(parametros)
    if(resultado_update.executado) {
        res.json(resultado_update)
    } else {
        res.status(500).json(resultado_update)
    }
}

export const deletarProduto = async(req:Request,res:Response) => {
    const parametros = {
        id: req.params.id
    }
    const resultado_delete = await deleteProduto(parametros)
    if(resultado_delete.executado) {
        res.json(resultado_delete)
    } else {
        res.status(500).json(resultado_delete)
    }
}