import { resultado_cliente } from "./fornecedor_victor_resultado";

export const inserirFornecedor = async(lista:any) => {
    try {
        const sql = "INSERT INTO tb_fornecedor_victor (nome,descricao) values($1,$2) RETURNING id"
        const parametro = [lista.nome,lista.descricao]
        const resultado_insert = await resultado_cliente(sql,parametro)
        if (resultado_insert.executado) {
            resultado_insert.data = resultado_insert.data.id
        }
        return resultado_insert
    }
    finally {}
}
export const buscarIdFornecedor = async(lista:any) => {
    try {
        const sql = "SELECT * FROM tb_fornecedor_victor WHERE id=$1"
        const parametro = [lista.id]
        const resultado_select_id = await resultado_cliente(sql,parametro)
        return resultado_select_id
    }
    finally {}
}

export const buscarNameFornecedor = async(lista:any) => {
    try {
        const sql = "SELECT * FROM tb_fornecedor_victor WHERE nome ILIKE $1 OR descricao ILIKE $2"
        const parametro = [`%${lista.nome}%`,`%${lista.descricao}%`]
        const resultado_select_name = await resultado_cliente(sql,parametro)
        return resultado_select_name
    }
    finally {}
}

// export const buscarAllFornecedor = async() => {
//     try {
//         const sql = "SELECT * FROM tb_fornecedor_victor"
//         const resultado_select_all = await resultado_cliente(sql)
//         return resultado_select_all
//     }
//     finally {}
// }

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
