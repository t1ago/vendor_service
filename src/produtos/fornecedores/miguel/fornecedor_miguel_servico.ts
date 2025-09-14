import { db_cliente } from "../../../../commons/banco_dados";
import { QueryResult } from "pg"

// A função 'resultado' deve ser criada dentro de cada método para evitar problemas de concorrência
const criarResultado = (): { executado:  boolean; mensagem: string; data: any } => ({
    executado: false,
    mensagem: "",
    data: []
});

export const MicroservicoInsert = async (fornecedor: any) => {
    const cliente = db_cliente();
    const resultado = criarResultado();
    try {
        await cliente.connect(); 

        const sql = "INSERT INTO tb_fornecedor_miguel (nome, descricao, id_categoria, id_cor, id_marca, id_grupo, id_moeda, id_unidade_medida, preco_compra, preco_venda) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id";
        const parametros = [fornecedor.nome, fornecedor.descricao, fornecedor.id_categoria, fornecedor.id_cor, fornecedor.id_marca, fornecedor.id_grupo, fornecedor.id_moeda, fornecedor.id_unidade_medida, fornecedor.preco_compra, fornecedor.preco_venda];
        const resultado_insert = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.mensagem = "";
        resultado.data = resultado_insert.rows[0].id;
    } catch (erro) {
        resultado.executado = false;
        resultado.mensagem = "erro" + erro;
        resultado.data = {};
    } finally {
        await cliente.end();
    }
    return resultado;
}

export const MicroservicoUpdate = async (fornecedor: any) => {
    const cliente = db_cliente();
    const resultado = criarResultado();
    try {
        await cliente.connect(); 

        const sql = "UPDATE tb_fornecedor_miguel SET nome=$1, descricao=$2, id_categoria=$3, id_cor=$4, id_marca=$5, id_grupo=$6, id_moeda=$7, id_unidade_medida=$8, preco_compra=$9, preco_venda=$10 WHERE id=$11";
        const parametros = [fornecedor.nome, fornecedor.descricao, fornecedor.id_categoria, fornecedor.id_cor, fornecedor.id_marca, fornecedor.id_grupo, fornecedor.id_moeda, fornecedor.id_unidade_medida, fornecedor.preco_compra, fornecedor.preco_venda, fornecedor.id];
        const resultado_update = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.mensagem = "";
        resultado.data = resultado_update.rows;
    } catch (erro) {
        resultado.executado = false;
        resultado.mensagem = "erro" + erro;
        resultado.data = {};
    } finally {
        await cliente.end();
    }
    return resultado;
}

export const MicroservicoDelete = async (fornecedor: any) => {
    const cliente = db_cliente();
    const resultado = criarResultado();
    try {
        await cliente.connect()

        // CORREÇÃO: o DELETE não se usa into, e sim o FROM (dia 04)
        const sql = "DELETE FROM tb_fornecedor_miguel WHERE id=$1";
        const parametros = [fornecedor.id];
        const resultado_delete = await cliente.query(sql, parametros);

        resultado.executado = true;
        resultado.mensagem = "";
        resultado.data = resultado_delete.rows;
    } catch (erro) {
        resultado.executado = false;
        resultado.mensagem = "erro" + erro;
        resultado.data = {};
    } finally {
        await cliente.end();
    }
    return resultado;
}


// tentativas de fazer funcionar e nada / buscar por id failed 17:59 (dia 05)

// tentativas de sucesso, funcionar o buscar por id 10:25 (dia 06)
export const buscar = async (fornecedor: any) => {
    const cliente = db_cliente();
    const resultado = criarResultado();
    try {
        cliente.connect();
        let parametros_busca: any;
        // novo import feito, para o retorno certo  - dia 08/09
        let resultado_banco: QueryResult<any>


        // teste logico incluindo todos os tipos de pesquisa ( so o id por enquanto ) - dia 08/09
        if (fornecedor.id != null) {
            parametros_busca = await buscar_id(fornecedor);
        } else if (fornecedor.nome != null) {
            parametros_busca = await buscar_nome(fornecedor);
        } else {
            parametros_busca = await buscar_tudo();
        }

        if (parametros_busca.valores !== null) {
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
        }
        else {
            resultado_banco = await cliente.query(parametros_busca.sql);
        }

        const executado = (resultado_banco.rowCount || 0) > 0

        resultado.executado = true;
        resultado.mensagem = "";
        resultado.data = executado ? resultado_banco.rows : []

    } catch (erro) {
        resultado.executado = false;
        resultado.mensagem = "erro" + erro;
        resultado.data = {};
    } finally {
        await cliente.end();
    }
    return resultado;
}

