import { dbCliente, executarQuery } from '../../../utils/banco_dados';
import { IResultadoAPI } from '../../../interfaces/resultado_api';
import { processarDados, processarDadosEmpty } from '../../../utils/utils';
import { ERROR_MESSAGES } from '../../../utils/error_messages';
import {
    sqlCriarCategoria,
    sqlAlterarCategoria,
    sqlBuscarCategoria,
    sqlBuscarTodasCategorias,
    sqlRemoverCategoria,
} from './categoria_sql_constants';

export const criarServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        await cliente.connect();

        const sqlDados = sqlCriarCategoria(parametros);
        const queryResultado = await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => ({ id: queryResultado.rows[0].id }));
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
};

export const alterarServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        await cliente.connect();

        const sqlDados = sqlAlterarCategoria(parametros);
        await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => ({ id: parametros.id }));
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
};

export const buscarServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        await cliente.connect();

        const sqlDados = sqlBuscarCategoria(parametros);
        const queryResultado = await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => (queryResultado.rowCount || 0) > 0 ? queryResultado.rows[0] : {});
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
};

export const buscarTodosServico = async () => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        await cliente.connect();

        const sqlDados = sqlBuscarTodasCategorias();
        const queryResultado = await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => queryResultado.rows);
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
};

export const removerServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        await cliente.connect();

        const sqlDados = sqlRemoverCategoria(parametros);
        await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => ({ id: parametros.id }));
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
};
