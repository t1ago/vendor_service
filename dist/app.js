"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const categorias_rotas_1 = __importDefault(require("./categorias/categorias_rotas"));
/** Constantes do Servidor*/
const app = (0, express_1.default)();
const port = process.env.API_PORT || 3000;
/** Configuração do Servidor */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
/** Criação de Rotas */
app.get("/", (req, res) => {
    res.json({ 'status': 'OK' });
});
app.use("/categorias", categorias_rotas_1.default);
/** Inicia o Servidor */
app.listen(port, () => {
    console.log(`Vendor Service (estudos) listen on PORT: ${port}`);
});
//# sourceMappingURL=app.js.map