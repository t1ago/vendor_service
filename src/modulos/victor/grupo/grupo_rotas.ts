import  express  from "express"
import { alterarGrupo, buscarGrupo, buscarGrupos, inserirGrupo, removerGrupo } from "./grupo_controlador"
import { autentificadorInterruptor } from "../../../utils/victor/utils"

const rotasGrupo = express.Router() 
rotasGrupo.post("/",autentificadorInterruptor, inserirGrupo)
rotasGrupo.put("/:id",autentificadorInterruptor, alterarGrupo)
rotasGrupo.delete("/:id",autentificadorInterruptor, removerGrupo)
rotasGrupo.get("/:id",autentificadorInterruptor,buscarGrupo)
rotasGrupo.get("/",autentificadorInterruptor, buscarGrupos)
export = rotasGrupo