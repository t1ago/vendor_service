import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";

export const executarQuery = async (sql: string /* Recebe o comando SQL */, parametros: any[] /* $1 */ = [] /* $2 */) => {
    const cliente = db_cliente();
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect();
        const resultadoBanco = await cliente.query(sql, parametros);
        resultado.executado = true;
        resultado.data = resultadoBanco.rows;
    } catch (erro) {
        resultado.mensagem = `Erro na consulta. MSG: ${erro}`;
    } finally {
        await cliente.end();
    }
    return resultado;
}