import { db_cliente } from "../../../commons/banco_dados";
import { Resultado } from "../../../commons/resultado_api";

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}
// Inserir
export const inserir_marca = async(marca: any) => {
    const cliente = db_cliente()

    try{
        await cliente.connect()
        const sql = "INSERT into tb_marca(nome) values($1) returning ID"
        const parametros = [marca.nome]
        const resultado_insert = await cliente.query(sql, parametros)
        resultado.executado = true,
        resultado.mensagem = "",
        resultado.data = {
            id: resultado_insert.rows[0].id
        }
        return resultado
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "ERRO:" + erro,
        resultado.data = {}
        return resultado
    }
    finally {
        await cliente.end()
    }
}
//Buscar por ID
export const buscar_id_marca = async(marca: any) => {
    const cliente = db_cliente()
    try{
        await cliente.connect()
        const sql = "SELECT *from tb_marca where id = $1"
        const parametros = [marca.id]
        const resultado_select_id = await cliente.query(sql,parametros)
        resultado.executado = true,
        resultado.mensagem = "",
        resultado.data = resultado_select_id.rows
        return resultado
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "ERRO:" + erro,
        resultado.data = {}
        return resultado
    }
    finally {
        await cliente.end()
    }
}
//Buscar todos
export const buscar_todos_marca = async() => {
    const cliente = db_cliente()
    try{
        await cliente.connect()
        const sql = "SELECT *from tb_marca"
        const resultado_select_all = await cliente.query(sql)
        resultado.executado = true,
        resultado.mensagem = "",
        resultado.data = resultado_select_all.rows
        return resultado
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "ERRO:" + erro,
        resultado.data = {}
        return resultado
    }
    finally {
        await cliente.end()
    }
}
//Alterar marca
export const alterar_marca = async(marca: any) => {
    const cliente = db_cliente()
    try{
        await cliente.connect()
        const sql = "UPDATE tb_marca set nome=$1 where id=$2"
        const parametros = [marca.nome,marca.id]
        const resultado_update = await cliente.query(sql,parametros)
        resultado.executado = resultado_update.rows[0],
        resultado.mensagem = "",
        resultado.data = {
            id: marca.id
        }
        return resultado
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "ERRO:" + erro,
        resultado.data = {}
        return resultado
    }
    finally {
        await cliente.end()
    }
}
//Deletar marca
export const deletar_marca = async(marca: any) => {
    const cliente = db_cliente()
    try{
        await cliente.connect()
        const sql = "DELETE from tb_marca where id=$1"
        const parametros = [marca.id]
        const resultado_delete = await cliente.query(sql,parametros)
        resultado.executado = resultado_delete.rows[0],
        resultado.mensagem = "",
        resultado.data = {
            id: marca.id
        }
        return resultado
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "ERRO:" + erro,
        resultado.data = {}
        return resultado
    }
    finally {
        await cliente.end()
    }
}
