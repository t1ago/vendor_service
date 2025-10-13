import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";
const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}
function resultadoComum() {
    resultado.executado = false,
    resultado.mensagem = "",
    resultado.data = {}
}
export const inserirFornecedor = async(lista:any) => {
    const cliente = db_cliente()
    resultadoComum()
    try {
        await cliente.connect()
        const sql = "INSERT INTO tb_fornecedor_victor (nome,descricao,id_categoria,id_moeda,id_marca,id_cores,id_unidade_medida,id_grupo, preco_compra,preco_venda) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id"
        const parametro = [lista.nome,lista.descricao,lista.id_categoria,lista.id_moeda,lista.id_marca,lista.id_cores,lista.id_unidade_medida,lista.id_grupo,lista.preco_compra,lista.preco_venda]
        const resultado_insert = await cliente.query(sql,parametro)
        
        const executado = (resultado_insert.rowCount || 0) > 0
        resultado.executado = executado,
        resultado.mensagem = "Dados inseridos com sucesso",
        resultado.data = executado ? {
           'id': resultado_insert.rows} : []
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = `Dados não foram inserios, por causa: ${erro}`,
        resultado.data = []
    }
    finally {
        cliente.end()
    }
    return resultado
}
export const buscarServico = async(lista:any) => {
    const cliente = db_cliente()
    resultadoComum()
    try {
        await cliente.connect()
        let resultado_select: any
        let requisicao: any
        if (lista) {
            requisicao = lista.id ? buscarId(lista) : buscarNome(lista)
        } else {
            requisicao = buscarTodos();
        }
        if (requisicao.parametros[0]) {
            resultado_select = await cliente.query(requisicao.sql,requisicao.parametros)
        } else {
            resultado_select = await cliente.query(requisicao.sql)
        }
        resultado.executado = true,
        resultado.mensagem = "Dados buscados com sucesso",
        resultado.data = resultado_select.rows
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = `Dados não foram buscados, por causa: ${erro}`,
        resultado.data = []
    }
    finally {
        cliente.end()
    }
    return resultado
}

export const updateFornecedor = async(lista:any) => {
    const cliente = db_cliente()
    resultadoComum()
    try {
        await cliente.connect()
        const sql = `
        UPDATE tb_fornecedor_victor 
            SET 
                nome=$1,
                descricao=$2,
                id_categoria=$3,
                id_moeda=$4,
                id_marca=$5,
                id_cores=$6,
                id_unidade_medida=$7,
                id_grupo=$8,
                preco_compra=$9,
                preco_venda=$10
            WHERE id=$11
        `
        const parametro = [lista.nome,lista.descricao,lista.id_categoria,lista.id_moeda,lista.id_marca,lista.id_cores,lista.id_unidade_medida,lista.id_grupo,lista.preco_compra,lista.preco_venda,lista.id]
        const resultado_update = await cliente.query(sql,parametro)
        const executado = (resultado_update.rowCount || 0) >0
        resultado.executado = executado,
        resultado.mensagem = "Dados atualizados com sucesso",
        resultado.data = executado ? lista.id : []
    }
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = `Dados não foram atualizados, por causa: ${erro}`,
        resultado.data = []
    }
    finally {
        cliente.end()
    }
    return resultado
}

export const deleteFornecedor = async(lista:any) => {
    const cliente = db_cliente()
    try {
        await cliente.connect()
        const sql = "DELETE FROM tb_fornecedor_victor WHERE id=$1"
        const parametro = [lista.id]
        const resultado_delete = await cliente.query(sql,parametro)
        resultado.executado = true,
        resultado.mensagem = `Dados deletados com sucesso do id fornecedor ${lista.id}`,
        resultado.data = []
    } 
    catch(erro) {
        resultado.executado = false,
        resultado.mensagem = `Dados não foram Deletados, por causa: ${erro}`,
        resultado.data = {}
    }
    finally {
        cliente.end()
    }
    return resultado
}


