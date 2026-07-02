import { ISqlDados } from '../../../interfaces/sql_filtro';

export const sqlCriarCategoria = (parametros: any): ISqlDados => {
    return {
        sql: `
            INSERT INTO tb_categoria (nome)
            VALUES ($1)
            RETURNING id;
        `,
        valores: [parametros.nome],
    };
};

export const sqlAlterarCategoria = (parametros: any): ISqlDados => {
    return {
        sql: `
            UPDATE tb_categoria
            SET nome=$1
            WHERE id=$2;
        `,
        valores: [parametros.nome, parametros.id],
    };
};

export const sqlBuscarCategoria = (parametros: any): ISqlDados => {
    return {
        sql: `
            SELECT * FROM tb_categoria
            WHERE id=$1;
        `,
        valores: [parametros.id],
    };
};

export const sqlBuscarTodasCategorias = (): ISqlDados => {
    return {
        sql: `SELECT * FROM tb_categoria ORDER BY nome;`,
        valores: null,
    };
};

export const sqlRemoverCategoria = (parametros: any): ISqlDados => {
    return {
        sql: `DELETE FROM tb_categoria WHERE id=$1;`,
        valores: [parametros.id],
    };
};
