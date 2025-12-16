import { ISqlDados } from "../../../interfaces/sql_filtro"

export const criarPessoa = (pessoa: any): ISqlDados => {

    let data_nascimento = null;

    if (pessoa.data_nascimento) {
        const [dia, mes, ano] = pessoa.data_nascimento.split("/");
        data_nascimento = `${ano}-${mes}-${dia} 00:00:00`;
    }

    return {
        sql: `
            INSERT INTO tb_pessoa_miguel
            (nome, apelido, tipo_pessoa, sexo, data_nascimento, documento_estadual, documento_federal, id_vinculo, ativo)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id
        `,
        valores: [
            pessoa.nome,
            pessoa.apelido,
            pessoa.tipo_pessoa,
            pessoa.sexo,
            data_nascimento,
            pessoa.documento_estadual,
            pessoa.documento_federal,
            pessoa.id_vinculo,
            pessoa.ativo || 'A'
        ]
    }
}


export const criarEndereco = (endereco: any, idPessoa: number): ISqlDados => {
    return {
        sql: `
            INSERT INTO tb_endereco_pessoa_miguel(
                id_pessoa, cep, logradouro, numero, bairro, cidade, estado, tipo_endereco, ativo
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING ID;
        `,
        valores: [
            idPessoa,
            endereco.cep,
            endereco.logradouro,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.estado,
            endereco.tipo_endereco,
            endereco.ativo || 'A'
        ]
    };
}

export const alterarPessoa = (pessoa: any): ISqlDados => {

    let data_nascimento = undefined

    if (pessoa.dataInicio != undefined) {
        let data_info = pessoa.dataInicio
        let resultado_data = data_info.split("/");

        const day = resultado_data[0].padStart(2, '0');
        const month = resultado_data[1].padStart(2, '0');
        const year = resultado_data[2];

        data_nascimento = `${year}-${month}-${day} 00:00:00`
    }
    return {
        sql:
            `UPDATE tb_pessoa_miguel SET
            nome=$1,
            apelido=$2,
            tipo_pessoa=$3,
            sexo=$4,
            data_nascimento=$5,
            documento_estadual=$6,
            documento_federal=$7,
            id_vinculo=$8,
            ativo=$9
            WHERE id = $10

        `,

        valores: [
            pessoa.nome,
            pessoa.apelido,
            pessoa.tipo_pessoa,
            pessoa.sexo,
            data_nascimento,
            pessoa.documento_estadual,
            pessoa.documento_federal,
            pessoa.id_vinculo,
            pessoa.ativo,
            pessoa.id
        ]
    }

}

export const inativarPessoa = (pessoa: any): ISqlDados => {

    return {
        sql: `
            UPDATE tb_pessoa_miguel SET
            ativo = $1 WHERE id = $2
        `,

        valores: [
            'I',
            pessoa.id
        ]
    }
}

export const buscarId = (pessoa: any): ISqlDados => {
    return {
        sql: `
            SELECT 
                pessoa.id,
                pessoa.nome,
                pessoa.apelido,
                pessoa.tipo_pessoa,
                pessoa.sexo,
                pessoa.data_nascimento,
                pessoa.documento_estadual,
                pessoa.documento_federal,
                pessoa.id_vinculo,
                pessoa.ativo,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id_endereco', endereco.id,
                            'cep', endereco.cep,
                            'logradouro', endereco.logradouro,
                            'numero', endereco.numero,
                            'bairro', endereco.bairro,
                            'cidade', endereco.cidade,
                            'estado', endereco.estado,
                            'tipo_endereco', endereco.tipo_endereco,
                            'ativo', endereco.ativo
                        )
                    ) FILTER (WHERE endereco.id IS NOT NULL),
                    '[]'
                ) AS enderecos
            FROM tb_pessoa_miguel pessoa
            LEFT JOIN tb_endereco_pessoa_miguel endereco
                ON endereco.id_pessoa = pessoa.id
            WHERE pessoa.id = $1
            GROUP BY pessoa.id
        `,
        valores: [pessoa.id]
    }
}

// Arquivo: pessoa_miguel_utils.ts (CÓDIGO COMPLETO DA FUNÇÃO BuscarTodos)

