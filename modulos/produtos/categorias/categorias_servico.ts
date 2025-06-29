import { db_cliente } from "./../../../commons/banco_dados"
import { Resultado } from "./../../../commons/resultado_api"

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

export const criarCategoriaServico = async (categoria: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "INSERT INTO tb_categoria (nome) values ($1) RETURNING id;"
        const valores = [categoria.nome]

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

export const alterarCategoriaServico = async (categoria: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "UPDATE tb_categoria SET nome=$1 WHERE id=$2;"
        const valores = [categoria.nome, categoria.id]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? categoria : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const removerCategoriaServico = async (categoria: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "DELETE FROM tb_categoria WHERE id=$1;"
        const valores = [categoria.id]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? {
            'id': categoria.id
        } : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const buscarCategoriaServico = async (categoria: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "SELECT * FROM tb_categoria WHERE id=$1;"
        const valores = [categoria.id]

        const resultado_banco = await cliente.query(sql, valores)
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

export const buscarCategoriasServico = async () => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "SELECT * FROM tb_categoria;"

        const resultado_banco = await cliente.query(sql)
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