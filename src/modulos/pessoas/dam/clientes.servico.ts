// /src/modulos/pessoas/dam/service/clientes.servico.ts

import { PoolClient } from "pg";
import { dbPool } from "../../../utils/banco_dados";
import { PessoaDam, EnderecoDam } from "./clientes.modelo";
import { validarCampos, buscarCep } from "./clientes.utils";
import * as sqlConstants from "./clientes_sql_constants";

async function executarQuery(cliente: PoolClient, sqlDados: sqlConstants.ISqlDados) {
    return await cliente.query(sqlDados.sql, sqlDados.valores);
}

export async function criar(pessoa: PessoaDam): Promise<number> {
    validarCampos(pessoa);

    if (!pessoa.enderecos || pessoa.enderecos.length === 0) {
        throw new Error('É obrigatório fornecer pelo menos um endereço (Moradia).');
    }

    const pool = dbPool();
    const cliente = await pool.connect();

    try {
        await cliente.query('BEGIN');

        const sqlPessoa = sqlConstants.sqlCriarPessoa(pessoa);
        const resultadoPessoa = await executarQuery(cliente, sqlPessoa);
        const idPessoa = resultadoPessoa.rows[0].id;

        for (const endereco of pessoa.enderecos) {
            endereco.id_pessoa = idPessoa;
            if (!endereco.logradouro) {
                 const dadosCep = await buscarCep(endereco.cep);
                 endereco.logradouro = dadosCep.logradouro;
                endereco.bairro = dadosCep.bairro;
                endereco.cidade = dadosCep.cidade;
                endereco.estado = dadosCep.estado;
            }

            const sqlEnd = sqlConstants.sqlCriarEndereco(endereco);
            await executarQuery(cliente, sqlEnd);
        }

        await cliente.query('COMMIT');
        return idPessoa;

    } catch (erro) {
        await cliente.query('ROLLBACK');
        console.error('Erro na transação criar:', erro);
        throw new Error('Erro ao criar cliente e endereços.');
    } finally {
        cliente.release();
    }
}

export async function buscarTodasPessoas(): Promise<PessoaDam[]> {
    const pool = dbPool();
    const cliente = await pool.connect();
    try {
        const sql = sqlConstants.sqlBuscarTodos();
        const resultado = await executarQuery(cliente, sql);
        return resultado.rows;
    } finally {
        cliente.release();
    }
}

export async function buscarPorId(id: number): Promise<PessoaDam> {
    const pool = dbPool();
    const cliente = await pool.connect();
    
    try {
        const sqlPessoa = sqlConstants.sqlBuscarPorId(id);
        const resPessoa = await executarQuery(cliente, sqlPessoa);
        
        if (resPessoa.rows.length === 0) {
            throw new Error(`Pessoa com ID ${id} não encontrada.`);
        }
        
        const pessoa = resPessoa.rows[0];

        const sqlEnderecos = sqlConstants.sqlBuscarEnderecosPorPessoa(id);
        const resEnderecos = await executarQuery(cliente, sqlEnderecos);
        
        pessoa.enderecos = resEnderecos.rows;
        return pessoa;

    } finally {
        cliente.release();
    }
}

export async function atualizarDados(id: number, novosDados: PessoaDam): Promise<PessoaDam> {
    validarCampos(novosDados);
    
    const pool = dbPool();
    const cliente = await pool.connect();

    try {
        await cliente.query('BEGIN');

        const sqlPessoa = sqlConstants.sqlAlterarPessoa(id, novosDados);
        const resUpd = await executarQuery(cliente, sqlPessoa);
        
        if (resUpd.rowCount === 0) {
            throw new Error('Pessoa n�o encontrada para atualiza��o.');
        }

        if (novosDados.enderecos) {
            
            const sqlBuscaEnderecos = sqlConstants.sqlBuscarEnderecosPorPessoa(id);
            const resEnderecosAtuais = await executarQuery(cliente, sqlBuscaEnderecos);
            
            const idsNoBanco = resEnderecosAtuais.rows.map((row: any) => row.id);

            const idsNaTela = novosDados.enderecos
                .filter(end => end.id)
                .map(end => end.id);

            for (const end of novosDados.enderecos) {
                end.id_pessoa = id;

                if (!end.logradouro && end.cep) {
                    try {
                        const dadosCep = await buscarCep(end.cep);
                        end.logradouro = dadosCep.logradouro;
                        end.bairro = dadosCep.bairro;
                        end.cidade = dadosCep.cidade;
                        end.estado = dadosCep.estado;
                    } catch (e) {
                    }
                }

                if (end.id) {
                    const sqlUpdEnd = sqlConstants.sqlAlterarEndereco(end);
                    await executarQuery(cliente, sqlUpdEnd);
                } else {
                    const sqlInsEnd = sqlConstants.sqlCriarEndereco(end);
                    await executarQuery(cliente, sqlInsEnd);
                }
            }

            const idsParaDeletar = idsNoBanco.filter((idBanco: number) => !idsNaTela.includes(idBanco));

            for (const idDel of idsParaDeletar) {
                const sqlDel = sqlConstants.sqlDeletarEndereco(idDel);
                await executarQuery(cliente, sqlDel);
            }
        }

        await cliente.query('COMMIT');
        
        return novosDados; 

    } catch (erro) {
        await cliente.query('ROLLBACK');
        console.error('Erro na atualiza��o:', erro);
        throw erro;
    } finally {
        cliente.release();
    }
}

export async function pesquisarPorNome(termoBusca: string): Promise<PessoaDam[]> {
    const pool = dbPool();
    const cliente = await pool.connect();
    
    try {
        const sql = sqlConstants.sqlBuscarPorTermo(termoBusca);
        
        const resultado = await executarQuery(cliente, sql);
        
        return resultado.rows;

    } catch (erro) {
        console.error('Erro ao pesquisar por nome:', erro);
        throw new Error('Falha na pesquisa de pessoas por nome.');
    } finally {
        cliente.release();
    }
}

export async function apagarPessoa(id: number): Promise<boolean> {
    const pool = dbPool();
    const cliente = await pool.connect();
    try {
        const sql = sqlConstants.sqlDeletarPessoa(id);
        const res = await executarQuery(cliente, sql);
        if (res.rowCount === 0) throw new Error('Pessoa não encontrada.');
        return true;
    } finally {
        cliente.release();
    }
}