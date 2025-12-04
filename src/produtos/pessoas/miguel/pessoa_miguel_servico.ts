import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";

// Pessoa Física

export const service_insert = async (pessoas: any) => {

    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: [] };

    try {
        await cliente.connect()

        const sql = inserirSQL();

        const parametros = [pessoas.nome, pessoas.apelido, pessoas.tipo_pessoa, pessoas.sexo, pessoas.data_nascimento, pessoas.documento_estadual, pessoas.documento_federal, pessoas.ativo, pessoas.id_vinculo];
        const resultado_insert = await cliente.query(sql, parametros);

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = resultado_insert.rows

    } catch (erro: any) {
        resultado.executado = false;
        resultado.mensagem = "Erro ao inserir pessoa: " + erro.message;
        resultado.data = [];
    } finally {
        await cliente.end()
    }

    return resultado

}

export const service_update = async (pessoa: any) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect()

        const sql = alterarSQL();

        const parametros = [pessoa.nome, pessoa.apelido, pessoa.tipo_pessoa, pessoa.sexo, pessoa.data_nascimento, pessoa.documento_estadual, pessoa.documento_federal, pessoa.ativo, pessoa.id_vinculo, pessoa.id]
        const resultado_update = await cliente.query(sql, parametros)

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = resultado_update.rows

    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}

export const service_inativar = async (pessoa: any) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect();

        const sql = inativarSQL()

        const parametros = [pessoa.id]
        const resultado_inative = await cliente.query(sql, parametros)

        resultado.executado = true
        resultado.mensagem = "Pessoa inativada com sucesso."
        resultado.data = resultado_inative.rows
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = "Erro ao inativar: " + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}

export const service_get = async (parametros: any) => {
    const cliente = db_cliente()

    try {
        await cliente.connect()

        let sql = buscarDadoSQL();
        const values: any[] = [];

        if (parametros.id) {
            sql += ` AND id = $1`;
            values.push(parametros.id);
        }

        if (parametros.tipo_pessoa) {
            sql += ` AND tipo_pessoa = $${values.length + 1}`;
            values.push(parametros.tipo_pessoa);
        }

        const resultado = await cliente.query(sql, values);


        return {
            executado: true,
            data: resultado.rows
        };


    } catch (erro) {
        return {
            executado: false,
            erro: erro
        };
    } finally {
        await cliente.end()
    }
};

// Criação das funções que retornam meus SQL - dia 04/12

const inserirSQL = function () {
    return `
        INSERT INTO tb_pessoa_miguel
        (nome, apelido, tipo_pessoa, sexo, data_nascimento, documento_estadual, documento_federal, ativo, id_vinculo) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING ID
    `;
}; // OK   
const alterarSQL = function () {
    return `
        UPDATE tb_pessoa_miguel
        SET nome=$1, apelido=$2, tipo_pessoa=$3, sexo=$4, data_nascimento=$5, documento_estadual=$6, documento_federal=$7, ativo=$8, id_vinculo=$9 
        WHERE id=$10
    `;
}; // OK
const inativarSQL = function () {
    return `
        UPDATE tb_pessoa_miguel
        SET ativo = 'I'
        WHERE id=$1
    `;
}; // OK
const buscarDadoSQL = function () {
    return `
        SELECT *
        FROM tb_pessoa_miguel
        WHERE 1=1
    `;
}; // OK