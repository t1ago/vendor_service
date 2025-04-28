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

export const criarCorServico = async (cor: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {    
        cliente.connect()

        const sql = "INSERT INTO tb_cores (hexadecimal) values ($1) RETURNING id;"
        const valores = [cor.hexadecimal]

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

export const alterarCorServico = async (cor: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {    
        cliente.connect()

        const sql = "UPDATE tb_cores SET hexadecimal=$1 WHERE id=$2;"
        const valores = [cor.hexadecimal, cor.id]

        const resultado_banco = await cliente.query(sql, valores)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = cor

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const removerCorServico = async (cor: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {    
        cliente.connect()

        const sql = "DELETE FROM tb_cores WHERE id=$1;"
        const valores = [cor.id]

        const resultado_banco = await cliente.query(sql, valores)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = {
            'id': cor.id
        }

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const buscarCorServico = async (cor: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {    
        cliente.connect()

        const sql = "SELECT * FROM tb_cores WHERE id=$1;"
        const valores = [cor.id]

        const resultado_banco = await cliente.query(sql, valores)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = [
            {
                'id': resultado_banco.rows[0].id,
                'hexadecimal': resultado_banco.rows[0].hexadecimal
            }
        ]
        

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const buscarCoresServico = async () => {
    const cliente = db_cliente()
    limparResultado()

    try {    
        cliente.connect()

        const sql = "SELECT * FROM tb_cores;"

        const resultado_banco = await cliente.query(sql)

        resultado.executado = (resultado_banco.rowCount || 0) > 0
        resultado.mensagem = ""
        resultado.data = []

        resultado_banco.rows.forEach(item => {
            resultado.data.push(
                {
                    'id': item.id,
                    'hexadecimal': item.hexadecimal
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