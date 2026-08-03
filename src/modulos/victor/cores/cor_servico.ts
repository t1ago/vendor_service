import { processarDadosEmpty } from '../../../utils/utils';
import { servicoGenerico } from '../../../utils/victor/servico-generico';
import { CORES_SQL } from './cor_sql';

export const criarCorServico = async (cor: any) => {
    if (validarHex(cor.hexadecimal)) {
        const parametros = [cor.hexadecimal, cor.ativo];
        return servicoGenerico(CORES_SQL.INSERT, parametros);
    } else {
        return processarDadosEmpty('Erro: Hexadecimal invalido!');
    }
};

export const buscarCorServico = async (cor: any) => {
    if (cor) {
        const parametros = [cor.id];
        return servicoGenerico(CORES_SQL.SELECT_ID, parametros);
    } else {
        return servicoGenerico(CORES_SQL.SELECT_ALL);
    }
};

export const atualizarCorServico = async (cor: any) => {
    if (validarHex(cor.hexadecimal)) {
        const parametros = [cor.hexadecimal, cor.ativo, cor.id];

        return servicoGenerico(CORES_SQL.UPDATE, parametros);
    } else {
        return processarDadosEmpty('Erro: Hexadecimal invalido!');
    }
};

export const deletarCorServico = async (cor: any) => {
    const parametros = [cor.id];

    return servicoGenerico(CORES_SQL.DELETE, parametros);
};

const validarHex = (hex: string): boolean => {
    const regex = /^#([A-F a-f 0-9]{6}|[A-F a-f 0-9]{3})$/;
    return regex.test(hex);
};
