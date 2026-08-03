export const CORES_SQL = {
    INSERT: 'INSERT INTO tb_cores (hexadecimal, ativo) VALUES ($1, $2) RETURNING id',
    UPDATE: 'UPDATE tb_cores SET hexadecimal = $1, ativo = $2 WHERE id = $3 RETURNING id',
    DELETE: 'DELETE FROM tb_cores WHERE id = $1 RETURNING id',
    SELECT_ID: 'SELECT * FROM tb_cores WHERE id = $1',
    SELECT_QUERY: 'SELECT * FROM tb_cores WHERE hexadecimal ILIKE $1',
    SELECT_ALL: 'SELECT * FROM tb_cores',
};
