import { db_cliente } from "../../../commons/banco_dados";
import { Resultado } from "../../../commons/resultado_api";
import { executarQuery } from "./cores_utils";

export const inserirCor = async (hexadecimal: string, ativo: string) => {
    const sql = "INSERT INTO tb_cores (hexadecimal, ativo) VALUES ($1, $2) RETURNING id;";
    
    const parametros = [hexadecimal, ativo];
    
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        const id = resultado.data[0].id;
        resultado.mensagem = "Nunca dúvidei que a cor seria inserida com sucesso!";
        resultado.data = { id, hexadecimal, ativo };
    }

    return resultado;
};

export const buscarCor = async () => {
    const sql = "SELECT * FROM tb_cores;";

    const resultado = await executarQuery(sql);

    if (resultado.executado) {
        resultado.mensagem = "Parabéns, nunca dúvidei, buscou mesmo!!";
    }

    return resultado;
}

export const buscarCorId = async (id: number) => {
    const sql = "SELECT id, hexadecimal, ativo FROM tb_cores WHERE id = $1;";
    const parametros = [id];

    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        resultado.mensagem = "Nunca dúvidei que a cor apareceria!";
    } else {
        resultado.mensagem = "Foda em, não tem nenhuma cor nesse ID."
    }

    return resultado;
}

export const atualizarCor = async (id: number, hexadecimal: string, ativo: string) => {
    const sql ="UPDATE tb_cores SET hexadecimal = $1, ativo = $2 WHERE id = $3;";
    const parametros = [hexadecimal, ativo, id];

    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        resultado.mensagem = "10 minutos antes estava funcionando!";
        resultado.data = resultado.data[0]
    }else {
        resultado.mensagem = "Nunca dúvidei que alteraria!!"
        resultado.data = { id, hexadecimal, ativo };
    }

    return resultado;
}

export const apagarCor = async (id: number) => {
    const sql = "DELETE FROM tb_cores WHERE id = $1;";
    const parametros = [id];

    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado) {
        resultado.mensagem = "Nunca dúvidei que apagaria!!";
        resultado.data = resultado.data[0]
    }else {
        resultado.mensagem = "10 minutos antes estava funcionando!"
    }

    return resultado;
}