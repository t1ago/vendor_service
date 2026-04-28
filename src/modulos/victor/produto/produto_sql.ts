export const PRODUTO_SQL = {
    INSERT : "INSERT INTO tb_fornecedor_victor (nome,descricao,id_categoria,id_moeda,id_marca,id_cores,id_unidade_medida,id_grupo, preco_compra,preco_venda) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id",
    UPDATE : `
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
        `,
    DELETE : "DELETE FROM tb_fornecedor_victor WHERE id=$1",
    SELECT_ID : `
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
    SELECT_QUERY : `
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
    SELECT_ALL :  `
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
        ORDER BY tb_forn_victor.nome`
}
