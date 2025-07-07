import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

export const resultado_cliente = async(sql: string,parametro: any[]=[]) => {
    const cliente = db_cliente()
    try {
        await cliente.connect()
        const resultado_all = await cliente.query(sql,parametro)
        resultado.executado = true,
        resultado.mensagem = "",
        resultado.data = resultado_all.rows
    }
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "ERRO" + erro,
        resultado.data = {}
    }
    finally {
        cliente.end()
    }
    return resultado
}