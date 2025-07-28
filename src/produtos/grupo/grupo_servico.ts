import { novoservico } from "./grupo_resultado"

export const novogrupo = async (grupo:any) => {
    try {
        const sql = "INSERT INTO tb_grupo (nome) VALUES ($1) RETURNING id"
        const parametros = [grupo.nome]

        const resultado_insert = await novoservico(sql, parametros)
        return resultado_insert
    }
    finally {

    }
}


export const alterargruposervico = async (grupo: any) => {
    try {
        const sql = "UPDATE tb_grupo SET nome=$1 WHERE id=$2"
        const parametros = [grupo.nome, grupo.id]

        const resultado_update = await novoservico(sql, parametros)
        return resultado_update
    }
    finally{

    }
}


export const removergruposervico = async (grupo: any) => {
    try {
        const sql = "DELETE FROM tb_grupo WHERE id=$1"
        const parametros = [grupo.id]

        const resultado_delete = await novoservico(sql, parametros) 
        return resultado_delete
    }
    finally{

    }
}

export const buscargrupoServico = async (grupo: any) => {
    try{
        const sql= "SELECT * FROM tb_grupo WHERE id=$1"
        const parametros = [grupo.id]

        const resultado_id = await novoservico(sql, parametros)
        return resultado_id
    }finally{

    }
}

export const buscargruposServico = async () => {
    try {
        const sql = "SELECT * FROM tb_grupo"
        
        const resultado_all = await novoservico(sql)
        return resultado_all
    } finally {

    }
}