import express from "express"
import { criarCor } from "./cores_controlador"

const rotasCores = express.Router()
rotasCores.post('/', criarCor)

export = rotasCores