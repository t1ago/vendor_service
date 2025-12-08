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

export const sqlBuscarPorTermo = (parametros: any) => {
    return {
        sql: `
            SELECT 
                tb_pessoa.id,
                tb_pessoa.nome,
                tb_pessoa.apelido,
                tb_pessoa.tipo_pessoa,
                tb_pessoa.sexo,
                tb_pessoa.data_inicio,
                tb_pessoa.documento_estadual,
                tb_pessoa.documento_federeal,
                tb_pessoa.id_vinculo,
                tb_pessoa.ativo,
                tb_vinculo.nome as nome_vinculo,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'M') as id_moradia,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'C') as id_cobranca,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'E') as id_entrega
            FROM tb_pessoa_tiago tb_pessoa
            LEFT JOIN tb_pessoa_tiago tb_vinculo on tb_vinculo.id = tb_pessoa.id_vinculo
            WHERE tb_pessoa.tipo_pessoa=$1
            AND (lower(tb_pessoa.nome) LIKE lower(concat('%', $2::text, '%'))
            OR lower(tb_pessoa.apelido) LIKE lower(concat('%', $2::text, '%'))
            OR lower(tb_pessoa.documento_estadual) LIKE lower(concat('%', $2::text, '%'))
            OR lower(tb_pessoa.documento_federeal) LIKE lower(concat('%', $2::text, '%'))
            OR ((SELECT lower(tb_end.cep || tb_end.logradouro || tb_end.numero || tb_end.bairro || tb_end.cidade || tb_end.estado) FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'M') LIKE lower(concat('%', $2::text, '%'))
            OR (SELECT lower(tb_end.cep || tb_end.logradouro || tb_end.numero || tb_end.bairro || tb_end.cidade || tb_end.estado) FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'C') LIKE lower(concat('%', $2::text, '%'))
            OR (SELECT lower(tb_end.cep || tb_end.logradouro || tb_end.numero || tb_end.bairro || tb_end.cidade || tb_end.estado) FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'E') LIKE lower(concat('%', $2::text, '%'))))
            ORDER BY tb_pessoa.nome
        `,
        valores: [parametros.tipo_pessoa, parametros.termo]
    }
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