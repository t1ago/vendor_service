import express from "express"
import { buscarVinculos, criar } from "./pessoas_controlador"

const rotasPessoasTiago = express.Router()


rotasPessoasTiago.post('/', criar)
rotasPessoasTiago.get('/vinculos', buscarVinculos)
// rotasPessoasTiago.get('/', buscar)
// rotasPessoasTiago.get('/:id', buscar)

// rotasPessoasTiago.put('/:id', alterar)
// rotasPessoasTiago.delete('/:id', remover)

export = rotasPessoasTiago