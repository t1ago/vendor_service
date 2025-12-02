import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";

// Pessoa Física

export const service_insert = async (pessoas: any) => {

    const cliente = db_cliente()
    const resultado: Resultado = {executado: false, mensagem: "", data: []};

    try {
        await cliente.connect()

        const sql = `INSERT INTO tb_pessoa_miguel 
        (nome, apelido, tipo_pessoa, sexo, data_nascimento, documento_estadual, documento_federal, ativo, id_vinculo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING ID`;


        const parametros = [pessoas.nome, pessoas.apelido, pessoas.tipo_pessoa, pessoas.sexo, pessoas.data_nascimento, pessoas.documento_estadual, pessoas.documento_federal, pessoas.ativo, pessoas.id_vinculo];

        const resultado_insert = await cliente.query(sql, parametros)

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

        const sql = "UPDATE tb_pessoa_miguel SET nome=$1, apelido=$2, tipo_pessoa=$3, sexo=$4, data_nascimento=$5, documento_estadual=$6, documento_federal=$7, ativo=$8, id_vinculo=$9 WHERE id=$10"
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

export const service_delete = async (pessoa: any) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect()

        const sql = "DELETE from tb_pessoa_miguel WHERE id=$1"
        const parametros = [pessoa.id]

        const resultado_delete = await cliente.query(sql, parametros)

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = resultado_delete.rows
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}

export const service_get = async (pessoa: any) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect()

        let sql: string
        let parametros: any

        if (pessoa.id != null) {
            sql = "SELECT * FROM tb_pessoa_miguel WHERE id=$1"
            parametros = [pessoa.id]
        } else if (pessoa.nome != null || pessoa.apelido != null || pessoa.sexo != null || pessoa.documento_estadual != null || pessoa.documento_federal != null) {
            sql = 'SELECT * FROM tb_pessoa_miguel WHERE nome ILIKE $1 OR apelido ILIKE $2 OR tipo_pessoa ILIKE $3 OR  sexo ILIKE $4 OR data_nascimento ILIKE $5 OR documento_estadual ILIKE $6 OR documento_federal ILIKE $7 OR ativo ILIKE $8 OR id_vinculo ILIKE $9'
            parametros = [`%${pessoa.nome}%`, `%${pessoa.apelido}%`, `%${pessoa.tipo_pessoa}%`, `%${pessoa.sexo}%`, `%${pessoa.data_nascimento}%`, `%${pessoa.documento_estadual}%`, `%${pessoa.document_federal}%`, `%${pessoa.ativo}%`, `%${pessoa.id_vinculo}%`]
        } else {
            sql = "SELECT * FROM tb_pessoa_miguel"
            parametros = null
        }

        let queryResult
        if (parametros != null) {
            queryResult = await cliente.query(sql, parametros)
        } else {
            queryResult = await cliente.query(sql)
        }

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = queryResult.rows
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}



// Pessoa juridica


// export const service_insert_J = async function (juridica: any) {
//     const cliente = db_cliente()
//     const resultado: Resultado = { executado: false, mensagem: "", data: {} };
//     try {
//         await cliente.connect()

//         const sql = ""
//         const parametros = []

//         const resultado_juridico = await cliente.query(sql, parametros)

//         resultado.executado = true,
//             resultado.mensagem = "",
//             resultado.data = resultado_juridico.rows

//     } catch (erro) {
//         resultado.executado = false,
//             resultado.mensagem = "erro" + erro,
//             resultado.data = []
//     } finally {
//         await cliente.end
//     }
//     return resultado
// }

// export const service_update_J = async function (juridica: any) {
//     const cliente = db_cliente()
//     const resultado: Resultado = { executado: false, mensagem: "", data: {} };
//     try {
//         await cliente.connect()

//         const sql = ""
//         const parametros = []

//         const resultado_juridico = await cliente.query(sql, parametros)

//         resultado.executado = true,
//             resultado.mensagem = "",
//             resultado.data = resultado_juridico.rows

//     } catch (erro) {
//         resultado.executado = false,
//             resultado.mensagem = "erro" + erro,
//             resultado.data = []
//     } finally {
//         await cliente.end
//     }
//     return resultado
// }

// export const service_delete_J = async function (juridica: any) {
//     const cliente = db_cliente()
//     const resultado: Resultado = { executado: false, mensagem: "", data: {} };
//     try {
//         await cliente.connect()

//         const sql = ""
//         const parametros = []

//         const resultado_juridico = await cliente.query(sql, parametros)

//         resultado.executado = true,
//             resultado.mensagem = "",
//             resultado.data = resultado_juridico.rows

//     } catch (erro) {
//         resultado.executado = false,
//             resultado.mensagem = "erro" + erro,
//             resultado.data = []
//     } finally {
//         await cliente.end
//     }
//     return resultado
// }