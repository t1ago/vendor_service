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

        const id = req.body.id
        const nome = req.body.nome
        const descricao = req.body.descricao
        const id_categoria = req.body.id_categoria
        const id_moeda = req.body.id_moeda
        const id_grupo = req.body.id_grupo
        const id_unidade_medida = req.body.id_unidade_medida
        const id_cor = req.body.id_cor
        const id_marca = req.body.id_marca
        const preco_compra = req.body.preco_compra
        const preco_venda = req.body.preco_venda
        
        let resultado;
        if (!id) {
            resultado = await inserirFornecedor(
                nome,
                descricao,
                id_categoria,
                id_moeda,
                id_grupo,
                id_unidade_medida,
                id_cor,
                id_marca,
                preco_compra,
                preco_venda     
        );
        } else {
            resultado = await atualizarFornecedor(
                id,
                nome,
                descricao,
                id_categoria,
                id_moeda,
                id_grupo,
                id_unidade_medida,
                id_cor,
                id_marca,
                preco_compra,
                preco_venda  
            );
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
