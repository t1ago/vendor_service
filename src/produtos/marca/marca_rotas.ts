import express from "express";
import { control_buscar_id, control_buscar_todos, control_delete, control_inserir, control_update } from "./marca_controlador";


const rota = express.Router()
rota.post("/",control_inserir)
rota.get("/:id",control_buscar_id)
rota.get("/",control_buscar_todos)
rota.put("/:id",control_update)
rota.delete("/:id",control_delete)
export = rota