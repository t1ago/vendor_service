import express from "express";
import { atualizarFornecedor, buscarFornecedorById, buscarFornecedorByName, deletarFornecedor, fornecedornovo } from "./fornecedor_controlador_victor";

export const rotaFornecedorVictor = express.Router()
rotaFornecedorVictor.post("/", fornecedornovo)
rotaFornecedorVictor.get("/:id", buscarFornecedorById)
rotaFornecedorVictor.get("/", buscarFornecedorByName)
// rotaFornecedorVictor.get("/", buscarFornecedorByAll)
rotaFornecedorVictor.put("/:id", atualizarFornecedor)
rotaFornecedorVictor.delete("/:id",deletarFornecedor)