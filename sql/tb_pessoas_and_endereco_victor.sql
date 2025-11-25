CREATE TABLE tb_pessoas_victor (
id_pessoa int GENERATED ALWAYS AS IDENTITY not null,
nome VARCHAR(128) not null,
apelido VARCHAR(128) not null,
tipo_pessoa CHAR(1) not null,
sexo CHAR(1),
idade TIMESTAMP,
documento_federal VARCHAR(14) not null,
documento_estadual VARCHAR(13) not null,
ativo CHAR(1),
id_vinculo int,
PRIMARY KEY (id_pessoa),
CONSTRAINT ck_tipo_pessoa CHECK (tipo_pessoa in ('F','J')),
CONSTRAINT ck_sexo CHECK (sexo in ('M','F')),
CONSTRAINT ck_ativo CHECK (ativo in ('A','I')),
CONSTRAINT fk_vinculo FOREIGN KEY (id_vinculo) REFERENCES tb_pessoas_victor (id_pessoa)
); 
CREATE TABLE tb_enderecos_pessoas_victor (
id_endereco int GENERATED ALWAYS AS IDENTITY not null,
cep varchar(9) not null,
logradouro varchar(128) not null,
numero varchar(12),
bairro varchar(64) not null,
cidade varchar(64) not null,
estado char(2) not null,
ativo char(1) not null,
tipo_endereco char(1) not null,
id_pessoa int not null,
PRIMARY KEY (id_endereco),
CONSTRAINT ck_ativo_endereco CHECK (ativo in ('A','I')),
CONSTRAINT ck_tipo_endereco CHECK (tipo_endereco in ('M','C','E')),
CONSTRAINT fk_pessoa FOREIGN KEY (id_pessoa) REFERENCES tb_pessoas_victor (id_pessoa)
);