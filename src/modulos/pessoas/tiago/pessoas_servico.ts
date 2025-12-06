import { PoolClient, QueryResult } from "pg"
import { dbCliente, dbPool, executarQuery } from "../../../utils/banco_dados"
import { IResultadoAPI } from "../../../interfaces/resultado_api"
import {
    sqlAlterarEndereco,
    sqlAlterarPessoa,
    sqlBuscarEnderecosPorId,
    sqlBuscarEnderecosPorIdPessoa,
    sqlBuscarPorId,
    sqlBuscarPorTermo,
    sqlBuscarTodos,
    sqlBuscarVinculos,
    sqlCriarEndereco,
    sqlCriarPessoa,
    sqlInativarPessoa
} from "./pessoas_sql_constants"
import { processarDados, processarDadosEmpty } from "../../../utils/utils"
import { ERROR_MESSAGES } from "../../../utils/error_messages"
import { ISqlDados } from "../../../interfaces/sql_filtro"

export const buscarVinculosServico = async () => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        cliente.connect();

        const sqlDados = sqlBuscarVinculos();
        const queryResultado = await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => {
            return queryResultado.rows
        });
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
}

export const criarServico = async (parametros: any) => {
    const pool = dbPool();

    let cliente: PoolClient = await pool.connect();
    let resultado: IResultadoAPI;
    let sqlDados: ISqlDados;
    let queryResultado: QueryResult<any>;
    let idPessoa: number;

    try {
        await cliente.query('BEGIN');

        sqlDados = sqlCriarPessoa(parametros);
        queryResultado = await executarQuery(cliente, sqlDados);
        idPessoa = queryResultado.rows[0].id;

        for (let index = 0; index < parametros.enderecos.length; index++) {
            const endereco = parametros.enderecos[index];
            endereco['idPessoa'] = idPessoa;

            sqlDados = sqlCriarEndereco(endereco);
            await executarQuery(cliente, sqlDados);
        }

        await cliente.query('COMMIT');

        resultado = processarDados(() => {
            return {
                id: idPessoa
            }
        });

    } catch (erro: any) {
        await cliente.query('ROLLBACK');
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));

    } finally {
        cliente.release();
    }

    return resultado;
}

export const alterarServico = async (parametros: any) => {
    const pool = dbPool();

    let cliente: PoolClient = await pool.connect();
    let resultado: IResultadoAPI;
    let sqlDados: ISqlDados;
    let queryResultado: QueryResult<any>;
    const idPessoa: number = parametros.id;

    try {
        await cliente.query('BEGIN');

        sqlDados = sqlAlterarPessoa(parametros);
        queryResultado = await executarQuery(cliente, sqlDados);

        for (let index = 0; index < parametros.enderecos.length; index++) {
            const endereco = parametros.enderecos[index];
            endereco['idPessoa'] = idPessoa;

            if (endereco.id == undefined) {
                sqlDados = sqlCriarEndereco(endereco);
                await executarQuery(cliente, sqlDados);
            } else {
                sqlDados = sqlAlterarEndereco(endereco);
                await executarQuery(cliente, sqlDados);
            }
        }

        await cliente.query('COMMIT');

        resultado = processarDados(() => {
            return {
                id: idPessoa
            }
        });

    } catch (erro: any) {
        await cliente.query('ROLLBACK');
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));

    } finally {
        cliente.release();
    }

    return resultado;
}

export const inativarServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        cliente.connect();

        const sqlDados = sqlInativarPessoa(parametros);
        await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => {
            return parametros
        });
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
}

export const buscarServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;
    let sqlDados: ISqlDados;
    let queryResultado: QueryResult<any>;

    try {
        cliente.connect();

        if (parametros.id != null) {
            sqlDados = sqlBuscarPorId(parametros);
            queryResultado = await executarQuery(cliente, sqlDados);

            const dataPessoa = (queryResultado.rowCount || 0) > 0 ? queryResultado.rows[0] : {};

            sqlDados = sqlBuscarEnderecosPorIdPessoa(parametros);
            queryResultado = await executarQuery(cliente, sqlDados);

            const dataEnderecos = (queryResultado.rowCount || 0) > 0 ? queryResultado.rows : [];

            resultado = processarDados(() => {
                dataPessoa['enderecos'] = dataEnderecos
                return dataPessoa
            });

        } else if (parametros.termo != null) {
            sqlDados = sqlBuscarPorTermo(parametros);
            queryResultado = await executarQuery(cliente, sqlDados);

            resultado = processarDados(() => {
                return (queryResultado.rowCount || 0) > 0 ? queryResultado.rows : []
            });

        } else {
            sqlDados = sqlBuscarTodos(parametros);
            queryResultado = await executarQuery(cliente, sqlDados);

            resultado = processarDados(() => {
                return (queryResultado.rowCount || 0) > 0 ? queryResultado.rows : []
            });
        }

    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
}

export const buscarEnderecoServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        cliente.connect();

        const sqlDados = sqlBuscarEnderecosPorId(parametros)
        const queryResultado = await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => {
            return (queryResultado.rowCount || 0) > 0 ? queryResultado.rows[0] : {};
        });
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
}





