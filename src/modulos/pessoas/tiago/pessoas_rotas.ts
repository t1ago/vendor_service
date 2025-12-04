import express from "express"
import { buscarVinculos, criar, buscar, inativar, buscarEndereco, alterar } from "./pessoas_controlador"

const rotasPessoasTiago = express.Router()

rotasPessoasTiago.get('/vinculos', buscarVinculos)
rotasPessoasTiago.post('/', criar)
rotasPessoasTiago.put('/:id', alterar)
rotasPessoasTiago.put('/inativar/:id', inativar)
rotasPessoasTiago.get('/', buscar)
rotasPessoasTiago.get('/:id', buscar)
rotasPessoasTiago.get('/enderecos/:id', buscarEndereco)

export = rotasPessoasTiago