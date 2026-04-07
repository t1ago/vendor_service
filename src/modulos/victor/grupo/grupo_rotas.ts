import  express  from "express"
import { alterargrupo, buscargrupo, buscargrupos, inserirgrupo, removergrupo } from "./grupo_controlador"
import { autentificadorInterruptor } from "../../../utils/victor/utils"

const rotaGrupo = express.Router() 
rotaGrupo.post("/",autentificadorInterruptor, inserirgrupo)
rotaGrupo.put("/:id",autentificadorInterruptor, alterargrupo)
rotaGrupo.delete("/:id",autentificadorInterruptor, removergrupo)
rotaGrupo.get("/:id",autentificadorInterruptor,buscargrupo)
rotaGrupo.get("/",autentificadorInterruptor, buscargrupos)
export = rotaGrupo