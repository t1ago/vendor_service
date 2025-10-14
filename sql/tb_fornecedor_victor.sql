-- Active: 1751331196646@@ep-raspy-river-a8zxdh1m.eastus2.azure.neon.tech@5432@vendor_db_database
alter table tb_fornecedor_victor alter COLUMN id_categoria TYPE INTEGER;
alter table tb_fornecedor_victor add constraint fk_categoria FOREIGN KEY (id_categoria) REFERENCES tb_categoria (id);

alter table tb_fornecedor_victor add COLUMN id_moeda INTEGER;
alter table tb_fornecedor_victor add constraint fk_moeda FOREIGN KEY (id_moeda) REFERENCES tb_moeda (id);

alter table tb_fornecedor_victor add COLUMN id_marca INTEGER;
alter Table tb_fornecedor_victor add constraint fk_marca FOREIGN KEY (id_marca) REFERENCES tb_marca (id);

alter table tb_fornecedor_victor add COLUMN id_cores INTEGER;
alter Table tb_fornecedor_victor add constraint fk_cores FOREIGN KEY (id_cores) REFERENCES tb_cores (id);
alter table tb_fornecedor_victor add COLUMN id_unidade_medida INTEGER;
alter Table tb_fornecedor_victor add constraint fk_unidade_medida FOREIGN KEY (id_unidade_medida) REFERENCES tb_medida (id);
alter table tb_fornecedor_victor add COLUMN id_grupo INTEGER;
alter Table tb_fornecedor_victor add constraint fk_grupo FOREIGN KEY (id_grupo) REFERENCES tb_grupo (id);

alter Table tb_fornecedor_victor add COLUMN preco_compra DECIMAL(12,2);
alter Table tb_fornecedor_victor add COLUMN preco_venda DECIMAL(12,2);
