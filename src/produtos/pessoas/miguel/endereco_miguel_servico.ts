import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";

// ===============================
// INSERT
// ===============================
export const service_insert_endereco = async (endereco: any) => {
    const cliente = db_cliente();
    const resultado: Resultado = { executado: false, mensagem: "", data: [] };

    try {
        await cliente.connect();

        const sql = `
            INSERT INTO tb_endereco_miguel
            (id_pessoa, tipo_endereco, ativo, cep, logradouro, numero, bairro, cidade, estado)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id
        `;

        const parametros = [
            endereco.id_pessoa,
            endereco.tipo_endereco,
            endereco.ativo,
            endereco.cep,
            endereco.logradouro,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.estado
        ];

        const resultado_insert = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.data = resultado_insert.rows;

    } catch (erro: any) {
        console.error("ERRO AO INSERIR ENDERECO:", erro);
        resultado.mensagem = erro.message;
    } finally {
        await cliente.end();
    }

    return resultado;
};


// ===============================
// UPDATE
// ===============================
export const service_update_endereco = async (endereco: any) => {
    const cliente = db_cliente();
    const resultado: Resultado = { executado: false, mensagem: "", data: [] };

    try {
        await cliente.connect();

        const sql = `
            UPDATE tb_endereco_miguel
            SET tipo_endereco=$1, ativo=$2, cep=$3, logradouro=$4,
                numero=$5, bairro=$6, cidade=$7, estado=$8
            WHERE id=$9
            RETURNING *
        `;

        const parametros = [
            endereco.tipo_endereco,
            endereco.ativo,
            endereco.cep,
            endereco.logradouro,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.estado,
            endereco.id
        ];

        const resultado_update = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.data = resultado_update.rows;

    } catch (erro: any) {
        resultado.mensagem = erro.message;
    } finally {
        await cliente.end();
    }

    return resultado;
};


// ===============================
// DELETE
// ===============================
export const service_delete_endereco = async (param: any) => {
    const cliente = db_cliente();
    const resultado: Resultado = { executado: false, mensagem: "", data: [] };

    try {
        await cliente.connect();

        const sql = "DELETE FROM tb_endereco_miguel WHERE id=$1 RETURNING *";
        const parametros = [param.id];

        const resultado_delete = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.data = resultado_delete.rows;

    } catch (erro: any) {
        resultado.mensagem = erro.message;
    } finally {
        await cliente.end();
    }

    return resultado;
};

// ===============================
// GET (todos ou por pessoa)
// ===============================
export const service_get_endereco = async (param: any) => {
    const cliente = db_cliente();
    const resultado: Resultado = { executado: false, mensagem: "", data: [] };

    try {
        await cliente.connect();

        let sql: string;
        let parametros: any;

        if (param.id) {
            sql = "SELECT * FROM tb_endereco_miguel WHERE id=$1";
            parametros = [param.id];

        } else if (param.id_pessoa) {
            sql = "SELECT * FROM tb_endereco_miguel WHERE id_pessoa=$1 ORDER BY id DESC";
            parametros = [param.id_pessoa];

        } else {
            sql = "SELECT * FROM tb_endereco_miguel ORDER BY id DESC";
            parametros = [];
        }

        const result = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.data = result.rows;

    } catch (erro: any) {
        resultado.mensagem = erro.message;
    } finally {
        await cliente.end();
    }

    return resultado;
};
