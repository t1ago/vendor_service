export const MARCA_SQL = {
    INSERT : "INSERT INTO tb_marca (nome) VALUES ($1) RETURNING id",
    UPDATE : "UPDATE tb_marca SET nome=$1 WHERE id=$2",
    DELETE : "DELETE FROM tb_marca WHERE id=$1",
    SELECT_ID : "SELECT * FROM tb_marca WHERE id=$1",
    SELECT_QUERY : "SELECT * FROM tb_marca WHERE nome ILIKE $1",
    SELECT_ALL : "SELECT * FROM tb_marca"
}