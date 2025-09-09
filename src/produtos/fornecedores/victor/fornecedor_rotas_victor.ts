import express from "express";
import { atualizarFornecedor, buscarFornecedor, deletarFornecedor, fornecedornovo } from "./fornecedor_controlador_victor";

export const rotaFornecedorVictor = express.Router()
rotaFornecedorVictor.post("/", fornecedornovo)
rotaFornecedorVictor.get("/", buscarFornecedor)
rotaFornecedorVictor.get("/:id", buscarFornecedor)
rotaFornecedorVictor.put("/:id", atualizarFornecedor)
rotaFornecedorVictor.delete("/:id",deletarFornecedor)