import { QueryResult } from "pg"
import { db_cliente } from "./../../../../commons/banco_dados"
import { Resultado } from "./../../../../commons/resultado_api"

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
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = `
            INSERT INTO tb_fornecedor_tiago (
                nome, 
                descricao, 
                id_categoria, 
                id_moeda, 
                id_grupo, 
                id_undade_medida, 
                id_cor, 
                id_marca, 
                preco_compra, 
                preco_venda
            ) values (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            ) RETURNING id;
                `
        const valores = [
            parametros.nome,
            parametros.descricao,
            parametros.idCategoria,
            parametros.idMoeda,
            parametros.idGrupo,
            parametros.idUndadeMedida,
            parametros.idCor,
            parametros.idMarca,
            parametros.precoCompra,
            parametros.precoVenda]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? {
            'id': resultado_banco.rows[0].id
        } : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const alterarServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = `
            UPDATE tb_fornecedor_tiago 
                SET nome=$1, 
                    descricao=$2,
                    id_categoria=$3, 
                    id_moeda=$4, 
                    id_grupo=$5, 
                    id_undade_medida=$6, 
                    id_cor=$7, 
                    id_marca=$8, 
                    preco_compra=$9, 
                    preco_venda=$10
                WHERE id=$11
        `
        const valores = [
            parametros.nome,
            parametros.descricao,
            parametros.idCategoria,
            parametros.idMoeda,
            parametros.idGrupo,
            parametros.idUndadeMedida,
            parametros.idCor,
            parametros.idMarca,
            parametros.precoCompra,
            parametros.precoVenda,
            parametros.id
        ]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? parametros : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const removerServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = "DELETE FROM tb_fornecedor_tiago WHERE id=$1;"
        const valores = [parametros.id]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? {
            'id': parametros.id
        } : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const buscarServico = async (parametros?: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()
        let parametros_busca: any
        let resultado_banco: QueryResult<any>

        if (parametros.id != null) {
            parametros_busca = buscarPorId(parametros)
        } else if (parametros.nome != null) {
            parametros_busca = buscarPorNome(parametros)
        } else {
            parametros_busca = buscarTodos()
        }

        if (parametros_busca.valores != null) {
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
        } else {
            resultado_banco = await cliente.query(parametros_busca.sql)
        }

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

const buscarPorId = (parametros: any) => {
    return {
        sql: `
            select 
                tb_forn.id,
                tb_forn.descricao,
                tb_forn.id_categoria,
                tb_cat.nome as "nome_categoria",
                tb_forn.id_moeda,
                tb_mo.nome as "nome_moeda",
                tb_forn.id_cor,
                tb_cor.hexadecimal as "hexadecimal",
                tb_forn.id_grupo,
                tb_group.nome as "nome_grupo",
                tb_forn.id_marca,
                tb_mar.nome as "nome_marca",
                tb_forn.id_undade_medida,
                tb_med.nome as "nome_unidade_medida",
                tb_forn.nome,
                tb_forn.preco_compra,
                tb_forn.preco_venda
            from tb_fornecedor_tiago tb_forn
            inner join tb_categoria tb_cat on tb_forn.id_categoria = tb_cat.id
            inner  join tb_moeda tb_mo on tb_forn.id_moeda = tb_mo.id
            inner  join tb_cores tb_cor on tb_forn.id_cor = tb_cor.id
            inner  join tb_grupo tb_group on tb_forn.id_grupo = tb_group.id
            inner  join tb_marca tb_mar on tb_forn.id_marca = tb_mar.id
            inner  join tb_medida tb_med on tb_forn.id_undade_medida = tb_med.id
            WHERE tb_forn.id=$1;
        `,
        valores: [parametros.id]
    }
}

const buscarTodos = () => {
    return {
        sql: `
            select 
                tb_forn.id,
                tb_forn.descricao,
                tb_forn.id_categoria,
                tb_cat.nome as "nome_categoria",
                tb_forn.id_moeda,
                tb_mo.nome as "nome_moeda",
                tb_forn.id_cor,
                tb_cor.hexadecimal as "hexadecimal",
                tb_forn.id_grupo,
                tb_group.nome as "nome_grupo",
                tb_forn.id_marca,
                tb_mar.nome as "nome_marca",
                tb_forn.id_undade_medida,
                tb_med.nome as "nome_unidade_medida",
                tb_forn.nome,
                tb_forn.preco_compra,
                tb_forn.preco_venda
            from tb_fornecedor_tiago tb_forn
            inner join tb_categoria tb_cat on tb_forn.id_categoria = tb_cat.id
            inner  join tb_moeda tb_mo on tb_forn.id_moeda = tb_mo.id
            inner  join tb_cores tb_cor on tb_forn.id_cor = tb_cor.id
            inner  join tb_grupo tb_group on tb_forn.id_grupo = tb_group.id
            inner  join tb_marca tb_mar on tb_forn.id_marca = tb_mar.id
            inner  join tb_medida tb_med on tb_forn.id_undade_medida = tb_med.id
            ORDER BY tb_forn.nome
        `,
        valores: null
    }
}

const buscarPorNome = (parametros: any) => {
    return {
        sql: `
            SELECT 
                tb_fortiago.id,
                tb_fortiago.nome,
                tb_fortiago.descricao,
                tb_fortiago.id_categoria,
                tb_cat.nome as nome_categoria
            FROM tb_fornecedor_tiago tb_fortiago
            inner join tb_categoria tb_cat on tb_fortiago.id_categoria = tb_cat.id
            WHERE
                lower(tb_fortiago.nome) like lower(concat('%', $1::text, '%'))
                or lower(tb_fortiago.descricao) like lower(concat('%', $1::text, '%'))
            ORDER BY tb_fortiago.nome;
        `,
        valores: [parametros.nome]
    }
}
