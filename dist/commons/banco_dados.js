"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_cliente = void 0;
const pg_1 = require("pg");
const db_cliente = () => {
    const cliente = new pg_1.Client({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });
    return cliente;
};
exports.db_cliente = db_cliente;
//# sourceMappingURL=banco_dados.js.map