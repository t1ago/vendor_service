CREATE TABLE tb_medida (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    PRIMARY KEY (id)
);

DROP Table tb_medidas;
