-- Active: 1751219852634@@ep-raspy-river-a8zxdh1m-pooler.eastus2.azure.neon.tech@5432@vendor_db_database@public
CREATE TABLE tb_fornecedor_tiago (
    id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome varchar(64),
    descricao varchar(128),
    id_categoria integer,
    PRIMARY KEY (id)
);

alter table tb_fornecedor_tiago
add constraint fk_categoria FOREIGN KEY (id_categoria) REFERENCES tb_categoria (id);

alter Table tb_fornecedor_tiago
alter COLUMN id_categoria
set not null;

alter table tb_fornecedor_tiago add COLUMN id_moeda integer;

alter table tb_fornecedor_tiago
add constraint fk_moeda FOREIGN KEY (id_moeda) REFERENCES tb_moeda (id);

alter table tb_fornecedor_tiago add COLUMN id_grupo integer;

alter table tb_fornecedor_tiago
add constraint fk_grupo FOREIGN KEY (id_grupo) REFERENCES tb_grupo (id);

alter table tb_fornecedor_tiago add COLUMN id_undade_medida integer;

alter table tb_fornecedor_tiago
add constraint fk_unidade_medida FOREIGN KEY (id_undade_medida) REFERENCES tb_medida (id);

alter table tb_fornecedor_tiago add COLUMN id_cor integer;

alter table tb_fornecedor_tiago
add constraint fk_cor FOREIGN KEY (id_cor) REFERENCES tb_cores (id);

alter table tb_fornecedor_tiago add COLUMN id_marca integer;

alter table tb_fornecedor_tiago
add constraint fk_marca FOREIGN KEY (id_marca) REFERENCES tb_marca (id);

alter table tb_fornecedor_tiago
add COLUMN preco_compra DECIMAL(12, 2);

alter table tb_fornecedor_tiago add COLUMN preco_venda DECIMAL(12, 2);