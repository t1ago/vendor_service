import express from "express";
import {
  criarMedida,
  listarMedidas,
  buscarMedida,
  alterarMedida,
  removerMedida
} from "./medidas_controlador";
import { authenticadorInteceptador } from "../../../utils/utils_Miguel";

const rotasMedidas = express.Router();

rotasMedidas.post("/", authenticadorInteceptador, criarMedida);
rotasMedidas.get("/", authenticadorInteceptador, listarMedidas);
rotasMedidas.get("/:id", authenticadorInteceptador, buscarMedida);
rotasMedidas.put("/:id", authenticadorInteceptador, alterarMedida);
rotasMedidas.delete("/:id", authenticadorInteceptador, removerMedida);

export = rotasMedidas;

