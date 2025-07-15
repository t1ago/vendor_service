-- Active: 1751219852634@@ep-raspy-river-a8zxdh1m-pooler.eastus2.azure.neon.tech@5432@vendor_db_database@public
CREATE TABLE tb_fornecedor_tiago (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    descricao varchar(128),
    id_categoria integer,
    PRIMARY KEY (id)
);

alter table tb_fornecedor_tiago
add constraint fk_categoria FOREIGN KEY (id_categoria) REFERENCES tb_categoria (id);

alter Table tb_fornecedor_tiago
alter COLUMN id_categoria
set not null;

SELECT tb_fortiago.id, tb_fortiago.nome, tb_fortiago.descricao, tb_fortiago.id_categoria, tb_cat.nome as nome_categoria
FROM
    tb_fornecedor_tiago tb_fortiago
    inner join tb_categoria tb_cat on tb_fortiago.id_categoria = tb_cat.id
WHERE
    lower(tb_fortiago.nome) like lower(concat('%', $1::text, '%'))
    or lower(tb_fortiago.descricao) like lower(concat('%', $1::text, '%'));