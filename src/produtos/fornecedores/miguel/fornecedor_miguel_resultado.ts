
import { db_cliente } from "./../../../../commons/banco_dados";
import { Resultado } from "./../../../../commons/resultado_api";



export const executandoquery = async (sql: string, parametros: any[] = []) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} }

    try {
        await cliente.connect()

        const resultado_all = await cliente.query(sql, parametros)

        resultado.executado = true,
            resultado.mensagem = "",
            resultado.data = resultado_all.rows

    } catch (erro) {
        resultado.executado = true,
            resultado.mensagem = "erro" + erro,
            resultado.data = {}
    } finally {
        await cliente.end()
    }

    return resultado
}