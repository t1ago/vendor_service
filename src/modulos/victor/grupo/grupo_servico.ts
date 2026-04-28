import { servicoGenerico } from "../../../utils/victor/servico-generico";
import { GRUPO_SQL } from "./grupo_sql"

export const inserirGrupoServico = async (grupo:any) => {
    const parametros = [grupo.nome];

    return await servicoGenerico(GRUPO_SQL.INSERT, parametros);
}


export const alterarGrupoServico = async (grupo: any) => {
    const parametros = [grupo.nome, grupo.id];

   return await servicoGenerico(GRUPO_SQL.UPDATE, parametros);
}


export const removerGrupoServico = async (grupo: any) => {
    const parametros = [grupo.id];

    return await servicoGenerico(GRUPO_SQL.DELETE, parametros);
}

export const buscarGrupoServico = async (grupo: any) => {
    const parametros = [grupo.id];

    return await servicoGenerico(GRUPO_SQL.SELECT_ID, parametros);
}

export const buscarGruposServico = async () => {
    return await servicoGenerico(GRUPO_SQL.SELECT_ALL);
}