import express from "express";
import {
  buscarCategorias,
  buscarCategoria,
  alterarCategoria,
  criarCategoria,
  removerCategoria,
} from "./categoria_controlador";
import { autenticadorInterceptador } from "../../../utils/utils";

const rotasCategorias = express.Router();

rotasCategorias.get("/", autenticadorInterceptador, buscarCategorias);
rotasCategorias.get("/:id", autenticadorInterceptador, buscarCategoria);
rotasCategorias.post("/", autenticadorInterceptador, criarCategoria);
rotasCategorias.put("/:id", autenticadorInterceptador, alterarCategoria);
rotasCategorias.delete("/:id", autenticadorInterceptador, removerCategoria);

export = rotasCategorias;
