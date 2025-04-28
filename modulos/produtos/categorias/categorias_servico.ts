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

        const sql = "INSERT INTO tb_categorias (nome) values ($1) RETURNING id;"
        const valores = [categoria.nome]

        const resultado_banco = await cliente.query(sql, valores)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = {
                'id': resultado_banco.rows[0].id
            }

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

        const sql = "UPDATE tb_categorias SET nome=$1 WHERE id=$2;"
        const valores = [categoria.nome, categoria.id]

        const resultado_banco = await cliente.query(sql, valores)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = categoria

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

        const sql = "DELETE FROM tb_categorias WHERE id=$1;"
        const valores = [categoria.id]

        const resultado_banco = await cliente.query(sql, valores)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = {
            'id': categoria.id
        }

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

        const sql = "SELECT * FROM tb_categorias WHERE id=$1;"
        const valores = [categoria.id]

        const resultado_banco = await cliente.query(sql, valores)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = [
            {
                'id': resultado_banco.rows[0].id,
                'nome': resultado_banco.rows[0].nome
            }
        ]
        

    } catch (erro) {
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

        const sql = "SELECT * FROM tb_categorias;"

        const resultado_banco = await cliente.query(sql)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = []

        resultado_banco.rows.forEach(item => {
            resultado.data.push(
                {
                    'id': item.id,
                    'nome': item.nome
                }
            )
        })
    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}