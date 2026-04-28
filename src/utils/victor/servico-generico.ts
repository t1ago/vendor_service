import { IResultadoAPI } from "../../interfaces/resultado_api"
import { dbCliente, executarQuery } from "../banco_dados"
import { processarDados, processarDadosEmpty } from "../utils"
import { ERROR_MESSAGES } from "./error_messages"

let resultado: IResultadoAPI = {
    executado: false,
    mensagem: "",
    data: {}
}

export const servicoGenerico = async (sql: string, parametros: any[] = []) => {
    const cliente = dbCliente()
    try {
        await cliente.connect()

        const results = await executarQuery(cliente, {sql : sql, valores : parametros})
        resultado = processarDados(() => results.rows);

    } catch (error) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.SERVICE.replace('{error}',`${error}`));
    } finally {
        await cliente.end()
    }
    return resultado
}