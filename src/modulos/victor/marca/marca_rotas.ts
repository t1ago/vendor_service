import express from "express";
import { control_buscar, control_buscar_id, control_delete, control_inserir, control_update } from "./marca_controlador";
import { autentificadorInterruptor } from "../../../utils/victor/utils";


const rotaMarca = express.Router()
rotaMarca.post("/",autentificadorInterruptor,control_inserir)
rotaMarca.get("/",autentificadorInterruptor, control_buscar)
rotaMarca.get("/:id",autentificadorInterruptor,control_buscar_id)
rotaMarca.put("/:id",autentificadorInterruptor,control_update)
rotaMarca.delete("/:id",autentificadorInterruptor,control_delete)
export = rotaMarca