import express from "express";
import { buscarMarca, buscarMarcaId, deletarMarca, inserirMarca, alterarMarca } from "./marca_controlador";
import { autentificadorInterruptor } from "../../../utils/victor/utils";


const rotasVictorMarca = express.Router()
rotasVictorMarca.post("/",autentificadorInterruptor,inserirMarca)
rotasVictorMarca.get("/",autentificadorInterruptor, buscarMarca)
rotasVictorMarca.get("/:id",autentificadorInterruptor,buscarMarcaId)
rotasVictorMarca.put("/:id",autentificadorInterruptor,alterarMarca)
rotasVictorMarca.delete("/:id",autentificadorInterruptor,deletarMarca)
export = rotasVictorMarca