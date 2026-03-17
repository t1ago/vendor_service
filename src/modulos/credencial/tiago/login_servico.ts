
import axios from "axios"
import { dbCliente, executarQuery } from "../../../utils/banco_dados";
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { sqlValidarLoginCredencial } from "./login_sql_constants";
import { processarDados, processarDadosEmpty } from "../../../utils/utils";
import { ERROR_MESSAGES } from "../../../utils/error_messages";

export const validarLoginCredencial = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        cliente.connect();

        const sqlDados = sqlValidarLoginCredencial(parametros);
        const queryResultado = await executarQuery(cliente, sqlDados);

        if (queryResultado.rows.length == 0) {
            resultado = processarDadosEmpty(ERROR_MESSAGES.CREDENCIAL_INVALIDA);
        } else {
            resultado = processarDados(() => {
                return queryResultado.rows
            });
        }

    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
}

