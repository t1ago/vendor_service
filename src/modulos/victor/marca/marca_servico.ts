import { servicoGenerico } from "../../../utils/victor/servico-generico"
import { MARCA_SQL } from "./marca_sql";

export const inserirMarcaServico = async(marca: any) => {
    const parametros = [marca.nome]
    return await servicoGenerico(MARCA_SQL.INSERT,parametros);
}

export const buscarMarcaServico = async(marca:any) => {
    var sql : string = ''
    var parametro: any = null
    if(marca == null) {
        console.log("foi sem parametros")
        sql = MARCA_SQL.SELECT_ALL
    } else {
        if(marca.id) {
            console.log("Foi por id")
            sql = MARCA_SQL.SELECT_ID;
            parametro = [marca.id];
        } else {
            console.log("Foi por query")
            sql = MARCA_SQL.SELECT_QUERY;
            parametro = [`%${marca.nome}%`];
        } 
    }
    if (parametro != null) {
        return await servicoGenerico(sql,parametro);
    } else {
        return await servicoGenerico(sql)
    }
}

export const alterarMarcaServico = async(marca: any) => {
    const parametros = [marca.nome,marca.id]
    return await servicoGenerico(MARCA_SQL.UPDATE,parametros);
}

export const deletarMarcaServico = async(marca: any) => {
    const parametros = [marca.id]
    return await servicoGenerico(MARCA_SQL.DELETE,parametros);
}