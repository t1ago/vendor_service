"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_client = void 0;
const pg_1 = require("pg");
const db_client = () => {
    const client = new pg_1.Client({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });
    return client;
};
exports.db_client = db_client;
//# sourceMappingURL=db.js.map