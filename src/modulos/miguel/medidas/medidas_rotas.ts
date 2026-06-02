import express from "express";
import {
  criarMedida,
  listarMedidas,
  buscarMedida,
  alterarMedida,
  removerMedida
} from "./medidas_controlador";
import { authenticadorInteceptador } from "../../../utils/miguel/utils";


const miguel_medidas = express.Router();

miguel_medidas.post("/", authenticadorInteceptador, criarMedida);
miguel_medidas.get("/", authenticadorInteceptador, listarMedidas);
miguel_medidas.get("/:id", authenticadorInteceptador, buscarMedida);
miguel_medidas.put("/:id", authenticadorInteceptador, alterarMedida);
miguel_medidas.delete("/:id", authenticadorInteceptador, removerMedida);

export default miguel_medidas;

