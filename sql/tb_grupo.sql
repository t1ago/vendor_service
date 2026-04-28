CREATE TABLE tb_grupo(
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    PRIMARY KEY(id)
);