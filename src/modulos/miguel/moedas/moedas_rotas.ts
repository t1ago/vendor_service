import express from "express"
import { buscar, delet, inserir, update } from "./moedas_controlador"
import { authenticadorInteceptador } from "../../../utils/utils_Miguel"

const miguel_moedas = express.Router()

miguel_moedas.get("/", authenticadorInteceptador, buscar)
miguel_moedas.post("/", authenticadorInteceptador, inserir)
miguel_moedas.put("/:id", authenticadorInteceptador, update)
miguel_moedas.delete("/:id", authenticadorInteceptador, delet)

export = miguel_moedas