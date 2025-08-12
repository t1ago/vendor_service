import express from "express"
import { alterarCor, criarCor, listarCor, listarCorId, romverCor } from "./cores_controlador"

const rotasCores = express.Router()
rotasCores.post('/', criarCor)
rotasCores.get('/', listarCor)
rotasCores.get('/:id', listarCorId)
rotasCores.put('/:id', alterarCor)
rotasCores.delete('/:id', romverCor)

export = rotasCores