import express from "express"
import { alterargrupo, buscargrupo, buscargrupos, inserirgrupo, removergrupo } from "./grupo_controlador"
import { authenticadorInteceptador } from "../../../utils/utils_Miguel"

const gruporota = express.Router()
gruporota.post("/", authenticadorInteceptador, inserirgrupo)
gruporota.put("/:id", alterargrupo)
gruporota.delete("/:id", removergrupo)
gruporota.get("/:id", buscargrupo)
gruporota.get("/", buscargrupos)
export = gruporota

