import { resultado_all } from "./marca_resultado"

// Inserir
export const inserir_marca = async(marca: any) => {
    try {
        const sql = "INSERT INTO tb_marca (nome) VALUES ($1) RETURNING id"
        const parametros = [marca.nome]
        const resultado_insert = await resultado_all(sql,parametros)
        return resultado_insert
    }
    finally {}
}
//Buscar marca (Id, nome e todos)
export const buscar_marca = async(marca:any) => {
    var sql : string = ''
    var parametro: any
    if (marca == null) {
        sql = "SELECT * FROM tb_marca"
        parametro = null
    } else if (marca.id != null) {
        sql = "SELECT * FROM tb_marca WHERE id=$1"
        parametro = [marca.id]
    } else if (marca.nome !=null) {
        sql = "SELECT * FROM tb_marca WHERE nome ILIKE $1"
        parametro = [`%${marca.nome}%`] 
    }
    if (parametro != null) {
        const resultado_select = await resultado_all(sql,parametro)
        return resultado_select
    } else {
        const resultado_select = await resultado_all(sql)
        return resultado_select
    }
}
//Alterar marca
export const alterar_marca = async(marca: any) => {
    try {
        const sql = "UPDATE tb_marca SET nome=$1 WHERE id=$2"
        const parametros = [marca.nome,marca.id]
        const resultado_atualizar = await resultado_all(sql,parametros)
        return resultado_atualizar
    }
    finally {}
}
//Deletar marca
export const deletar_marca = async(marca: any) => {
    try {
        const sql = "DELETE FROM tb_marca WHERE id=$1"
        const parametros = [marca.id]
        const resultado_deletar = await resultado_all(sql,parametros)
        return resultado_deletar
    }
    finally {}
}
