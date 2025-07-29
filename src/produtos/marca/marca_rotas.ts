import express from "express";
import { control_buscar, control_buscar_id, control_delete, control_inserir, control_update } from "./marca_controlador";


const rota = express.Router()
rota.post("/",control_inserir)
rota.get("/",control_buscar)
rota.get("/:id",control_buscar_id)
rota.put("/:id",control_update)
rota.delete("/:id",control_delete)
export = rota