import express from "express";
import { buscarMarca, buscarMarcaId, deletarMarca, inserirMarca, alterarMarca } from "./marca_controlador";
import { autentificadorInterruptor } from "../../../utils/victor/utils";


const rotasMarca = express.Router()
rotasMarca.post("/",autentificadorInterruptor,inserirMarca)
rotasMarca.get("/",autentificadorInterruptor, buscarMarca)
rotasMarca.get("/:id",autentificadorInterruptor,buscarMarcaId)
rotasMarca.put("/:id",autentificadorInterruptor,alterarMarca)
rotasMarca.delete("/:id",autentificadorInterruptor,deletarMarca)
export = rotasMarca