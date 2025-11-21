import { QueryResult } from "pg"
import { db_cliente, db_pool } from "../../../commons/banco_dados"
import { Resultado } from "../../../commons/resultado_api"

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

const limparResultado = () => {
    resultado.executado = false,
        resultado.mensagem = "",
        resultado.data = {}
}

export const criarServico = async (parametros: any) => {
    const pool = db_pool()
    limparResultado()

    const cliente = await pool.connect()
    let sql = ''
    let valores = []
    let resultado_banco = null

    try {
        sql = `
                INSERT INTO tb_pessoa_tiago (
                    nome, 
                    apelido, 
                    tipo_pessoa, 
                    sexo, 
                    data_inicio, 
                    documento_estadual, 
                    documento_federeal, 
                    id_vinculo, 
                    ativo
                ) values (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9
                ) RETURNING id;
            `

        let dataInicio = undefined

        if (parametros.dataInicio != undefined) {
            let dateInput = parametros.dataInicio
            let dateArray = dateInput.split("/");

            const day = dateArray[0].padStart(2, '0');
            const month = dateArray[1].padStart(2, '0');
            const year = dateArray[2];

            dataInicio = `${year}-${month}-${day} 00:00:00`
        }

        valores = [
            parametros.nome,
            parametros.apelido,
            parametros.tipoPessoa,
            parametros.sexo,
            dataInicio,
            parametros.documentoEstadual,
            parametros.documentoFedereal,
            parametros.idVinculo,
            parametros.ativo ? 'A' : 'I']

        await cliente.query('BEGIN');

        resultado_banco = await cliente.query(sql, valores)
        const idPessoa = resultado_banco.rows[0].id

        for (let index = 0; index < parametros.enderecos.length; index++) {
            const endereco = parametros.enderecos[index];

            sql = `
                    INSERT INTO tb_endereco_pessoa_tiago (
                        id_pessoa, 
                        cep, 
                        logradouro, 
                        numero, 
                        bairro, 
                        cidade, 
                        estado, 
                        tipo_endereco,
                        buscado_por_cep, 
                        ativo
                    ) values (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                    );
                `

            valores = [
                idPessoa,
                endereco.cep,
                endereco.logradouro,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.estado,
                endereco.tipoEndereco,
                endereco.buscadoPorCep ? 'S' : 'N',
                endereco.ativo ? 'A' : 'I']

            await cliente.query(sql, valores)
        }

        await cliente.query('COMMIT');

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = {
            'id': idPessoa
        }

    } catch (erro) {
        await cliente.query('ROLLBACK');
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`

    } finally {
        cliente.release();
    }

    return resultado
}

export const buscarVinculosServico = async (parametros?: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = `
                SELECT tp.id, tp.nome 
                FROM tb_pessoa_tiago tp 
                WHERE tp.ativo = 'A' AND tp.tipo_pessoa = 'J'
            `

        const resultado_banco = await cliente.query(sql)

        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = executed ? resultado_banco.rows : []
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

// export const alterarServico = async (parametros: any) => {
//     const cliente = db_cliente()
//     limparResultado()

//     try {
//         cliente.connect()

//         const sql = `
//             UPDATE tb_produto_tiago 
//                 SET nome=$1, 
//                     descricao=$2,
//                     id_categoria=$3, 
//                     id_moeda=$4, 
//                     id_grupo=$5, 
//                     id_undade_medida=$6, 
//                     id_cor=$7, 
//                     id_marca=$8, 
//                     preco_compra=$9, 
//                     preco_venda=$10
//                 WHERE id=$11
//         `
//         const valores = [
//             parametros.nome,
//             parametros.descricao,
//             parametros.idCategoria,
//             parametros.idMoeda,
//             parametros.idGrupo,
//             parametros.idUndadeMedida,
//             parametros.idCor,
//             parametros.idMarca,
//             parametros.precoCompra,
//             parametros.precoVenda,
//             parametros.id
//         ]

//         const resultado_banco = await cliente.query(sql, valores)
//         const executed = (resultado_banco.rowCount || 0) > 0

//         resultado.executado = executed
//         resultado.mensagem = ""
//         resultado.data = executed ? parametros : {}

//     } catch (erro) {
//         resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
//     } finally {
//         await cliente.end();
//     }

//     return resultado
// }

// export const removerServico = async (parametros: any) => {
//     const cliente = db_cliente()
//     limparResultado()

//     try {
//         cliente.connect()

//         const sql = "DELETE FROM tb_produto_tiago WHERE id=$1;"
//         const valores = [parametros.id]

//         const resultado_banco = await cliente.query(sql, valores)
//         const executed = (resultado_banco.rowCount || 0) > 0

//         resultado.executado = executed
//         resultado.mensagem = ""
//         resultado.data = executed ? {
//             'id': parametros.id
//         } : {}

//     } catch (erro) {
//         resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
//     } finally {
//         await cliente.end();
//     }

//     return resultado
// }

// export const buscarServico = async (parametros?: any) => {
//     const cliente = db_cliente()
//     limparResultado()

//     try {
//         cliente.connect()
//         let parametros_busca: any
//         let resultado_banco: QueryResult<any>

//         if (parametros.id != null) {
//             parametros_busca = buscarPorId(parametros)
//         } else if (parametros.nome != null) {
//             parametros_busca = buscarPorNome({ search: parametros.nome.replace(',', '.') })
//         } else {
//             parametros_busca = buscarTodos()
//         }

//         if (parametros_busca.valores != null) {
//             resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
//         } else {
//             resultado_banco = await cliente.query(parametros_busca.sql)
//         }

//         const executed = (resultado_banco.rowCount || 0) > 0

//         resultado.executado = true
//         resultado.mensagem = ""
//         resultado.data = executed ? resultado_banco.rows : []
//     } catch (erro) {
//         resultado.executado = false
//         resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
//     } finally {
//         await cliente.end();
//     }

//     return resultado
// }

// const buscarPorId = (parametros: any) => {
//     return {
//         sql: `
//             select 
//                 tb_prod.id,
//                 tb_prod.descricao,
//                 tb_prod.id_categoria,
//                 tb_cat.nome as "nome_categoria",
//                 tb_prod.id_moeda,
//                 tb_mo.nome as "nome_moeda",
//                 tb_mo.moeda as "simbolo_moeda",
//                 tb_prod.id_cor,
//                 tb_cor.hexadecimal as "hexadecimal",
//                 tb_prod.id_grupo,
//                 tb_group.nome as "nome_grupo",
//                 tb_prod.id_marca,
//                 tb_mar.nome as "nome_marca",
//                 tb_prod.id_undade_medida,
//                 tb_med.nome as "nome_unidade_medida",
//                 tb_prod.nome,
//                 tb_prod.preco_compra,
//                 tb_prod.preco_venda
//             from tb_produto_tiago tb_prod
//             inner join tb_categoria tb_cat on tb_prod.id_categoria = tb_cat.id
//             inner  join tb_moeda tb_mo on tb_prod.id_moeda = tb_mo.id
//             inner  join tb_cores tb_cor on tb_prod.id_cor = tb_cor.id
//             inner  join tb_grupo tb_group on tb_prod.id_grupo = tb_group.id
//             inner  join tb_marca tb_mar on tb_prod.id_marca = tb_mar.id
//             inner  join tb_medida tb_med on tb_prod.id_undade_medida = tb_med.id
//             WHERE tb_prod.id=$1;
//         `,
//         valores: [parametros.id]
//     }
// }

// const buscarTodos = () => {
//     return {
//         sql: `
//             select 
//                 tb_prod.id,
//                 tb_prod.descricao,
//                 tb_prod.id_categoria,
//                 tb_cat.nome as "nome_categoria",
//                 tb_prod.id_moeda,
//                 tb_mo.nome as "nome_moeda",
//                 tb_mo.moeda as "simbolo_moeda",
//                 tb_prod.id_cor,
//                 tb_cor.hexadecimal as "hexadecimal",
//                 tb_prod.id_grupo,
//                 tb_group.nome as "nome_grupo",
//                 tb_prod.id_marca,
//                 tb_mar.nome as "nome_marca",
//                 tb_prod.id_undade_medida,
//                 tb_med.nome as "nome_unidade_medida",
//                 tb_prod.nome,
//                 tb_prod.preco_compra,
//                 tb_prod.preco_venda
//             from tb_produto_tiago tb_prod
//             inner join tb_categoria tb_cat on tb_prod.id_categoria = tb_cat.id
//             inner  join tb_moeda tb_mo on tb_prod.id_moeda = tb_mo.id
//             inner  join tb_cores tb_cor on tb_prod.id_cor = tb_cor.id
//             inner  join tb_grupo tb_group on tb_prod.id_grupo = tb_group.id
//             inner  join tb_marca tb_mar on tb_prod.id_marca = tb_mar.id
//             inner  join tb_medida tb_med on tb_prod.id_undade_medida = tb_med.id
//             ORDER BY tb_prod.nome
//         `,
//         valores: null
//     }
// }

// const buscarPorNome = (parametros: any) => {
//     return {
//         sql: `
//             select 
//                 tb_prod.id,
//                 tb_prod.descricao,
//                 tb_prod.id_categoria,
//                 tb_cat.nome as "nome_categoria",
//                 tb_prod.id_moeda,
//                 tb_mo.nome as "nome_moeda",
//                 tb_mo.moeda as "simbolo_moeda",
//                 tb_prod.id_cor,
//                 tb_cor.hexadecimal as "hexadecimal",
//                 tb_prod.id_grupo,
//                 tb_group.nome as "nome_grupo",
//                 tb_prod.id_marca,
//                 tb_mar.nome as "nome_marca",
//                 tb_prod.id_undade_medida,
//                 tb_med.nome as "nome_unidade_medida",
//                 tb_prod.nome,
//                 tb_prod.preco_compra,
//                 tb_prod.preco_venda
//             from tb_produto_tiago tb_prod
//             inner join tb_categoria tb_cat on tb_prod.id_categoria = tb_cat.id
//             inner  join tb_moeda tb_mo on tb_prod.id_moeda = tb_mo.id
//             inner  join tb_cores tb_cor on tb_prod.id_cor = tb_cor.id
//             inner  join tb_grupo tb_group on tb_prod.id_grupo = tb_group.id
//             inner  join tb_marca tb_mar on tb_prod.id_marca = tb_mar.id
//             inner  join tb_medida tb_med on tb_prod.id_undade_medida = tb_med.id
//             WHERE
//                 lower(tb_prod.nome) like lower(concat('%', $1::text, '%'))
//                 or lower(tb_prod.descricao) like lower(concat('%', $1::text, '%'))
//                 or lower(tb_cat.nome) like lower(concat('%', $1::text, '%'))
//                 or lower(tb_group.nome) like lower(concat('%', $1::text, '%'))
//                 or lower(tb_mar.nome) like lower(concat('%', $1::text, '%'))
//                 or lower(tb_mo.nome) like lower(concat('%', $1::text, '%'))
//                 or lower(tb_med.nome) like lower(concat('%', $1::text, '%'))
//                 or lower(tb_prod.preco_venda::text) like lower(concat('%', $1::text, '%'))
//             ORDER BY tb_prod.nome;
//         `,
//         valores: [parametros.search]
//     }
// }
