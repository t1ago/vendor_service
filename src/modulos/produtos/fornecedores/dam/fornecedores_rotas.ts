import express from "express";
import { salvar, buscarid, buscarTudo, listarFornecedor, remover } from "./fornecedores_controlador";

const rotasFornecedoresDam = express.Router();


rotasFornecedoresDam.get('/teste', (req, res) => {
  res.json({ executado: true, mensagem: "Rota funcionando!" });
});

// Listar todos
rotasFornecedoresDam.get('/', listarFornecedor);

// Rota única para criar/alterar
rotasFornecedoresDam.post('/salvar', salvar);

// Remover
rotasFornecedoresDam.delete('/:id', remover);
// Buscar por ID
rotasFornecedoresDam.get('/id/:id', buscarid);
// Buscar genérico
rotasFornecedoresDam.get('/buscar', buscarTudo);

export = rotasFornecedoresDam;
