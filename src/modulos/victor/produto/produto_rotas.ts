import express from "express";
import { inserirProduto,buscarProduto, alterarProduto, deletarProduto}from "./produto_controlador";

const rotasVictorProduto = express.Router()
rotasVictorProduto.post("/", inserirProduto)
rotasVictorProduto.get("/", buscarProduto)
rotasVictorProduto.get("/:id", buscarProduto)
rotasVictorProduto.put("/:id", alterarProduto)
rotasVictorProduto.delete("/:id",deletarProduto)

export = rotasVictorProduto