// arrumado  o SQL, tomar cuidado com o erro de ortografia, estava me dando vazio por este motivo ( feito )
export const buscar_id = async (fornecedor: any) => {
    return {
        // questão de erro informacional, pois o nome deveria estar em 1 º para retornar de uma forma mais orbanizada (pendente) - dia 08/09
        
        sql: `
            SELECT 
                tb_forn_mig.id,
                tb_forn_mig.descricao,
                tb_forn_mig.id_categoria,
                tb_cat.nome AS "nome_categoria",
                tb_forn_mig.id_moeda,
                tb_mo.nome AS "nome_moeda",
                tb_forn_mig.id_cor,
                tb_co.hexadecimal AS "hexadecimal",
                tb_forn_mig.id_grupo,
                tb_gru.nome AS "nome_grupo",
                tb_forn_mig.id_marca,
                tb_mar.nome AS "nome_marca",
                tb_forn_mig.id_unidade_medida,
                tb_med.nome AS "nome_medida",
                tb_forn_mig.nome,                   
                tb_forn_mig.preco_compra,
                tb_forn_mig.preco_venda
            FROM tb_fornecedor_miguel tb_forn_mig
            LEFT JOIN tb_categoria tb_cat ON tb_forn_mig.id_categoria = tb_cat.id
            LEFT JOIN tb_moeda tb_mo ON tb_forn_mig.id_moeda = tb_mo.id
            LEFT JOIN tb_cores tb_co ON tb_forn_mig.id_cor = tb_co.id
            LEFT JOIN tb_grupo tb_gru ON tb_forn_mig.id_grupo = tb_gru.id
            LEFT JOIN tb_marca tb_mar ON tb_forn_mig.id_marca = tb_mar.id
            LEFT JOIN tb_medida tb_med ON tb_forn_mig.id_unidade_medida = tb_med.id
            WHERE tb_forn_mig.id = $1;
        `,
        valores: [fornecedor.id]
    }
}

export const buscar_nome = async (fornecedor: any) => {
    return {
        sql: `
            select 
            tb_forn_mig.id,
            tb_forn_mig.descricao,
            tb_forn_mig.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_mig.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_mig.id_cor,
            tb_co.hexadecimal as "hexidecimal",
            tb_forn_mig.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_mig.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_mig.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_mig.nome,
            tb_forn_mig.preco_compra,
            tb_forn_mig.preco_venda
        FROM tb_fornecedor_miguel tb_forn_mig
        INNER JOIN tb_categoria tb_cat on tb_forn_mig.id_categoria = tb_cat.id
        INNER JOIN tb_moeda tb_mo on tb_forn_mig.id_moeda = tb_mo.id
        INNER JOIN tb_cores tb_co on tb_forn_mig.id_cor = tb_co.id
        INNER JOIN tb_grupo tb_gru on tb_forn_mig.id_grupo = tb_gru.id
        INNER JOIN tb_marca tb_mar on tb_forn_mig.id_marca = tb_mar.id
        INNER JOIN tb_medida tb_med on tb_forn_mig.id_unidade_medida = tb_med.id
        WHERE lower(tb_forn_mig.nome) like lower(concat('%', $1::text, '%'))
        OR lower(tb_forn_mig.descricao) like lower(concat('%', $1::text, '%'))
        ORDER BY tb_forn_mig.nome;
        `,
        valores: [fornecedor.nome]
    }
}

export const buscar_tudo = async () => {
    return {
        sql: `
            select 
            tb_forn_mig.id,
            tb_forn_mig.descricao,
            tb_forn_mig.id_categoria,
            tb_cat.nome as "nome_categoria",
            tb_forn_mig.id_moeda,
            tb_mo.nome as "nome_moeda",
            tb_forn_mig.id_cor,
            tb_co.hexadecimal as "hexidecimal",
            tb_forn_mig.id_grupo,
            tb_gru.nome as "nome_grupo",
            tb_forn_mig.id_marca,
            tb_mar.nome as "nome_marca",
            tb_forn_mig.id_unidade_medida,
            tb_med.nome as "nome_medida",
            tb_forn_mig.nome,
            tb_forn_mig.preco_compra,
            tb_forn_mig.preco_venda
        FROM tb_fornecedor_miguel tb_forn_mig
        INNER JOIN tb_categoria tb_cat on tb_forn_mig.id_categoria = tb_cat.id
        INNER JOIN tb_moeda tb_mo on tb_forn_mig.id_moeda = tb_mo.id
        INNER JOIN tb_cores tb_co on tb_forn_mig.id_cor = tb_co.id
        INNER JOIN tb_grupo tb_gru on tb_forn_mig.id_grupo = tb_gru.id
        INNER JOIN tb_marca tb_mar on tb_forn_mig.id_marca = tb_mar.id
        INNER JOIN tb_medida tb_med on tb_forn_mig.id_unidade_medida = tb_med.id
        `,
        valores: null
    }
}