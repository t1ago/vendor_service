CREATE TABLE tb_categoria (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    PRIMARY KEY (id)
);

CREATE TABLE tb_produto_tiago (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    descricao varchar(128),
    id_categoria integer NOT NULL,
    id_moeda integer,
    id_grupo integer,
    id_undade_medida integer,
    id_cor integer,
    id_marca integer,
    preco_compra numeric(12, 2),
    preco_venda numeric(12, 2),
    PRIMARY KEY (id),
    CONSTRAINT fk_categoria FOREIGN key (id_categoria) REFERENCES tb_categoria (id),
    CONSTRAINT fk_moeda FOREIGN key (id_moeda) REFERENCES tb_moeda (id),
    CONSTRAINT fk_grupo FOREIGN key (id_grupo) REFERENCES tb_grupo (id),
    CONSTRAINT fk_unidade_medida FOREIGN key (id_undade_medida) REFERENCES tb_medida (id),
    CONSTRAINT fk_cor FOREIGN key (id_cor) REFERENCES tb_cores (id),
    CONSTRAINT fk_marca FOREIGN key (id_marca) REFERENCES tb_marca (id)
);

CREATE TABLE tb_pessoa_tiago (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64) NOT NULL,
    apelido varchar(64) NOT NULL,
    tipo_pessoa CHAR(1) CHECK (tipo_pessoa IN ('J', 'F')) NOT NULL,
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
    data_inicio TIMESTAMP,
    documento_estadual VARCHAR(14) NOT NULL,
    documento_federeal VARCHAR(14) NOT NULL,
    id_vinculo integer,
    ativo CHAR(1) CHECK (ativo IN ('A', 'I')),
    PRIMARY KEY (id),
    CONSTRAINT fk_pessoa_tiago FOREIGN key (id_vinculo) REFERENCES tb_pessoa_tiago (id)
)

CREATE TABLE tb_endereco_pessoa_tiago (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    id_pessoa integer,
    cep varchar(9) NOT NULL,
    logradouro varchar(256) NOT NULL,
    numero varchar(12),
    bairro VARCHAR(64) NOT NULL,
    cidade VARCHAR(64) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    tipo_endereco CHAR(1) CHECK (
        tipo_endereco IN ('M', 'C', 'E')
    ),
    ativo CHAR(1) CHECK (ativo IN ('A', 'I')),
    PRIMARY KEY (id),
    CONSTRAINT fk_pessoa_tiago FOREIGN key (id_pessoa) REFERENCES tb_pessoa_tiago (id)
)