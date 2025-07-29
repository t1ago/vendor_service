import express from "express"
import { alterar, buscar, criar, remover } from "././fornecedores_controlador"

const rotasFornecedoresTiago = express.Router()

rotasFornecedoresTiago.get('/', buscar)
rotasFornecedoresTiago.post('/', criar)
rotasFornecedoresTiago.put('/:id', alterar)
rotasFornecedoresTiago.delete('/:id', remover)

export = rotasFornecedoresTiago