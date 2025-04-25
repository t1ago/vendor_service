"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const CategoriaControlador_1 = require("./CategoriaControlador");
const rotasCategorias = express_1.default.Router();
rotasCategorias.get('/', CategoriaControlador_1.buscarCategorias);
rotasCategorias.get('/:id', CategoriaControlador_1.buscarCategoria);
rotasCategorias.post('/', CategoriaControlador_1.criarCategoria);
rotasCategorias.put('/:id', CategoriaControlador_1.alterarCategoria);
rotasCategorias.delete('/:id', CategoriaControlador_1.removerCategoria);
module.exports = rotasCategorias;
//# sourceMappingURL=CategoriasRotas.js.map