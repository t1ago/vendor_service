import  express  from "express"
import { alterargrupo, buscargrupo, inserirgrupo, removergrupo } from "./grupo_controlador"


const gruporota = express.Router() 
gruporota.post("/", inserirgrupo)
gruporota.delete("/", removergrupo)
gruporota.put("/", alterargrupo)
gruporota.get("/:id",buscargrupo)

export = gruporota



