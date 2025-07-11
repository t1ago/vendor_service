import { QueryResult } from "pg"
import { db_cliente } from "./../../../../commons/banco_dados"
import { Resultado } from "./../../../../commons/resultado_api"

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

const limparResultado = () => {
    resultado.executado = false,
        resultado.mensagem = "",
        resultado.data = {}
}

export const criarServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "INSERT INTO tb_fornecedor_tiago (nome, descricao, id_categoria) values ($1, $2, $3) RETURNING id;"
        const valores = [parametros.nome, parametros.descricao, parametros.idCategoria]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? {
            'id': resultado_banco.rows[0].id
        } : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const alterarServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "UPDATE tb_fornecedor_tiago SET nome=$1, descricao=$2, id_categoria=$3 WHERE id=$4;"
        const valores = [parametros.nome, parametros.descricao, parametros.idCategoria, parametros.id]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? parametros : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const removerServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "DELETE FROM tb_fornecedor_tiago WHERE id=$1;"
        const valores = [parametros.id]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? {
            'id': parametros.id
        } : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const buscarServico = async (parametros?: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()
        let parametros_busca: any
        let resultado_banco: QueryResult<any>

        if (parametros.id != null) {
            parametros_busca = buscarPorId(parametros)
        } else if (parametros.nome != null) {
            parametros_busca = buscarPorNome(parametros)
        } else {
            parametros_busca = buscarTodos()
        }

        if (parametros_busca.valores != null) {
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
        } else {
            resultado_banco = await cliente.query(parametros_busca.sql)
        }

        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = executed ? resultado_banco.rows : []
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

const buscarPorId = (parametros: any) => {
    return {
        sql: `
            SELECT 
                tb_fortiago.id,
                tb_fortiago.nome,
                tb_fortiago.descricao,
                tb_fortiago.id_categoria,
                tb_cat.nome as nome_categoria
            FROM tb_fornecedor_tiago tb_fortiago
            inner join tb_categoria tb_cat on tb_fortiago.id_categoria = tb_cat.id
            WHERE tb_fortiago.id=$1;
        `,
        valores: [parametros.id]
    }
}

const buscarTodos = () => {
    return {
        sql: `
            SELECT 
                tb_fortiago.id,
                tb_fortiago.nome,
                tb_fortiago.descricao,
                tb_fortiago.id_categoria,
                tb_cat.nome as nome_categoria
            FROM tb_fornecedor_tiago tb_fortiago
            inner join tb_categoria tb_cat on tb_fortiago.id_categoria = tb_cat.id
            ORDER BY tb_fortiago.nome;
        `,
        valores: null
    }
}

const buscarPorNome = (parametros: any) => {
    return {
        sql: `
            SELECT 
                tb_fortiago.id,
                tb_fortiago.nome,
                tb_fortiago.descricao,
                tb_fortiago.id_categoria,
                tb_cat.nome as nome_categoria
            FROM tb_fornecedor_tiago tb_fortiago
            inner join tb_categoria tb_cat on tb_fortiago.id_categoria = tb_cat.id
            WHERE
                lower(tb_fortiago.nome) like lower(concat('%', $1::text, '%'))
                or lower(tb_fortiago.descricao) like lower(concat('%', $1::text, '%'))
            ORDER BY tb_fortiago.nome;
        `,
        valores: [parametros.nome]
    }
}
