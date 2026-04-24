import { Request , Response } from "express";
import { buscarProdutoServico, deletarProdutoServico, inserirProdutoServico, alterarProdutoServico } from "./produto_servico";
import { responseAPI } from "../../../utils/utils";

export const inserirProduto = async(req:Request,res:Response) => {
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
    const resultado = await inserirProdutoServico(parametros)
    responseAPI(res,resultado);
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
    const resultado = await buscarProdutoServico(parametros)
    responseAPI(res,resultado);
}

export const alterarProduto = async(req:Request,res:Response) => {
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
    const resultado = await alterarProdutoServico(parametros)
    responseAPI(res,resultado);
}

export const deletarProduto = async(req:Request,res:Response) => {
    const parametros = {
        id: req.params.id
    }
    const resultado = await deletarProdutoServico(parametros)
    responseAPI(res,resultado);
}