import { ISqlDados } from '../../../interfaces/sql_filtro';

export const sqlCriarMoeda = (parametros: any): ISqlDados => {
    return {
        sql: `
            INSERT INTO tb_moeda (nome, moeda)
            VALUES ($1, $2)
            RETURNING id;
        `,
        valores: [parametros.nome, parametros.moeda],
    };
};

export const sqlAlterarMoeda = (parametros: any): ISqlDados => {
    return {
        sql: `
            UPDATE tb_moeda
            SET nome=$1, moeda=$2
            WHERE id=$3;
        `,
        valores: [parametros.nome, parametros.moeda, parametros.id],
    };
};

export const sqlBuscarMoeda = (parametros: any): ISqlDados => {
    return {
        sql: `SELECT * FROM tb_moeda WHERE id=$1;`,
        valores: [parametros.id],
    };
};

export const sqlBuscarTodasMoedas = (): ISqlDados => {
    return {
        sql: `SELECT * FROM tb_moeda ORDER BY nome;`,
        valores: null,
    };
};

export const sqlRemoverMoeda = (parametros: any): ISqlDados => {
    return {
        sql: `DELETE FROM tb_moeda WHERE id=$1;`,
        valores: [parametros.id],
    };
};
