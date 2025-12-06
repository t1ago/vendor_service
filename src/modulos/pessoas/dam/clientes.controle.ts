// /src/produtos/clientes/dam/clientes.controller.ts

import { request, Request, response, Response } from "express";
import { PessoaDam } from "./clientes.modelo";
import * as servicoClientes from "./clientes.servico"

export async function criarPessoa(req: Request, res: Response): Promise<void> {
    try {
        const pessoa: PessoaDam = req.body;

        const idGerado = await servicoClientes.criar(pessoa);
        res.status(201).json({
            id: idGerado,
            mensagem: 'Pessoa registrada com sucesso.'
        });
    } catch (erro) {
        res.status(400).json({
            mensagem: erro instanceof Error ? erro.message: 'Erro desconhecido ao registrar pessoa.'
        });
    }
}
export async function buscarTudo(req: Request, res: Response): Promise<void> {
    try {
        const pessoa = await servicoClientes.buscarTodasPessoas();
        res.status(200).json(pessoa);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar todas as pessoas.'})
    }
}

export async function buscarPessoaPorId(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id, 10); 
        if (isNaN(id)) {
             res.status(400).json({ mensagem: 'ID inválido.' });
             return;
        }

        const pessoa = await servicoClientes.buscarPorId(id);
        res.status(200).json(pessoa);

    } catch (error) {
        if (error instanceof Error && error.message.includes('não encontrada')) {
            res.status(404).json({ mensagem: error.message });
        } else {
            res.status(500).json({ mensagem: 'Erro interno ao buscar pessoa.' });
        }
    }
}

export async function pesquisarComNome(req: Request, res: Response): Promise<void> {
    try {
        const termoBusca = req.query.termo as string;

        if (!termoBusca || termoBusca.trim() === '') {
            res.status(400).json ({ mensagem: 'Um nome é obrigatório para esta pesquisa' });
            return;
        }

        const resultado = await servicoClientes.pesquisarPorNome(termoBusca);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao realizar a pesquisa' });
    }
}

export async function atualizarPessoa(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id, 10);
        const novosDados: PessoaDam = req.body;

        if (isNaN(id)) {
             res.status(400).json({ mensagem: 'ID inválido.' });
             return;
        }

        const pessoaAtualizada = await servicoClientes.atualizarDados(id, novosDados);
        res.status(200).json(pessoaAtualizada);

    } catch (error) {
        if (error instanceof Error && error.message.includes('não encontrada')) {
            res.status(404).json({ mensagem: error.message });
        } else {
            res.status(400).json({ 
                mensagem: error instanceof Error ? error.message : 'Erro ao atualizar pessoa.' 
            });
        }
    }
}

export async function deletarPessoa(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
             res.status(400).json({ mensagem: 'ID inválido.' });
             return;
        }

        await servicoClientes.apagarPessoa(id);
        res.status(204).send();

    } catch (error) {
        if (error instanceof Error && error.message.includes('não encontrada')) {
            res.status(404).json({ mensagem: error.message });
        } else {
            res.status(409).json({ mensagem: error instanceof Error ? error.message : 'Erro ao deletar pessoa.' });
        }
    }
}