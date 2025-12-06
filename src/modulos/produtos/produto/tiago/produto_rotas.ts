import express from "express"
import { alterar, buscar, criar, remover } from "./produto_controlador"

const rotasProdutoTiago = express.Router()

rotasProdutoTiago.get('/', buscar)
rotasProdutoTiago.get('/:id', buscar)
rotasProdutoTiago.post('/', criar)
rotasProdutoTiago.put('/:id', alterar)
rotasProdutoTiago.delete('/:id', remover)

export = rotasProdutoTiago