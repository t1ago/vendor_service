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
//Buscar por ID
export const buscar_id_marca = async(marca: any) => {
   try {
    const sql = "SELECT * FROM tb_marca WHERE id=$1"
    const parametros = [marca.id]
    const resultado_buscar_id = await resultado_all(sql,parametros)
    return resultado_buscar_id
   }
   finally {}
}
//Buscar todos
export const buscar_nome_todos_marca = async(marca:any) => {
    try {
        const sql = "SELECT * FROM tb_marca WHERE nome ILIKE $1"
        const parametros = [`%${marca.nome}%`]
        const resultado_buscar_nome = await resultado_all(sql,parametros)
        return resultado_buscar_nome
    }
    finally {}
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
