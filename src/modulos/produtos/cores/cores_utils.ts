
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { dbCliente } from "../../../utils/banco_dados";

export const executarQuery = async (sql: string /* Recebe o comando SQL */, parametros: any[] /* $1 */ = [] /* $2 */) => {
    const cliente = dbCliente();
    const resultado: IResultadoAPI = { executado: false, mensagem: "", data: {} };

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

export const validarHex = (hex: string): boolean => {
    const regex = /^#([A-F a-f 0-9]{6}|[A-F a-f 0-9]{3})$/; /* regex é uma expressão regular */
    return regex.test(hex);
}

/*
^           Início da string
#	        A string deve começar com o símbolo #
(...)	    Grupo de captura
[A-Fa-f0-9] Aceita letras de A até F (maiúsculas ou minúsculas) e números de 0 a 9
{6}	        Exatamente 6 caracteres (por exemplo, #1A2B3C)
{3}	        Exatamente 3 caracteres (por exemplo, #ABC)
$	        Final da string
*/