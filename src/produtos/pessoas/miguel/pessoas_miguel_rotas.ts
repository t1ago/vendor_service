import  express  from "express";
import { control_delete, control_get, insert, update } from "./pessoas_miguel_controlador";

const rotas_pessoas_miguel = express.Router()

rotas_pessoas_miguel.get("/:id?", control_get) 
rotas_pessoas_miguel.post("/", insert)
rotas_pessoas_miguel.put("/:id", update)
rotas_pessoas_miguel.delete("/:id", control_delete)

export =  rotas_pessoas_miguel
