import express from "express";
import { salvar, buscarid, buscarTudo, listarFornecedor, remover } from "./fornecedores_controlador";

const rotasFornecedoresDam = express.Router();

// Rota única para criar/alterar
rotasFornecedoresDam.post('/salvar', salvar);

// Listar todos
rotasFornecedoresDam.get('/', listarFornecedor);

// Remover
rotasFornecedoresDam.delete('/:id', remover);

// Buscar por ID
rotasFornecedoresDam.get('/id/:id', buscarid);

// Buscar genérico
rotasFornecedoresDam.get('/buscar', buscarTudo);

export = rotasFornecedoresDam;
