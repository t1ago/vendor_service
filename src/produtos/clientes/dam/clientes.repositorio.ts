// /src/produtos/clientes/dam/clientes.repositorio.ts

import { PessoaDam, EnderecoDam } from "./clientes.modelo";
import { db } from "../../../../commons/banco_dados";

/*
** Funções da Tabela Pessoas
*/

export async function inserirPessoaDam(pessoa: PessoaDam): Promise<number> {
    const sql = `
    INSERT INTO tb_pessoas_dam (
        tipo_pessoa, ativo, nome, apelido, cpf, rg, cnpj, inscricao_estadual,
        sexo, data_nascimento, id_pessoa_juridica
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id;
    `    

    const valores = [
        pessoa.tipo_pessoa, pessoa.ativo, pessoa.nome, pessoa.apelido, 
        pessoa.cpf, pessoa.rg, pessoa.cnpj, pessoa.inscricao_estadual,
        pessoa.sexo, pessoa.data_nascimento, pessoa.id_pessoa_juridica
    ];

    try {
        const resultado = await db.query(sql, valores);
        return resultado.rows[0].id as number;
    } catch (erro) {
        console.error('Erro ao inserir pessoa', erro);
        throw new Error('Falha ao registrar pessoa. Verifique se a pessoa está duplicada.')
    }
}

export async function buscarTudo(): Promise<PessoaDam[]> {
    const sql = 'SELECT * FROM tb_pessoas_dam ORDER BY nome ASC;';
    
    try{
        const resultado = await db.query(sql);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao buscar pessoas:', erro);
        throw new Error('Falha ao buscar pessoas no banco de dados.');
    }

}

export async function buscarPorId(id: number): Promise<PessoaDam | null> {
    const sql = 'SELECT * FROM tb_pessoas_dam WHERE id = $1;';
    const valores = [id];

    try {
        const resultado = await db.query(sql, valores);

        if (resultado.rows.length === 0) {
            return null;
        }
        return resultado.rows[0]
    } catch (erro) {
        console.error(`Erro ao buscar pessoa pelo ID ${id}:`, erro);
        throw new Error(`Falha ao consultar a pessoa pelo ID ${id}.`);
    }
}

export async function encontrarPessoaPorNome(termoBusca: string): Promise<PessoaDam[]> {
    const termoSql = `%${termoBusca.trim()}%`; 
        const sql = `
        SELECT * FROM tb_pessoas_dam 
        WHERE nome ILIKE $1 OR apelido ILIKE $1
        ORDER BY nome ASC;
    `;
    const valores = [termoSql];
    try {
        const resultado = await db.query(sql, valores);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao buscar pessoas pelo nome:', erro);
        throw new Error('Falha ao consultar o banco de dados.');
    }
}

export async function atualizar(id: number, pessoa: PessoaDam): Promise<boolean> {
    const sql = `
        UPDATE tb_pessoas_dam SET
            tipo_pessoa = $1,
            ativo = $2,
            nome = $3,
            apelido = $4,
            cpf = $5,
            rg = $6
            cnpj = $7,
            inscricao_estadual = $8,
            sexo = $9,
            data_nascimento = $10,
            id_pessoa_juridica = $11,
            data_atualizacao = CURRENT_TIMESTAMP
            WHERE id = $12;
    `;
    
    const valores = [
        pessoa.tipo_pessoa, pessoa.ativo, pessoa.nome, pessoa.apelido, 
        pessoa.cpf, pessoa.rg, pessoa.cnpj, pessoa.inscricao_estadual,
        pessoa.sexo, pessoa.data_nascimento, pessoa.id_pessoa_juridica,
        id
    ]

    try{
        const resultado = await db.query(sql, valores);
        return resultado.rowCount === 1;
    } catch (erro) {
        console.error('Erro ao atualizar pessoa:', erro);
        throw new Error('Falha ao atualizar pessoa.');
    }
}

export async function deletar(id: number): Promise<boolean> {
    const sql = 'DELETE FROM tb_pessoas_dam WHERE id = $1;';
    const valores = [id];

    try {
        const resultado = await db.query(sql, valores);
        return resultado.rowCount === 1;
    } catch (erro) {
        console.error('Erro ao delerar pessoa:', erro);
        throw new Error('Falha ao deletar pessoa.');
    }    
}

/*
** Funções da Tabela Endereço **
*/

export async function inserirEndereco(endereco: EnderecoDam): Promise<number> {
    const sql = `
    INSERT INTO tb_enderecos_dam (
            id_pessoa, tipo_endereco, ativo, cep, logradouro, numero, complemento, bairro, cidade, estado
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
    `;

    const valores = [
        endereco.id_pessoa, endereco.tipo_endereco,endereco.ativo, endereco.cep, endereco.logradouro,
        endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.estado
    ];

    try {
        const resultado = await db.query(sql, valores);
        return resultado.rows[0].id as number;
    } catch (erro) {
        console.error('Erro ao inserir endereço', erro);
        throw new Error('Falha ao resgistrar endereço. Verifique se o endereço está duplicado.')        
    }
}

export async function buscarTodoEnd(): Promise<EnderecoDam[]> {
    const sql = 'SELECT * FROM tb_enderecos_dam ORDER BY logradouro ASC;';
    
    try{
        const resultado = await db.query(sql);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao buscar enderecos:', erro);
        throw new Error('Falha ao buscar enderecos no banco de dados.');
    }

}

export async function  buscarEndPorId(id: number): Promise<EnderecoDam[]> {
    const sql = `SELECT * FROM tb_enderecos_dam WHERE id_pessoa = $1`;
    const resultado = await db.query(sql, [id]);
    return resultado.rows;
}

export async function encontrarEndPorLogradouro(termoBusca: string): Promise<PessoaDam[]> {
    const termoSql = `%${termoBusca.trim()}%`; 
        const sql = `
        SELECT * FROM tb_enderecos_dam 
        WHERE logradouro ILIKE $1 OR bairro ILIKE $1
        ORDER BY logradouro ASC;
    `;
    const valores = [termoSql];
    try {
        const resultado = await db.query(sql, valores);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao buscar endereços pelo logradouro:', erro);
        throw new Error('Falha ao consultar o banco de dados.');
    }
}

export async function atualizarEnderecos(endereco: EnderecoDam): Promise<boolean> {
    const sql = `UPDATE tb_enderecos_dam SET
            tipo_endereco = $1,
            ativo = $2,
            cep = $3,
            logradouro = $4,
            numero = $5,
            complemento = $6,
            bairro = $7,
            cidade = $8,
            estado = $9
            data_atualizacao = CURRENT_TIMESTAMP
            WHERE id = $10;    
    `;

    const valores = [
            endereco.tipo_endereco, endereco.ativo, endereco.cep, endereco.logradouro,
            endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.estado,
            endereco.id
    ];

    try {
        const resultado = await db.query(sql, valores);
        return resultado.rowCount === 1;
    } catch (erro) {
        console.error('Erro ao atualizar endereço', erro);
        throw new Error('Falha ao atualizar endereço.');
    }
}

export async function deletarEnd(id: number): Promise<boolean> {
    const sql = 'DELETE FROM tb_enderecos_dam WHERE id = $1;';
    const valores = [id];

    try {
        const resultado = await db.query(sql, valores);
        return resultado.rowCount === 1;
    } catch (erro) {
        console.error('Erro ao delerar endereço:', erro);
        throw new Error('Falha ao deletar endereço.');
    }    
}