import express from "express";
import { buscar_new, NovoDelete, NovoPost, NovoUpdate, } from "./fornecedor_miguel_controlador";

const miguel_fornecedor = express.Router();

// Buscar todos
miguel_fornecedor.get("/", buscar_new);

// Buscar por ID

miguel_fornecedor.get("/:id", buscar_new);


// Inserir novo
miguel_fornecedor.post("/", NovoPost);

// Atualizar
miguel_fornecedor.put("/:id", NovoUpdate);

// Deletar
miguel_fornecedor.delete("/:id", NovoDelete);

export = miguel_fornecedor;
