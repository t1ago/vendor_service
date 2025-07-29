import express from "express";
import {
  criarMedida,
  listarMedidas,
  buscarMedida,
  alterarMedida,
  removerMedida
} from "./medidas_controlador";

const rotasMedidas = express.Router();

rotasMedidas.post("/", criarMedida);
rotasMedidas.get("/", listarMedidas);
rotasMedidas.get("/:id", buscarMedida);
rotasMedidas.put("/:id", alterarMedida);
rotasMedidas.delete("/:id", removerMedida);

export = rotasMedidas;