export const BuscarTodos = (parametros: { tipo_pessoa: string, filtro?: string }): ISqlDados => {
    let sql = `
        SELECT 
            pessoa.id,
            pessoa.nome,
            pessoa.apelido,
            pessoa.tipo_pessoa,
            pessoa.sexo,
            pessoa.data_nascimento,
            pessoa.documento_estadual,
            pessoa.documento_federal,
            pessoa.id_vinculo,
            pessoa.ativo,
            vinculo.nome AS nome_vinculo,
            (SELECT ender.id FROM tb_endereco_pessoa_miguel ender WHERE ender.id_pessoa = pessoa.id AND ender.tipo_endereco = 'M' AND ender.ativo = 'A') AS id_moradia,
            (SELECT ender.id FROM tb_endereco_pessoa_miguel ender WHERE ender.id_pessoa = pessoa.id AND ender.tipo_endereco = 'C' AND ender.ativo = 'A') AS id_cobranca,
            (SELECT ender.id FROM tb_endereco_pessoa_miguel ender WHERE ender.id_pessoa = pessoa.id AND ender.tipo_endereco = 'E' AND ender.ativo = 'A') AS id_entrega
        FROM tb_pessoa_miguel pessoa
        LEFT JOIN tb_pessoa_miguel vinculo ON vinculo.id = pessoa.id_vinculo
        
        -- NOVO: JOIN para poder buscar nos endereços
        LEFT JOIN tb_endereco_pessoa_miguel endereco_busca ON endereco_busca.id_pessoa = pessoa.id
        
        WHERE pessoa.tipo_pessoa = $1
    `;

    const valores: (string | number)[] = [parametros.tipo_pessoa];
    let index = 2; // O próximo $ no SQL será $2

    // NOVO: Adiciona a condição de filtro (Nome, Apelido, Documento ou Endereço)
    if (parametros.filtro) {
        const termoBusca = `%${parametros.filtro}%`;
        sql += ` AND (
             pessoa.nome ILIKE $${index} 
             OR pessoa.apelido ILIKE $${index}
             OR pessoa.documento_federal ILIKE $${index}
             OR endereco_busca.cep ILIKE $${index}
             OR endereco_busca.logradouro ILIKE $${index}
             OR endereco_busca.cidade ILIKE $${index}
             OR endereco_busca.bairro ILIKE $${index}
        )`;
        valores.push(termoBusca);
        index++;
    }

    // O GROUP BY é necessário por causa do LEFT JOIN extra com a tabela de endereços (endereco_busca)
    sql += `
        GROUP BY pessoa.id, vinculo.nome
        ORDER BY pessoa.nome
    `;

    return { sql, valores };
}
export const EnderecosId_Pessoa = (pessoa: any) => {

    return {
        sql:
            ` SELECT 
                tb_end_miguel.id,
                tb_end_miguel.id_pessoa,
                tb_end_miguel.cep,
                tb_end_miguel.logradouro,
                tb_end_miguel.numero,
                tb_end_miguel.bairro,
                tb_end_miguel.estado,
                tb_end_miguel.estado,
                tb_end_miguel.tipo_endereco,
                tb_end_miguel.ativo
                
                from tb_endereco_pessoa_miguel tb_end_miguel
                WHERE tb_end_miguel.id_pessoa = $1
        `,

        valores: [
            pessoa.id
        ]
    }
}

export const EnderecosId = (pessoa: any) => {
    return {
        sql:
            `SELECT 
                 tb_end_miguel.id,
                 tb_end_miguel.id_pessoa,
                 tb_end_miguel.cep,
                 tb_end_miguel.logradouro,
                 tb_end_miguel.numero,
                 tb_end_miguel.bairro,
                 tb_end_miguel.estado,
                 tb_end_miguel.estado,
                 tb_end_miguel.tipo_endereco,
                 tb_end_miguel.ativo
                
                from tb_endereco_pessoa_miguel tb_end_miguel
                WHERE tb_end_miguel.id = $1
        `,

        valores: [
            pessoa.id
        ]
    }
}


export const BuscarVinculos = (): ISqlDados => {
    return {
        sql: `
                SELECT tb_miguel.id, tb_miguel.nome 
                FROM tb_pessoa_miguel tb_miguel 
                WHERE tb_miguel.ativo = 'A' AND tb_miguel.tipo_pessoa = 'J'
            `,
        valores: null
    }
}