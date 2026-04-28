export const GRUPO_SQL = {
    INSERT : "INSERT INTO tb_grupo (nome) VALUES ($1) RETURNING id",
    UPDATE : "UPDATE tb_grupo SET nome=$1 WHERE id=$2",
    DELETE : "DELETE FROM tb_grupo WHERE id=$1",
    SELECT_ID : "SELECT * FROM tb_grupo WHERE id=$1",
    SELECT_ALL : "SELECT * FROM tb_grupo"
}