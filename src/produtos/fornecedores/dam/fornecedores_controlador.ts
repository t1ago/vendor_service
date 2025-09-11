import { Request, Response } from "express";
import { 
    inserirFornecedor, 
    buscarFornecedor, 
    buscarFornecedorId, 
    atualizarFornecedor, 
    apagarFornecedor, 
    buscarGenerico 
} from "./fornecedores_servico";

// LISTAR TODOS
export const listarFornecedor = async (req: Request, res: Response) =>{
    try{
        const resultado = await buscarFornecedor();
        res.json(resultado);
    } catch (erro) {
        console.error("Erro ao listar fornecedores:", erro);
        res.status(500).json({ mensagem: "Erro no servidor", erro });
    }
}

// SALVAR (cria ou altera)
export const salvar = async (req: Request, res: Response) => {
    try {
        const { id, nome, descricao, id_categoria } = req.body;

        let resultado;
        if (!id) {
            // Se não veio ID → cria
            resultado = await inserirFornecedor(nome, descricao, id_categoria);
        } else {
            // Se veio ID → altera
            resultado = await atualizarFornecedor(id, nome, descricao, id_categoria);
        }

        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro no servidor", erro });
    }
}

// REMOVER
export const remover = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const resultado = await apagarFornecedor(id);
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro no servidor", erro });
    }
}

// BUSCAR POR ID
export const buscarid = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ← usei params ao invés de body
        const resultado = await buscarFornecedorId(Number(id));
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro no servidor", erro });
    }
}

// BUSCAR GENÉRICO
export const buscarTudo = async (req: Request, res: Response) => {
    try {
        const { termo } = req.query;
        const resultado = await buscarGenerico(termo as string);
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar fornecedor", detalhe: erro })
    }
}
