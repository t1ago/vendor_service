import express from "express";
import {
  buscarCategorias,
  buscarCategoria,
  alterarCategoria,
  criarCategoria,
  removerCategoria,
} from "./categorias_controlador";
import { autenticadorInterceptador } from "../../../utils/utils";

const rotasCategorias = express.Router();

rotasCategorias.get("/", autenticadorInterceptador, buscarCategorias);
rotasCategorias.get("/:id", buscarCategoria);
rotasCategorias.post("/", criarCategoria);
rotasCategorias.put("/:id", alterarCategoria);
rotasCategorias.delete("/:id", removerCategoria);

export = rotasCategorias;
