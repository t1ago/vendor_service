import { db_cliente } from "../../../commons/banco_dados";
import { Resultado } from "../../../commons/resultado_api";

export const Resultado_all = async(sql: string, parametros: any[] = []) => {
    const cliente = db_cliente()
    const resultado: Resultado = {executado: false,mensagem: "",data: []}

    try {
        await cliente.connect()

        const resultado_api = await cliente.query(sql, parametros)
        resultado.executado = true,
        resultado.mensagem = "",
        resultado.data = resultado_api.rows
        
    } catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "erro" + erro
        resultado.data = []
    } finally {
        await cliente.end()
    }
    return resultado
}