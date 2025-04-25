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
exports.buscarCategoriasServico = exports.buscarCategoriaServico = exports.removerCategoriaServico = exports.alterarCategoriaServico = exports.criarCategoriaServico = void 0;
const banco_dados_1 = require("../commons/banco_dados");
const resultado = {
    executado: false,
    mensagem: "",
    data: {}
};
const limparResultado = () => {
    resultado.executado = false,
        resultado.mensagem = "",
        resultado.data = {};
};
const criarCategoriaServico = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = (0, banco_dados_1.db_cliente)();
    limparResultado();
    try {
        cliente.connect();
        const sql = "INSERT INTO tb_categorias (nome) values ($1) RETURNING id;";
        const valores = [categoria.nome];
        const resultado_banco = yield cliente.query(sql, valores);
        resultado.executado = (resultado_banco.rowCount || 0) > 0;
        resultado.mensagem = "";
        resultado.data = {
            'id': resultado_banco.rows[0].id
        };
    }
    catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`;
    }
    finally {
        yield cliente.end();
    }
    return resultado;
});
exports.criarCategoriaServico = criarCategoriaServico;
const alterarCategoriaServico = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = (0, banco_dados_1.db_cliente)();
    limparResultado();
    try {
        cliente.connect();
        const sql = "UPDATE tb_categorias SET nome=$1 WHERE id=$2;";
        const valores = [categoria.nome, categoria.id];
        const resultado_banco = yield cliente.query(sql, valores);
        resultado.executado = (resultado_banco.rowCount || 0) > 0;
        resultado.mensagem = "";
        resultado.data = categoria;
    }
    catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`;
    }
    finally {
        yield cliente.end();
    }
    return resultado;
});
exports.alterarCategoriaServico = alterarCategoriaServico;
const removerCategoriaServico = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = (0, banco_dados_1.db_cliente)();
    limparResultado();
    try {
        cliente.connect();
        const sql = "DELETE FROM tb_categorias WHERE id=$1;";
        const valores = [categoria.id];
        const resultado_banco = yield cliente.query(sql, valores);
        resultado.executado = (resultado_banco.rowCount || 0) > 0;
        resultado.mensagem = "";
        resultado.data = {
            'id': categoria.id
        };
    }
    catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`;
    }
    finally {
        yield cliente.end();
    }
    return resultado;
});
exports.removerCategoriaServico = removerCategoriaServico;
const buscarCategoriaServico = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = (0, banco_dados_1.db_cliente)();
    limparResultado();
    try {
        cliente.connect();
        const sql = "SELECT * FROM tb_categorias WHERE id=$1;";
        const valores = [categoria.id];
        const resultado_banco = yield cliente.query(sql, valores);
        resultado.executado = (resultado_banco.rowCount || 0) > 0;
        resultado.mensagem = "";
        resultado.data = [
            {
                'id': resultado_banco.rows[0].id,
                'nome': resultado_banco.rows[0].nome
            }
        ];
    }
    catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`;
    }
    finally {
        yield cliente.end();
    }
    return resultado;
});
exports.buscarCategoriaServico = buscarCategoriaServico;
const buscarCategoriasServico = () => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = (0, banco_dados_1.db_cliente)();
    limparResultado();
    try {
        cliente.connect();
        const sql = "SELECT * FROM tb_categorias;";
        const resultado_banco = yield cliente.query(sql);
        resultado.executado = (resultado_banco.rowCount || 0) > 0;
        resultado.mensagem = "";
        resultado.data = [];
        resultado_banco.rows.forEach(item => {
            resultado.data.push({
                'id': item.id,
                'nome': item.nome
            });
        });
    }
    catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`;
    }
    finally {
        yield cliente.end();
    }
    return resultado;
});
exports.buscarCategoriasServico = buscarCategoriasServico;
//# sourceMappingURL=categorias_servico.js.map