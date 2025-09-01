import { executandoquery } from "./fornecedor_miguel_resultado";
import { Resultado } from "./../../../../commons/resultado_api";
import { db_cliente } from "../../../../commons/banco_dados";

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: []
}

export const MicroservicoInsert = async (fornecedor: any) => {

    try {
        const sql = "INSERT INTO tb_fornecedor_miguel (nome, descricao, id_categoria, id_cor, id_marca, id_grupo, id_moeda, id_unidade_medida, preco_compra, preco_venda) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id"
        const parametros = [fornecedor.nome, fornecedor.descricao, fornecedor.id_categoria, fornecedor.id_cor, fornecedor.id_marca, fornecedor.id_grupo, fornecedor.id_moeda, fornecedor.id_unidade_medida, fornecedor.preco_compra, fornecedor.preco_venda]
        const resultado_insert = await executandoquery(sql, parametros)

        return resultado_insert
    } finally {

    }
}



export const MicroservicoGet_All = async () => {

    try {
        const sql = "SELECT * FROM tb_fornecedor_miguel"
        const resultado_insert = await executandoquery(sql)

        return resultado_insert
    } finally {

    }
}

export const MicroservicoGet_Id = async (fornecedor: any) => {

    try {
        const sql = "SELECT * FROM tb_fornecedor_miguel WHERE id=$!"
        const parametros = [fornecedor.id]
        const resultado_insert = await executandoquery(sql, parametros)

        return resultado_insert
    } finally {

    }
}

export const MicroservicoUpdate = async (fornecedor: any) => {

    try {
        const sql = "UPDATE tb_fornecedor_miguel SET nome=$1, descricao=$2 WHERE id=$3"
        const parametros = [fornecedor.id, fornecedor.nome, fornecedor.descricao]
        const resultado_insert = await executandoquery(sql, parametros)

        return resultado_insert
    } finally {

    }
}

export const MicroservicoDelete = async (fornecedor: any) => {

    try {
        const sql = "DELETE INTO tb_fornecedor_miguel WHERE id=$1"
        const parametros = [fornecedor.id]
        const resultado_insert = await executandoquery(sql, parametros)

        return resultado_insert
    } finally {

    }
}

export const MicroservicoGet_name = async (fornecedor: any) => {

    try {
        const sql = "SELECT * FROM tb_fornecedor_miguel WHERE nome ILIKE $1"
        const parametros = [`%${fornecedor.nome}%`]
        const resultado_insert = await executandoquery(sql, parametros)

        return resultado_insert
    } finally {

    }
}

export const buscar = async (fornecedor: any) => {
    const cliente = db_cliente();

    try {
        cliente.connect();
        let buscar_parametros: any
        // let resultado_banco: QueryResult<any>
       

        if (fornecedor.id != null) {
            buscar_parametros = await buscar_id(fornecedor);
        } else if (fornecedor.nome != null) {
            buscar_parametros = await buscar_nome(fornecedor);
        } else {
            buscar_parametros = await buscar_tudo();
        }

        const resultado_busca = await executandoquery(buscar_parametros.sql, buscar_parametros.valores);
        return resultado_busca;
    } finally {

    }
}

export const buscar_id = async (fornecedor: any) => {
    return {
        sql: `
            select 
            tb_forn_mig.id,
            tb_forn_mig.descricao,
            tb_forn_mig.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_mig.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_mig.id_cor,
            tb_co.hexadecimal as "hexidecimal",
            tb_forn_mig.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_mig.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_mig.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_mig.nome,
            tb_forn_mig.preco_compra,
            tb_forn_mig.preco_venda
        FROM tb_fornecedor_miguel tb_forn_mig
        INNER JOIN tb_categoria tb_cat on tb_forn_mig.id_categoria = tb_cat.id
        INNER JOIN tb_moeda tb_mo on tb_forn_mig.id_moeda = tb_mo.id
        INNER JOIN tb_cores tb_co on tb_forn_mig.id_cor = tb_co.id
        INNER JOIN tb_grupo tb_gru on tb_forn_mig.id_grupo = tb_gru.id
        INNER JOIN tb_marca tb_mar on tb_forn_mig.id_marca = tb_mar.id
        INNER JOIN tb_medida tb_med on tb_forn_mig.id_unidade_medida = tb_med.id
        WHERE tb_forn_mig.id=$1;
        `,
        valores: [fornecedor.id]
    }
}

export const buscar_nome = async (fornecedor: any) => {
    return {
        sql: `
            select 
            tb_forn_mig.id,
            tb_forn_mig.descricao,
            tb_forn_mig.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_mig.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_mig.id_cor,
            tb_co.hexadecimal as "hexidecimal",
            tb_forn_mig.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_mig.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_mig.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_mig.nome,
            tb_forn_mig.preco_compra,
            tb_forn_mig.preco_venda
        FROM tb_fornecedor_miguel tb_forn_mig
        INNER JOIN tb_categoria tb_cat on tb_forn_mig.id_categoria = tb_cat.id
        INNER JOIN tb_moeda tb_mo on tb_forn_mig.id_moeda = tb_mo.id
        INNER JOIN tb_cores tb_co on tb_forn_mig.id_cor = tb_co.id
        INNER JOIN tb_grupo tb_gru on tb_forn_mig.id_grupo = tb_gru.id
        INNER JOIN tb_marca tb_mar on tb_forn_mig.id_marca = tb_mar.id
        INNER JOIN tb_medida tb_med on tb_forn_mig.id_unidade_medida = tb_med.id
        WHERE tb_forn_mig.nome ILIKE $1;
        `,
        valores: [`%${fornecedor.nome}%`]
    }
}

export const buscar_tudo = async () => {
    return {
        sql: `
            select 
            tb_forn_mig.id,
            tb_forn_mig.descricao,
            tb_forn_mig.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_mig.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_mig.id_cor,
            tb_co.hexadecimal as "hexidecimal",
            tb_forn_mig.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_mig.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_mig.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_mig.nome,
            tb_forn_mig.preco_compra,
            tb_forn_mig.preco_venda
        FROM tb_fornecedor_miguel tb_forn_mig
        INNER JOIN tb_categoria tb_cat on tb_forn_mig.id_categoria = tb_cat.id
        INNER JOIN tb_moeda tb_mo on tb_forn_mig.id_moeda = tb_mo.id
        INNER JOIN tb_cores tb_co on tb_forn_mig.id_cor = tb_co.id
        INNER JOIN tb_grupo tb_gru on tb_forn_mig.id_grupo = tb_gru.id
        INNER JOIN tb_marca tb_mar on tb_forn_mig.id_marca = tb_mar.id
        INNER JOIN tb_medida tb_med on tb_forn_mig.id_unidade_medida = tb_med.id
        `,
        valores: null
    }
}