function buscarTodos() {
    return {
        "sql": `
        SELECT 
            tb_forn_victor.id,
            tb_forn_victor.nome,
            tb_forn_victor.descricao,
            tb_forn_victor.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_victor.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_victor.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_victor.id_cores,
            tb_co.hexadecimal as "hexadecimal",
            tb_forn_victor.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_victor.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_victor.preco_compra,
            tb_forn_victor.preco_venda
        FROM tb_fornecedor_victor tb_forn_victor
            INNER JOIN tb_categoria tb_cat on tb_forn_victor.id_categoria = tb_cat.id
            INNER JOIN tb_moeda tb_mo on tb_forn_victor.id_moeda = tb_mo.id
            INNER JOIN tb_marca tb_mar on tb_forn_victor.id_marca = tb_mar.id
            INNER JOIN tb_cores tb_co on tb_forn_victor.id_cores = tb_co.id
            INNER JOIN tb_medida tb_med on tb_forn_victor.id_unidade_medida = tb_med.id
            INNER JOIN tb_grupo tb_gru on tb_forn_victor.id_grupo = tb_gru.id
        ORDER BY tb_forn_victor.nome`,
        "parametros": []
    }
}
function buscarId(lista: any) {
    return {
        "sql": `
        SELECT 
            tb_forn_victor.id,
            tb_forn_victor.nome,
            tb_forn_victor.descricao,
            tb_forn_victor.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_victor.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_victor.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_victor.id_cores,
            tb_co.hexadecimal as "hexadecimal",
            tb_forn_victor.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_victor.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_victor.preco_compra,
            tb_forn_victor.preco_venda
        FROM tb_fornecedor_victor tb_forn_victor
            INNER JOIN tb_categoria tb_cat on tb_forn_victor.id_categoria = tb_cat.id
            INNER JOIN tb_moeda tb_mo on tb_forn_victor.id_moeda = tb_mo.id
            INNER JOIN tb_marca tb_mar on tb_forn_victor.id_marca = tb_mar.id
            INNER JOIN tb_cores tb_co on tb_forn_victor.id_cores = tb_co.id
            INNER JOIN tb_medida tb_med on tb_forn_victor.id_unidade_medida = tb_med.id
            INNER JOIN tb_grupo tb_gru on tb_forn_victor.id_grupo = tb_gru.id
        WHERE tb_forn_victor.id=$1
        `,
        "parametros": [lista.id]
    }
}
function buscarNome(lista: any) {
    return {
        "sql": `
        SELECT 
            tb_forn_victor.id,
            tb_forn_victor.nome,
            tb_forn_victor.descricao,
            tb_forn_victor.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_victor.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_victor.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_victor.id_cores,
            tb_co.hexadecimal as "hexadecimal",
            tb_forn_victor.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_victor.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_victor.preco_compra,
            tb_forn_victor.preco_venda
        FROM tb_fornecedor_victor tb_forn_victor
            INNER JOIN tb_categoria tb_cat on tb_forn_victor.id_categoria = tb_cat.id
            INNER JOIN tb_moeda tb_mo on tb_forn_victor.id_moeda = tb_mo.id
            INNER JOIN tb_marca tb_mar on tb_forn_victor.id_marca = tb_mar.id
            INNER JOIN tb_cores tb_co on tb_forn_victor.id_cores = tb_co.id
            INNER JOIN tb_medida tb_med on tb_forn_victor.id_unidade_medida = tb_med.id
            INNER JOIN tb_grupo tb_gru on tb_forn_victor.id_grupo = tb_gru.id
        WHERE 
            lower(tb_forn_victor.nome) LIKE lower(concat('%',$1::text,'%')) OR
            lower(tb_forn_victor.descricao) LIKE lower(concat('%',$1::text,'%')) OR
            lower(tb_cat.nome) LIKE lower(concat('%',$1::text,'%')) OR
            lower(tb_mo.nome) LIKE lower(concat('%',$1::text,'%')) OR
            lower(tb_mar.nome) LIKE lower(concat('%',$1::text,'%')) OR
            lower(tb_co.hexadecimal) LIKE lower(concat('%',$1::text,'%')) OR
            lower(tb_med.nome) LIKE lower(concat('%',$1::text,'%')) OR
            lower(tb_gru.nome) LIKE lower(concat('%',$1::text,'%')) OR
            tb_forn_victor.preco_venda::text LIKE concat('%',$1::text,'%')
        `,
        "parametros": [lista.nome.replace(',','.')]
    }
}