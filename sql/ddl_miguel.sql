CREATE TABLE tb_endereco_pessoa_miguel (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    id_pessoa integer NOT NULL,
    cep varchar(9) NOT NULL,
    logradouro varchar(156) NOT NULL,
    numero varchar(12),
    bairro varchar(64) NOT NULL,
    cidade varchar(64) NOT NULL,
    estado varchar(2) NOT NULL,
    tipo_endereco character(1) NOT NULL,
    ativo character(1) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT tb_endereco_miguel_tipo_endereco_check CHECK (
        (
            tipo_endereco = ANY (
                ARRAY[
                    'M'::bpchar,
                    'C'::bpchar,
                    'E'::bpchar
                ]
            )
        )
    ),
    CONSTRAINT tb_endereco_miguel_ativo_check CHECK (
        (
            ativo = ANY (
                ARRAY['A'::bpchar, 'I'::bpchar]
            )
        )
    )
);

CREATE TABLE tb_grupo (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    PRIMARY KEY (id)
);

CREATE TABLE tb_moeda (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    moeda varchar(64),
    PRIMARY KEY (id)
);

CREATE TABLE tb_pessoa_miguel (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64) NOT NULL,
    apelido varchar(64) NOT NULL,
    tipo_pessoa character(1) NOT NULL,
    sexo character(1),
    data_nascimento timestamp without time zone,
    documento_estadual varchar(32) NOT NULL,
    documento_federal varchar(32) NOT NULL,
    id_vinculo integer,
    ativo character(1),
    PRIMARY KEY (id),
    CONSTRAINT fk_pessoa_miguel FOREIGN key (id_vinculo) REFERENCES tb_pessoa_miguel (id),
    CONSTRAINT tb_pessoa_miguel_tipo_pessoa_check CHECK (
        (
            tipo_pessoa = ANY (
                ARRAY['J'::bpchar, 'F'::bpchar]
            )
        )
    ),
    CONSTRAINT tb_pessoa_miguel_sexo_check CHECK (
        (
            sexo = ANY (
                ARRAY['M'::bpchar, 'F'::bpchar]
            )
        )
    ),
    CONSTRAINT tb_pessoa_miguel_ativo_check CHECK (
        (
            ativo = ANY (
                ARRAY['A'::bpchar, 'I'::bpchar]
            )
        )
    )
);