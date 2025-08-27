import { Request, Response } from "express"
import { inserirFornecedor, buscarFornecedor, buscarFornecedorId, atualizarFornecedor, apagarFornecedor, buscarGenerico } from "./fornecedores_servico"

export const listarFornecedor = async (req: Request, res: Response) =>{
    const resultado = await buscarFornecedor();
    res.json(resultado);
}

export const criar = async (req: Request, res: Response) => {
    try {
        const { nome, descricao, id_categoria } = req.body;

        const resultado = await inserirFornecedor(nome, descricao, id_categoria);

        if (resultado.mensagem === "") {
            res.json(resultado);
        } else {
            res.status(500).json(resultado);
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro no servidor", erro});
    }
}

export const remover = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const resultado = await apagarFornecedor(id);

        if (resultado.mensagem === "") {
            res.json(resultado);
        } else {
            res.status(500).json(resultado);
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro no servidor", erro});
    }
}

export const alterar = async (req: Request, res: Response) => {
    try {
        const { id, nome, descricao, id_categoria } = req.body;

        const resultado = await atualizarFornecedor(id, nome, descricao, id_categoria);

        if (resultado.mensagem === "") {
            res.json(resultado);
        } else {
            res.status(500).json(resultado);
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro no servidor", erro});
    }
}

export const buscarid = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const resultado = await buscarFornecedorId(id);

        if (resultado.mensagem === "") {
            res.json(resultado);
        } else {
            res.status(500).json(resultado);
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro no servidor", erro});
    }
}

export const buscarTudo = async (req: Request, res: Response) => {
    try{
        const { termo } = req.body;

        const resultado = await buscarGenerico(termo);
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar fornecedor", detalhe: erro })
    }
}