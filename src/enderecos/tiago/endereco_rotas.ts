import express from "express"
import { buscarEstados, buscarLocalidadeCep } from "./endereco_controlador"

const rotasEnderecoTiago = express.Router()

rotasEnderecoTiago.get('/estados', buscarEstados)
rotasEnderecoTiago.get('/localidade/:cep', buscarLocalidadeCep)

export = rotasEnderecoTiago