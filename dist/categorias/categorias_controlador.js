"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarCategorias = exports.buscarCategoria = exports.removerCategoria = exports.alterarCategoria = exports.criarCategoria = void 0;
const categorias_servico_1 = require("./categorias_servico");
const criarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = {
        'nome': req.body.nome
    };
    const resultado = yield (0, categorias_servico_1.criarCategoriaServico)(categoria);
    if (resultado.mensagem == "") {
        res.json(resultado);
    }
    else {
        res.status(500).json(resultado);
    }
});
exports.criarCategoria = criarCategoria;
const alterarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = {
        'id': req.params.id,
        'nome': req.body.nome
    };
    const resultado = yield (0, categorias_servico_1.alterarCategoriaServico)(categoria);
    if (resultado.mensagem == "") {
        res.json(resultado);
    }
    else {
        res.status(500).json(resultado);
    }
});
exports.alterarCategoria = alterarCategoria;
const removerCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = {
        'id': req.params.id
    };
    const resultado = yield (0, categorias_servico_1.removerCategoriaServico)(categoria);
    if (resultado.mensagem == "") {
        res.json(resultado);
    }
    else {
        res.status(500).json(resultado);
    }
});
exports.removerCategoria = removerCategoria;
const buscarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = {
        'id': req.params.id
    };
    const resultado = yield (0, categorias_servico_1.buscarCategoriaServico)(categoria);
    if (resultado.mensagem == "") {
        res.json(resultado);
    }
    else {
        res.status(500).json(resultado);
    }
});
exports.buscarCategoria = buscarCategoria;
const buscarCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield (0, categorias_servico_1.buscarCategoriasServico)();
    if (resultado.mensagem == "") {
        res.json(resultado);
    }
    else {
        res.status(500).json(resultado);
    }
});
exports.buscarCategorias = buscarCategorias;
//# sourceMappingURL=categorias_controlador.js.map