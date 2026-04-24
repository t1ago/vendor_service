import express from "express";
import { inserirProduto,buscarProduto, alterarProduto, deletarProduto}from "./produto_controlador";

const rotasProdutoVictor = express.Router()
rotasProdutoVictor.post("/", inserirProduto)
rotasProdutoVictor.get("/", buscarProduto)
rotasProdutoVictor.get("/:id", buscarProduto)
rotasProdutoVictor.put("/:id", alterarProduto)
rotasProdutoVictor.delete("/:id",deletarProduto)

export = rotasProdutoVictor