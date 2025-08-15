import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";

export const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

export const executarQuery = async (sql: string, parametros: any[] = []) => {
    const cliente = db_cliente()
    try {
        await cliente.connect()

        const resposta = await cliente.query(sql, parametros)
        resultado.executado = true,
        resultado.mensagem = "",
        resultado.data = resposta.rows

    } catch (erro) {
        resultado.executado = false,
        resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}