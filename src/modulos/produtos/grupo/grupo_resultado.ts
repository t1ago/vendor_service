import { IResultadoAPI } from "../../../interfaces/resultado_api"
import { dbCliente } from "../../../utils/banco_dados"

const resultado: IResultadoAPI = {
    executado: false,
    mensagem: "",
    data: {}
}

export const novoservico = async (sql: string, parametros: any[] = []) => {
    const cliente = dbCliente()
    try {
        await cliente.connect()

        const resultado_all = await cliente.query(sql, parametros)
        resultado.executado = true,
            resultado.mensagem = "",
            resultado.data = resultado_all.rows

    } catch (erro) {
        resultado.executado = false,
            resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}