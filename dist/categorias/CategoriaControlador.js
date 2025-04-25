"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarCategorias = exports.buscarCategoria = exports.removerCategoria = exports.alterarCategoria = exports.criarCategoria = void 0;
const criarCategoria = (re, res) => {
    res.json({ 'criar_categoria': 'OK' });
};
exports.criarCategoria = criarCategoria;
const alterarCategoria = (re, res) => {
    res.json({ 'alterar_categoria': 'OK' });
};
exports.alterarCategoria = alterarCategoria;
const removerCategoria = (re, res) => {
    res.json({ 'remover_categoria': 'OK' });
};
exports.removerCategoria = removerCategoria;
const buscarCategoria = (re, res) => {
    res.json({ 'buscar_categoria': 'OK' });
};
exports.buscarCategoria = buscarCategoria;
const buscarCategorias = (re, res) => {
    res.json({ 'buscar_categorias': 'OK' });
};
exports.buscarCategorias = buscarCategorias;
//# sourceMappingURL=CategoriaControlador.js.map