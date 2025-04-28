import express from "express"
import { 
    buscarCores, 
    buscarCor, 
    alterarCor, 
    criarCor, 
    removerCor
} from "./cores_controlador"

const rotasCategorias = express.Router()

rotasCategorias.get('/', buscarCores)
rotasCategorias.get('/:id', buscarCor)
rotasCategorias.post('/', criarCor)
rotasCategorias.put('/:id', alterarCor)
rotasCategorias.delete('/:id', removerCor)

export = rotasCategorias