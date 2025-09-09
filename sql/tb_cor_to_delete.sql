-- Active: 1751408547271@@ep-raspy-river-a8zxdh1m.eastus2.azure.neon.tech@5432@vendor_db_database@public
CREATE TABLE tb_cores (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    hexadecimal varchar(7),
    ativo char(1),
    PRIMARY KEY (id)
);