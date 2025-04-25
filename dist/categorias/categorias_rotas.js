"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const categorias_controlador_1 = require("./categorias_controlador");
const rotasCategorias = express_1.default.Router();
rotasCategorias.get('/', categorias_controlador_1.buscarCategorias);
rotasCategorias.get('/:id', categorias_controlador_1.buscarCategoria);
rotasCategorias.post('/', categorias_controlador_1.criarCategoria);
rotasCategorias.put('/:id', categorias_controlador_1.alterarCategoria);
rotasCategorias.delete('/:id', categorias_controlador_1.removerCategoria);
module.exports = rotasCategorias;
//# sourceMappingURL=categorias_rotas.js.map