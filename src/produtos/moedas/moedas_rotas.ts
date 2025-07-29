import express  from "express"
import { buscar, delet, inserir, update } from "./moedas_controlador"

export const rotas_moedas =  express.Router()

rotas_moedas.get("/", buscar)
rotas_moedas.post("/", inserir)
rotas_moedas.put("/", update)
rotas_moedas.delete("/", delet)


