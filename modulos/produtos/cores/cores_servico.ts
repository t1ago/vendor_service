import { db_cliente } from "../../../commons/banco_dados";
import { Resultado } from "../../../commons/resultado_api";

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

export const inserirCor = async (cores:any) => {
    const cliente = db_cliente ()

    try {
        await cliente.connect()

        let inserirSql = 'INSERT INTO tb_cores (hexadecimal, ativo) VALUES ($1, $2) RETURNING id;'
        let parametos = [cores.hexadecimal, cores.ativo]

        let resultadoInsert = await cliente.query(inserirSql, parametos)

        resultado.executado = true;
        resultado.mensagem = "";
        resultado.data = {
            id: resultadoInsert.rows[0].id
        };

    } catch (erro) {
        resultado.executado = false;
        resultado.mensagem = `Erro de execução no banco de daos. MSG ${erro}`;
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado;
}