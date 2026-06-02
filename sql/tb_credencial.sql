CREATE TABLE tb_credencial(
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    id_profile integer NOT NULL,
    name varchar(128) NOT NULL,
    email varchar(128) NOT NULL,
    password varchar(128) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_id_profile FOREIGN key(id_profile) REFERENCES tb_perfil(id)
);