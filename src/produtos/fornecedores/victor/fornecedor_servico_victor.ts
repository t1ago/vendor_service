import { resultado_cliente } from "./fornecedor_resultado_victor";

export const inserirFornecedor = async(lista:any) => {
    try {
        const sql = "INSERT INTO tb_fornecedor_victor (nome,descricao,id_categoria,id_moeda,id_marca,id_cores,id_unidade_medida,id_grupo, preco_compra,preco_venda) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id"
        const parametro = [lista.nome,lista.descricao,lista.id_categoria,lista.id_moeda,lista.id_marca,lista.id_cores,lista.id_unidade_medida,lista.id_grupo,lista.preco_compra,lista.preco_venda]
        const resultado_insert = await resultado_cliente(sql,parametro)
        if (resultado_insert.executado) {
            resultado_insert.data = resultado_insert.data.id
        }
        return resultado_insert
    }
    finally {}
}
export const buscarServico = async(lista:any) => {
    try {
        let sql: string
        let parametro: any
        if (lista.id != null) {
            sql = "SELECT * FROM tb_fornecedor_victor WHERE id=$1"
            parametro = [lista.id]
        } else if (lista.nome != null || lista.descricao != null) {
            sql = "SELECT * FROM tb_fornecedor_victor WHERE nome ILIKE $1 OR descricao ILIKE $2"
            parametro = [`%${lista.nome}%`, `%${lista.descricao}%`]
        } else {
            sql = "SELECT * FROM tb_fornecedor_victor"
            parametro = null
        }
        if (parametro != null) {
            const resultado_select = await resultado_cliente(sql,parametro)
            return resultado_select
        } else {
            const resultado_select = await resultado_cliente(sql)
            return resultado_select
        }
    }
    finally {}
}

export const updateFornecedor = async(lista:any) => {
    try {
        const sql = "UPDATE tb_fornecedor_victor SET nome=$1,descricao=$2 WHERE id=$3"
        const parametro = [lista.nome,lista.descricao,lista.id]
        const resultado_update = await resultado_cliente(sql,parametro)
        return resultado_update
    }
    finally {}
}

export const deleteFornecedor = async(lista:any) => {
    try {
        const sql = "DELETE FROM tb_fornecedor_victor WHERE id=$1"
        const parametro = [lista.id]
        const resultado_delete = await resultado_cliente(sql,parametro)
        return resultado_delete
    } 
    finally {}
}
