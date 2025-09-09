import { executandoquery } from "./fornecedor_miguel_resultado";
import { Resultado } from "./../../../../commons/resultado_api";
import { QueryResult } from "pg";




const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: []
}

export const MicroservicoInsert = async (fornecedor: any) => {

    try {
        const sql = "INSERT INTO tb_fornecedor_miguel (nome, descricao) VALUES ($1, $2) RETURNING id"
        const parametros = [fornecedor.nome, fornecedor.descricao]
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

    try {
        let sql: string;
        let parametros: any;

        if (fornecedor.id != null) {
            sql = "SELECT * FROM tb_fornecedor_miguel WHERE id=$1",
                parametros = [fornecedor.id]
        } else if (fornecedor.nome != null || fornecedor.descricao != null) {
            sql = "SELECT * FROM tb_fornecedor_miguel WHERE nome ILIKE $1 OR descricao ILIKE $2"
            parametros = [`%${fornecedor.nome}%`, `%${fornecedor.descricao}%`]
        } else {
            sql = "SELECT * FROM tb_fornecedor_miguel"
        }

        if (parametros != null) {
            const resultado_busca = await executandoquery(sql, parametros)
            return resultado_busca
        } else {
            const resultado_sql = await executandoquery(sql)
            return resultado_sql
        }

    } finally {

    }

}


