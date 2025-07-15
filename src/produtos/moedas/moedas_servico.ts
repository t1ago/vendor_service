import { db_cliente } from "../../../commons/banco_dados"
import { Resultado } from "../../../commons/resultado_api";


const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

export const novamoeda = async (moeda: any) => {
    const cliente = db_cliente()

    try {
        await cliente.connect()
        let sql = 'INSERT INTO  (nome), (moeda) VALUES ($1) RETURNING id'
        let parametrosdamoeda = [moeda.nome]
        const resultadomoeda = await cliente.query(sql, parametrosdamoeda);
        resultado.executado = true;
        resultado.mensagem = "Moeda inserida com sucesso";
        resultado.data = resultadomoeda.rows[0];
    } catch (error) {
        resultado.executado = false;
        resultado.mensagem = "Erro ao inserir moeda: " + error;
        resultado.data = {};
    } finally {
        await cliente.end();
    }

    return resultado;
}

    
