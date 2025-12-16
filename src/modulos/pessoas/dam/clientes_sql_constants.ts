// /src/modulos/pessoas/dam/clientes_sql_constants.ts

import { PessoaDam, EnderecoDam } from "./clientes.modelo";

export interface ISqlDados {
    sql: string;
    valores: any[];
}

export const sqlCriarPessoa = (pessoa: PessoaDam): ISqlDados => {
    return {
        sql: `
            INSERT INTO tb_pessoas_dam (
                tipo_pessoa, ativo, nome, apelido, cpf, rg, cnpj, inscricao_estadual,
                sexo, data_nascimento, id_pessoa_juridica
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id;
        `,
        valores: [
            pessoa.tipo_pessoa,
            pessoa.ativo,
            pessoa.nome,
            pessoa.apelido,
            pessoa.cpf,
            pessoa.rg,
            pessoa.cnpj,
            pessoa.inscricao_estadual,
            pessoa.sexo,
            pessoa.data_nascimento,
            pessoa.id_pessoa_juridica
        ]
    };
}

export const sqlCriarEndereco = (endereco: EnderecoDam): ISqlDados => {
    return {
        sql: `
            INSERT INTO tb_enderecos_dam (
                id_pessoa, tipo_endereco, ativo, cep, logradouro, numero, complemento, bairro, cidade, estado
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id;
        `,
        valores: [
            endereco.id_pessoa,
            endereco.tipo_endereco,
            endereco.ativo,
            endereco.cep,
            endereco.logradouro,
            endereco.numero,
            endereco.complemento,
            endereco.bairro,
            endereco.cidade,
            endereco.estado
        ]
    };
}

export const sqlAlterarPessoa = (id: number, pessoa: PessoaDam): ISqlDados => {
    return {
        sql: `
            UPDATE tb_pessoas_dam SET
                tipo_pessoa = $1, ativo = $2, nome = $3, apelido = $4,
                cpf = $5, rg = $6, cnpj = $7, inscricao_estadual = $8,
                sexo = $9, data_nascimento = $10, id_pessoa_juridica = $11,
                data_atualizacao = CURRENT_TIMESTAMP
            WHERE id = $12
        `,
        valores: [
            pessoa.tipo_pessoa, pessoa.ativo, pessoa.nome, pessoa.apelido,
            pessoa.cpf, pessoa.rg, pessoa.cnpj, pessoa.inscricao_estadual,
            pessoa.sexo, pessoa.data_nascimento, pessoa.id_pessoa_juridica,
            id
        ]
    };
}

export const sqlAlterarEndereco = (endereco: EnderecoDam): ISqlDados => {
    return {
        sql: `
            UPDATE tb_enderecos_dam SET
                tipo_endereco = $1, ativo = $2, cep = $3, logradouro = $4,
                numero = $5, complemento = $6, bairro = $7, cidade = $8, estado = $9,
                data_atualizacao = CURRENT_TIMESTAMP
            WHERE id = $10 AND id_pessoa = $11
        `,
        valores: [
            endereco.tipo_endereco, endereco.ativo, endereco.cep, endereco.logradouro,
            endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.estado,
            endereco.id, endereco.id_pessoa
        ]
    };
}

export const sqlBuscarTodos = (): ISqlDados => {
    return {
        sql: 'SELECT * FROM tb_pessoas_dam ORDER BY nome ASC;',
        valores: []
    };
}

export const sqlBuscarPorId = (id: number): ISqlDados => {
    return {
        sql: 'SELECT * FROM tb_pessoas_dam WHERE id = $1;',
        valores: [id]
    };
}

export const sqlBuscarPorTermo = (termo: string) => {
    const termoLike = `%${termo}%`; 

    return {
        sql: `
            SELECT 
                id, tipo_pessoa, ativo, nome, apelido, 
                cpf, rg, cnpj, inscricao_estadual,
                sexo, data_nascimento, id_pessoa_juridica
            FROM tb_pessoas_dam
            WHERE 
                nome ILIKE $1 OR 
                apelido ILIKE $1 OR
                cpf ILIKE $1 OR
                rg ILIKE $1 OR
                cnpj ILIKE $1 OR
                inscricao_estadual ILIKE $1
            ORDER BY nome ASC
        `,
        valores: [termoLike]
    };
}

export const sqlBuscarEnderecosPorPessoa = (idPessoa: number): ISqlDados => {
    return {
        sql: 'SELECT * FROM tb_enderecos_dam WHERE id_pessoa = $1;',
        valores: [idPessoa]
    };
}

export const sqlDeletarPessoa = (id: number): ISqlDados => {
    return {
        sql: 'DELETE FROM tb_pessoas_dam WHERE id = $1;',
        valores: [id]
    };
}

export const sqlDeletarEndereco = (id: number): ISqlDados => {
    return {
        sql: 'DELETE FROM tb_enderecos_dam WHERE id = $1;',
        valores: [id]
    };
}

export const sqlAlternarSituacaoPessoa = (id: number, ativo: boolean): ISqlDados => {
    return {
        sql: `
            UPDATE tb_pessoas_dam 
            SET ativo = $1, data_atualizacao = CURRENT_TIMESTAMP
            WHERE id = $2
        `,
        valores: [ativo, id]
    };
}