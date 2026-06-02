import { ISqlDados } from "../../../interfaces/sql_filtro"
import { servicoGenerico } from "../../../utils/victor/servico-generico"
import { PRODUTO_SQL } from "./produto_sql"

export const inserirProdutoServico = async (lista: any) => {
    const parametro = [lista.nome, lista.descricao, lista.id_categoria, lista.id_moeda, lista.id_marca, lista.id_cores, lista.id_unidade_medida, lista.id_grupo, lista.preco_compra, lista.preco_venda];
    return await servicoGenerico(PRODUTO_SQL.INSERT,parametro);
}
export const buscarProdutoServico = async (lista: any) => {
    let requisicao: ISqlDados
    if (lista) {
        requisicao = lista.id ? buscarId(lista) : buscarNome(lista)
    } else {
        requisicao = buscarTodos();
    }
    if (requisicao.valores[0]) {
        return await servicoGenerico(requisicao.sql,requisicao.valores)
    } else {
        return await servicoGenerico(requisicao.sql)
    }
}

export const alterarProdutoServico = async (lista: any) => {
    const parametro = [lista.nome, lista.descricao, lista.id_categoria, lista.id_moeda, lista.id_marca, lista.id_cores, lista.id_unidade_medida, lista.id_grupo, lista.preco_compra, lista.preco_venda, lista.id]
    return await servicoGenerico(PRODUTO_SQL.UPDATE, parametro);
}

export const deletarProdutoServico = async (lista: any) => {
    const parametro = [lista.id]
    return await servicoGenerico(PRODUTO_SQL.DELETE,parametro)
}


function buscarTodos() : ISqlDados {
    return {
        sql: PRODUTO_SQL.SELECT_ALL,
        valores: []
    }
}
function buscarId(lista: any): ISqlDados {
    return {
        sql: PRODUTO_SQL.SELECT_ID ,
        valores: [lista.id]
    }
}
function buscarNome(lista: any): ISqlDados {
    return {
        sql: PRODUTO_SQL.SELECT_QUERY,
        valores: [lista.nome.replace(',', '.')]
    }
}