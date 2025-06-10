CREATE TABLE tb_categoria (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    PRIMARY KEY (id)
);