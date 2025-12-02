import { IResultadoAPI } from "../../../../interfaces/resultado_api";
import { dbCliente } from "../../../../utils/banco_dados";

export const executarQuery = async (sql: string /* Recebe o comando SQL */, parametros: any[] /* $1 */ = [] /* $2 */) => {
    const cliente = dbCliente();
    const resultado: IResultadoAPI = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect();
        const resultadoBanco = await cliente.query(sql, parametros);
        resultado.executado = true;
        resultado.data = resultadoBanco.rows;
    } catch (erro) {
        console.error("Erro ao executarQuery:", erro); // 👈 aparece no terminal
        resultado.mensagem = `Erro na consulta. MSG: ${erro}`
    } finally {
        await cliente.end();
    }
    return resultado;
}