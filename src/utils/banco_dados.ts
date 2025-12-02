import { Client, Pool, PoolClient, QueryResult } from "pg";
import { ISqlDados } from "../interfaces/sql_filtro";

export const dbCliente = () => {
    const cliente = new Client({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });

    return cliente
}

export const dbPool = () => {
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });

    return pool
}

export const executarQuery = async (cliente: Client | PoolClient, sqlDados: ISqlDados) => {
    return await cliente.query(sqlDados.sql, sqlDados.valores)
}