import { Request , Response } from "express";
import { buscarServico, deleteFornecedor, inserirFornecedor, updateFornecedor } from "./fornecedor_servico_victor";

export const fornecedornovo = async(req:Request,res:Response) => {
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
    const resultado_insert = await inserirFornecedor(parametros)
    if(resultado_insert.executado) {
        res.json(resultado_insert)
    } else {
        res.status(500).json(resultado_insert)
    }
}
export const buscarFornecedor = async(req:Request,res:Response) => {
    let parametros: any 
    if(req.params.id) {
        parametros = {
            id: req.params.id
        }
    } else if(req.body.nome) {
        parametros = {
            nome: req.body.nome,
            descricao: req.body.descricao
        }
    } 
    const resultado_select = await buscarServico(parametros)
    if(resultado_select.executado) {
        res.json(resultado_select)
    } else {
        res.status(500).json(resultado_select)
    }
}

export const atualizarFornecedor = async(req:Request,res:Response) => {
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
    const resultado_update = await updateFornecedor(parametros)
    if(resultado_update.executado) {
        res.json(resultado_update)
    } else {
        res.status(500).json(resultado_update)
    }
}

export const deletarFornecedor = async(req:Request,res:Response) => {
    const parametros = {
        id: req.params.id
    }
    const resultado_delete = await deleteFornecedor(parametros)
    if(resultado_delete.executado) {
        res.json(resultado_delete)
    } else {
        res.status(500).json(resultado_delete)
    }
}