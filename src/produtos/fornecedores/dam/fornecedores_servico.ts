import { QueryResult } from "pg"
import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";
import { executarQuery } from "./utils";

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

export const criarFornecedor = async (parametros: any) => {
    const resultado = db_cliente ()

    const sql = "INSERT INTO tb_fornecedor_dam (nome, descricao, id categoria) VALUES ($1, $2, $3) RETURNING id;"
    const valores = [parametros.nome, parametros.descricao, parametros.idCategoria]

    const resultado_banco = await executarQuery(sql, valores)
    const realizado = (resultado_banco.rowCount || 0) > 0

    resultado.executado = realizado
    resultado.mensagem = ""

}