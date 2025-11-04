import express from "express";
import { control_delete, control_get, insert, update } from "./pessoa_miguel_controlador";

const rotas_pessoa_miguel = express.Router()

rotas_pessoa_miguel.get("/", control_get)
rotas_pessoa_miguel.post("/", insert)
rotas_pessoa_miguel.put("/:id", update)
rotas_pessoa_miguel.delete("/:id", control_delete)

export default rotas_pessoa_miguel;

