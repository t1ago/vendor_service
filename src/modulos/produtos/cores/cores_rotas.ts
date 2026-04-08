import express from "express"
import { alterarCor, criarCor, listarCor, listarCorId, romverCor } from "./cores_controlador"
import { authenticadorInteceptador } from "../../../utils/utils_Miguel"

const rotasCores = express.Router()
rotasCores.post('/', authenticadorInteceptador, criarCor)
rotasCores.get('/', authenticadorInteceptador, listarCor)
rotasCores.get('/:id', authenticadorInteceptador, listarCorId)
rotasCores.put('/:id', authenticadorInteceptador, alterarCor)
rotasCores.delete('/:id', authenticadorInteceptador, romverCor)

export = rotasCores