import express from "express"
import { buscar, delet, inserir, update } from "./moedas_controlador"
import { authenticadorInteceptador } from "../../../utils/utils_Miguel"

export const rotas_moedas = express.Router()

rotas_moedas.get("/", authenticadorInteceptador, buscar)
rotas_moedas.post("/", authenticadorInteceptador, inserir)
rotas_moedas.put("/:id", authenticadorInteceptador, update)
rotas_moedas.delete("/:id", authenticadorInteceptador, delet)