"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const rotas_categorias = (0, express_1.default)();
rotas_categorias.get('/', (req, res) => {
    res.json({ 'categoria': 'OK' });
});
module.exports = rotas_categorias;
