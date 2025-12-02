import { db_cliente } from "../../../commons/banco_dados";
import { Resultado } from "../../../commons/resultado_api";
const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data:{}
}
function resultadoComum(){
    resultado.executado = false,
    resultado.mensagem = "",
    resultado.data = {}
}

export const inserirPessoas = async(lista:any) => {
    const cliente = db_cliente()
    resultadoComum()
    try{
        await cliente.connect()
        const requisicao = inserirSql(lista)
        const resultado_insert = await cliente.query(requisicao.sql,requisicao.params)

        const executado = (resultado_insert.rowCount || 0) > 0
        resultado.executado = executado,
        resultado.mensagem = "Dados foram inseridos com sucesso",
        resultado.data = executado ? {
            'id' : resultado_insert.rows} : []
        
    } catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "Dados não foram inseridos, ERROR: " + erro,
        resultado.data = []
    } finally {
        cliente.end()
    }
    return resultado
}
export const buscarServico = async(lista:any) =>{
    const cliente = db_cliente()
    resultadoComum()
    try {
        await cliente.connect()
        let resultado_select : any
        let requisicao : any
        if(lista){
            requisicao = buscarSqlTipo(lista)
        } else {
            requisicao = buscarSql()
        }
        if(requisicao.params[0]) {
            resultado_select = await cliente.query(requisicao.sql,requisicao.params)
        } else {
            resultado_select = await cliente.query(requisicao.sql)
        }
        
        const executado = (resultado_select.rowCount || 0 ) >0
        resultado.executado = executado,
        resultado.mensagem = "Dados foram buscados com sucesso",
        resultado.data = resultado_select.rows
    } catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "Dados não foram buscados, ERROR: "+erro,
        resultado.data = []
    } finally {
        cliente.end()
    }
    return resultado
}

export const atualizarPessoas = async(lista:any)=>{
    const cliente = db_cliente()
    resultadoComum()
    try{
        await cliente.connect()
        const requisicao = atualizarSql(lista)
        const resultado_update = await cliente.query(requisicao.sql,requisicao.params)
        const executado = (resultado_update.rowCount || 0) > 0
        resultado.executado =executado,
        resultado.mensagem = "Os dados foram atualizados",
        resultado.data = lista.id_pessoa
    } catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "Os dados não foram atualizados, ERROR: "+erro,
        resultado.data = []
    } finally {
        cliente.end()
    }
    return resultado
}

export const inativarPessoas = async(lista:any) => {
    const cliente = db_cliente()
    resultadoComum()
    try{
        await cliente.connect()
        const requisicao = inativoSql(lista)
        const resultado_delete = await cliente.query(requisicao.sql,requisicao.params)

        const executado = (resultado_delete.rowCount || 0) > 0
        resultado.executado = executado,
        resultado.mensagem = "A pessoa foi inativada com sucesso",
        resultado.data = lista.id_pessoa
    } catch(erro) {
        resultado.executado = false,
        resultado.mensagem = "A pessoa não foi inativada, ERROR: "+erro,
        resultado.data = []
    } finally {
        cliente.end()
    }
    return resultado
}

function inserirSql(lista:any){
    return {
        'sql' : `
        INSERT INTO
        tb_pessoas_victor
        (nome,apelido,tipo_pessoa,sexo,idade,documento_federal,documento_estadual,ativo,id_vinculo)
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id_pessoa
        `,
        'params': [lista.nome,lista.apelido,lista.tipo_pessoa,lista.sexo,lista.idade,lista.documento_federal,lista.documento_estadual,lista.ativo,lista.id_vinculo]
    }
}

function buscarSqlTipo(lista:any){
    return {
        'sql':`
        SELECT * FROM 
        tb_pessoas_victor
        WHERE
        tipo_pessoa = $1
        `,
        'params': [lista.tipo_pessoa]
    }
}
function buscarSql(){
    return {
        'sql':`
        SELECT * FROM
        tb_pessoas_victor
        `,
        'params': []
    }
}

function atualizarSql(lista:any) {
    return {
        'sql':`
        UPDATE 
        tb_pessoas_victor
        SET
        nome = $1,
        apelido = $2,
        tipo_pessoa = $3,
        sexo = $4,
        idade = $5,
        documento_federal = $6,
        documento_estadual = $7,
        ativo = $8,
        id_vinculo = $9
        WHERE 
        id_pessoa = $10
        `,
        'params':[lista.nome,lista.apelido,lista.tipo_pessoa,lista.sexo,lista.idade,lista.documento_federal,lista.documento_estadual,lista.ativo,lista.id_vinculo,lista.id_pessoa]
    }
}

function inativoSql(lista:any){
    return {
        'sql':`
        UPDATE 
        tb_pessoas_victor
        SET
        ativo = 'I'
        WHERE 
        id_pessoa = $1
        `,
        'params':[lista.id_pessoa]
    }
}