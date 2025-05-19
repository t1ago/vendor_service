CREATE TABLE tb_cores (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    hexadecimal varchar(7),
    PRIMARY KEY (id)
);