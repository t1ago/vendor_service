-- Active: 1751219852634@@ep-raspy-river-a8zxdh1m-pooler.eastus2.azure.neon.tech@5432@vendor_db_database@public
CREATE TABLE tb_categoria (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    PRIMARY KEY (id)
);