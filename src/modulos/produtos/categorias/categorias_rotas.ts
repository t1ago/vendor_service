import express from "express"
import {
    buscarCategorias,
    buscarCategoria,
    alterarCategoria,
    criarCategoria,
    removerCategoria
} from "./categorias_controlador"
import { authenticadorInteceptador } from "../../../utils/utils_Miguel"

const rotasCategorias = express.Router()

rotasCategorias.get('/', authenticadorInteceptador, buscarCategorias)
rotasCategorias.get('/:id', authenticadorInteceptador, buscarCategoria)
rotasCategorias.post('/', authenticadorInteceptador, criarCategoria)
rotasCategorias.put('/:id', authenticadorInteceptador, alterarCategoria)
rotasCategorias.delete('/:id', authenticadorInteceptador, removerCategoria)

export = rotasCategorias