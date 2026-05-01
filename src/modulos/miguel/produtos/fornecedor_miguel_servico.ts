import { PoolClient, QueryResult } from "pg"
import { dbCliente, dbPool } from "../../../utils/banco_dados";
import { IResultadoAPI } from "../../../interfaces/resultado_api"
import { processarDados, processarDadosEmpty } from "../../../utils/utils";


export const MicroservicoInsert = async (fornecedor: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;
    try {
        await cliente.connect();

        const sql =
            'INSERT INTO tb_fornecedor_miguel (nome, descricao, id_categoria, id_cor, id_marca, id_grupo, id_moeda, id_unidade_medida, preco_compra, preco_venda) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
        const parametros = [
            fornecedor.nome,
            fornecedor.descricao,
            fornecedor.id_categoria,
            fornecedor.id_cor,
            fornecedor.id_marca,
            fornecedor.id_grupo,
            fornecedor.id_moeda,
            fornecedor.id_unidade_medida,
            fornecedor.preco_compra,
            fornecedor.preco_venda,
        ];
        const resultado_insert = await cliente.query(sql, parametros);

        resultado = processarDados(() => {
            return resultado_insert.rows
        })

    } catch (erro: any) {
        resultado = processarDadosEmpty(erro)
    } finally {
        await cliente.end();
    }
    return resultado;
};

export const MicroservicoUpdate = async (fornecedor: any) => {
    const pool = dbPool();

    let cliente: PoolClient = await pool.connect();
    let resultado: IResultadoAPI;

    try {
        await cliente.query('BEGIN')

        const sql =
            'UPDATE tb_fornecedor_miguel SET nome=$1, descricao=$2, id_categoria=$3, id_cor=$4, id_marca=$5, id_grupo=$6, id_moeda=$7, id_unidade_medida=$8, preco_compra=$9, preco_venda=$10 WHERE id=$11';
        const parametros = [
            fornecedor.nome,
            fornecedor.descricao,
            fornecedor.id_categoria,
            fornecedor.id_cor,
            fornecedor.id_marca,
            fornecedor.id_grupo,
            fornecedor.id_moeda,
            fornecedor.id_unidade_medida,
            fornecedor.preco_compra,
            fornecedor.preco_venda,
            fornecedor.id,
        ];
        const resultado_update = await cliente.query(sql, parametros);

        await cliente.query('COMMIT')

        resultado = processarDados(() => {
            return resultado_update.rows
        })
    } catch (erro: any) {
        await cliente.query('ROLLBACK')
        resultado = processarDadosEmpty(erro)
    } finally {
        await cliente.release();
    }
    return resultado;
};

export const MicroservicoDelete = async (fornecedor: any) => {
    const pool = dbPool();

    let cliente: PoolClient = await pool.connect();
    let resultado: IResultadoAPI;
    try {
        await cliente.query('BEGIN')


        const sql = "DELETE FROM tb_fornecedor_miguel WHERE id=$1";
        const parametros = [fornecedor.id];
        const resultado_delete = await cliente.query(sql, parametros);

        resultado = processarDados(() => {
            return resultado_delete.rows
        })

    } catch (erro: any) {
        await cliente.query('ROLLBACK')
        resultado = processarDadosEmpty(erro)
    } finally {
        await cliente.release();
    }
    return resultado;
};

// TODO: Resolver aqui o Resultado, para busca dia 01/05
export const buscar = async (fornecedor: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;
    try {
        await cliente.connect();
        let parametros_busca: any;

        let resultado_banco: QueryResult<any>;


        if (fornecedor.id != null) {
            parametros_busca = await buscar_id(fornecedor);
        } else if (fornecedor.nome != null) {
            parametros_busca = await buscar_nome(fornecedor);
        } else {
            parametros_busca = await buscar_tudo();
        }

        if (parametros_busca.valores !== null) {
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores);
        } else {
            resultado_banco = await cliente.query(parametros_busca.sql);
        }

        const executado = (resultado_banco.rowCount || 0) > 0;


    } catch (erro) {

    } finally {
        await cliente.end();
    }

};

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
        valores: [fornecedor.id],
    };
};

export const buscar_nome = async (fornecedor: any) => {
    return {
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
        WHERE
            lower(tb_forn_mig.nome) LIKE lower(concat('%', $1::text, '%'))
            OR lower(tb_mo.nome) LIKE lower(concat('%', $1::text, '%'))
            OR tb_forn_mig.preco_compra::text LIKE concat('%', $1::text, '%')
            OR tb_forn_mig.preco_venda::text LIKE concat('%', $1::text, '%')
            OR tb_forn_mig.id_cor::text LIKE concat('%', $1::text, '%')
            OR tb_forn_mig.id_grupo::text LIKE concat('%', $1::text, '%')
            OR tb_forn_mig.id_categoria::text LIKE concat('%', $1::text, '%')
            OR tb_forn_mig.id_unidade_medida::text LIKE concat('%', $1::text, '%')
            OR tb_forn_mig.id_marca::text LIKE concat('%', $1::text, '%')
            OR lower(tb_forn_mig.descricao) LIKE lower(concat('%', $1::text, '%'))
        `,
        valores: [fornecedor.nome],
    };
};

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
        valores: null,
    };
};
