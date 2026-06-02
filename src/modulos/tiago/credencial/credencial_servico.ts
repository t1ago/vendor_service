import axios from 'axios';
import { dbCliente, executarQuery } from '../../../utils/banco_dados';
import { IResultadoAPI } from '../../../interfaces/resultado_api';
import { sqlValidarCredencial as sqlValidarCredencialLogin } from './credencial_sql_constants';
import { processarDados, processarDadosEmpty } from '../../../utils/utils';
import { ERROR_MESSAGES } from '../../../utils/error_messages';
import jwt from 'jsonwebtoken';

const HOUR_IN_SECOND = 3600;

export const validarLoginCredencial = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        cliente.connect();

        const sqlDados = sqlValidarCredencialLogin(parametros);

        const queryResultado = await executarQuery(cliente, sqlDados);

        if (queryResultado.rows.length == 0) {
            resultado = processarDadosEmpty(ERROR_MESSAGES.CREDENCIAL_INVALIDA);
        } else {
            resultado = processarDados(() => {
                return gerarToken(queryResultado.rows[0]);
            });
        }
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
};

const gerarToken = (dadosUsuario: any) => {
    const SECRET_KEY = process.env.SECRET_KEY || '';
    const EXPIRES_IN = (process.env.EXPIRES_IN || 3600) as number;

    const token = jwt.sign(dadosUsuario, SECRET_KEY, {
        expiresIn: `${EXPIRES_IN / HOUR_IN_SECOND}h`,
    });

    return {
        token: token,
        expiresIn: Number(EXPIRES_IN),
    };
};
