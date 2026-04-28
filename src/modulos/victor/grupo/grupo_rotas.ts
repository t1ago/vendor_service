import  express  from "express"
import { alterarGrupo, buscarGrupo, buscarGrupos, inserirGrupo, removerGrupo } from "./grupo_controlador"
import { autentificadorInterruptor } from "../../../utils/victor/utils"

const rotasVictorGrupo = express.Router() 
rotasVictorGrupo.post("/",autentificadorInterruptor, inserirGrupo)
rotasVictorGrupo.put("/:id",autentificadorInterruptor, alterarGrupo)
rotasVictorGrupo.delete("/:id",autentificadorInterruptor, removerGrupo)
rotasVictorGrupo.get("/:id",autentificadorInterruptor,buscarGrupo)
rotasVictorGrupo.get("/",autentificadorInterruptor, buscarGrupos)
export = rotasVictorGrupo