import  express  from "express"
import { alterargrupo, buscargrupo, buscargrupos, inserirgrupo, removergrupo } from "./grupo_controlador"

const gruporota = express.Router() 
gruporota.post("/", inserirgrupo)
gruporota.put("/:id", alterargrupo)
gruporota.delete("/:id", removergrupo)
gruporota.get("/:id",buscargrupo)
gruporota.get("/", buscargrupos)
export = gruporota

