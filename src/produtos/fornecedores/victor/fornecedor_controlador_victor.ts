import { Request , Response } from "express";
import { buscarIdFornecedor, buscarNameFornecedor, deleteFornecedor, inserirFornecedor, updateFornecedor } from "./fornecedor_servico_victor";

export const fornecedornovo = async(req:Request,res:Response) => {
    const parametros = {
        nome: req.body.nome,
        descricao: req.body.descricao
    }
    const resultado_insert = await inserirFornecedor(parametros)
    if(resultado_insert.executado) {
        res.json(resultado_insert)
    } else {
        res.status(500).json(resultado_insert)
    }
}

export const buscarFornecedorById = async(req:Request,res:Response) => {
    const parametros = {
        id: req.params.id
    }
    const resultado_select_id = await buscarIdFornecedor(parametros)
    if(resultado_select_id.executado) {
        res.json(resultado_select_id)
    } else {
        res.status(500).json(resultado_select_id)
    }
}

export const buscarFornecedorByName = async(req:Request,res:Response) => {
    const parametros = {
        nome: req.body.nome,
        descricao: req.body.descricao
    }
    const resultado_select_name = await buscarNameFornecedor(parametros)
    if(resultado_select_name.executado) {
        res.json(resultado_select_name)
    } else {
        res.status(500).json(resultado_select_name)
    }
}

// export const buscarFornecedorByAll = async(_:Request,res:Response) => {
//     const resultado_select_all = await buscarAllFornecedor()
//     if(resultado_select_all.executado) {
//         res.json(resultado_select_all)
//     } else {
//         res.status(500).json(resultado_select_all)
//     }
// }

export const atualizarFornecedor = async(req:Request,res:Response) => {
    const parametros = {
        nome: req.body.nome,
        descricao: req.body.descricao,
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