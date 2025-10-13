import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "./../../../../commons/resultado_api";

export const executandoquery = async (sql: string, parametros?: any[]): Promise<Resultado> => {
    const cliente = db_cliente();
    const resultado: Resultado = {
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
