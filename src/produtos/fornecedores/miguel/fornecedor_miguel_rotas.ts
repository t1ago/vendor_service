import express from "express";
import { buscar_new, NovoDelete, NovoPost, NovoUpdate, buscar_todos } from "./fornecedor_miguel_controlador";

const rotasfornecedor_miguel = express.Router();

// Buscar todos
rotasfornecedor_miguel.get("/", buscar_todos);

// Buscar por ID
rotasfornecedor_miguel.get("/:id", buscar_new);

// Inserir novo
rotasfornecedor_miguel.post("/", NovoPost);

// Atualizar
rotasfornecedor_miguel.put("/:id", NovoUpdate);

// Deletar
rotasfornecedor_miguel.delete("/:id", NovoDelete);

export = rotasfornecedor_miguel;
