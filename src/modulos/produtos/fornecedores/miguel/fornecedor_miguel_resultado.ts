import { IResultadoAPI } from "../../../../interfaces/resultado_api";
import { dbCliente } from "../../../../utils/banco_dados";

export const executandoquery = async (sql: string, parametros?: any[]): Promise<IResultadoAPI> => {
    const cliente = dbCliente();
    const resultado: IResultadoAPI = {
        executado: false,
        mensagem: "",
        data: []
    };

    try {
        await cliente.connect();
        const res = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.data = res.rows;   // aqui sempre devolve os dados (insert/update/delete/select)
        resultado.mensagem = "";

    } catch (err: any) {
        resultado.executado = false;
        resultado.mensagem = err.message;
        resultado.data = [];
    } finally {
        await cliente.end();
    }

    return resultado;
}
