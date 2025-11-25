import { Client } from "pg";

export const db_cliente = () => {
    const cliente = new Client({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });

    return cliente
}

import { Pool } from "pg";

    const dbpool = new Pool({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
});

export const db = dbpool