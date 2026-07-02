import { ISqlDados } from '../../../interfaces/sql_filtro';

export const sqlCriarMedida = (parametros: any): ISqlDados => {
    return {
        sql: `
            INSERT INTO tb_medida (nome)
            VALUES ($1)
            RETURNING id;
        `,
        valores: [parametros.nome],
    };
};

export const sqlAlterarMedida = (parametros: any): ISqlDados => {
    return {
        sql: `
            UPDATE tb_medida
            SET nome=$1
            WHERE id=$2;
        `,
        valores: [parametros.nome, parametros.id],
    };
};

export const sqlBuscarMedida = (parametros: any): ISqlDados => {
    return {
        sql: `SELECT * FROM tb_medida WHERE id=$1;`,
        valores: [parametros.id],
    };
};

export const sqlBuscarTodasMedidas = (): ISqlDados => {
    return {
        sql: `SELECT * FROM tb_medida ORDER BY nome;`,
        valores: null,
    };
};

export const sqlRemoverMedida = (parametros: any): ISqlDados => {
    return {
        sql: `DELETE FROM tb_medida WHERE id=$1;`,
        valores: [parametros.id],
    };
};
