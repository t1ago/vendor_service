import { Client, Pool } from "pg";

export const db_cliente = () => {
    const cliente = new Client({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });

    return cliente
}

export const db_pool = () => {
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });

    return pool
}