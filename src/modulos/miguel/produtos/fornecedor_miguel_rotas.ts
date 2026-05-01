import express from "express";
import { NovoDelete, NovoPost, NovoUpdate, buscar_todos, buscar_por_id } from "./fornecedor_miguel_controlador";

const miguel_fornecedor = express.Router();

// Buscar todos
miguel_fornecedor.get("/", buscar_todos);

// Buscar por ID

miguel_fornecedor.get("/:id", buscar_por_id);


// Inserir novo
miguel_fornecedor.post("/", NovoPost);

// Atualizar
miguel_fornecedor.put("/:id", NovoUpdate);

// Deletar
miguel_fornecedor.delete("/:id", NovoDelete);

export = miguel_fornecedor;
