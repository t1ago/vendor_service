import express from "express"
import { alterar, buscarid, buscarTudo, criar, listarFornecedor, remover } from "./fornecedores_controlador"

const rotasFornecedoresDam = express.Router()
rotasFornecedoresDam.post('/', criar)
rotasFornecedoresDam.get('/', listarFornecedor)
rotasFornecedoresDam.delete('/:id', remover)
rotasFornecedoresDam.put('/:id', alterar)
rotasFornecedoresDam.get('/:id', buscarid)
rotasFornecedoresDam.get('/:termo', buscarTudo)

export = rotasFornecedoresDam