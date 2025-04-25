 import { Client } from "pg";

export const db_cliente = () => { 
    const cliente = new Client({
        connectionString: process.env.CONNECTION_STRING,
        ssl: true
    });
    
    return cliente
}