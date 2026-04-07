import express from "express";
import { Produtonovo,buscarProduto, atualizarProduto, deletarProduto}from "./produto_controlador";

const rotaProdutoVictor = express.Router()
rotaProdutoVictor.post("/", Produtonovo)
rotaProdutoVictor.get("/", buscarProduto)
rotaProdutoVictor.get("/:id", buscarProduto)
rotaProdutoVictor.put("/:id", atualizarProduto)
rotaProdutoVictor.delete("/:id",deletarProduto)

export = rotaProdutoVictor