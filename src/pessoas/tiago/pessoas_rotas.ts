import express from "express"
import { buscarVinculos, criar, buscar, inativar, buscarEndereco, alterar } from "./pessoas_controlador"

const rotasPessoasTiago = express.Router()


rotasPessoasTiago.post('/', criar)
rotasPessoasTiago.get('/vinculos', buscarVinculos)
rotasPessoasTiago.get('/', buscar)
rotasPessoasTiago.get('/:id', buscar)
rotasPessoasTiago.put('/inativar/:id', inativar)
rotasPessoasTiago.get('/enderecos/:id', buscarEndereco)
rotasPessoasTiago.put('/:id', alterar)

export = rotasPessoasTiago