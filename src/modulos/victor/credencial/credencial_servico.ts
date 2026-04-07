import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { dbCliente } from "../../../utils/banco_dados";
import jwt from 'jsonwebtoken';
import { Request } from "express";
import { limparResultado } from "../../../utils/victor/utils";

export const validar = async (parametros : any) => {
    const cliente = dbCliente();
    let results : IResultadoAPI = limparResultado();
    try {
        cliente.connect();

        const sql = `
        SELECT
            tc.id as idCredencial,
            tc.name as nomeCredencial,
            tc.email as emailCredencial,
            tp.nome_perfil as nomePerfil,
            tp.identificador
        FROM tb_credencial tc
        INNER JOIN tb_perfil tp on tc.id_profile = tp.id
        WHERE 
        tc.email = $1 :: text and tc.password = $2::text`;
        
        const params = [parametros.email,btoa(parametros.password)];

        const results_select = await cliente.query(sql,params);
        
        if(results_select.rows.length == 0) {
            results.mensagem = "Não autorizada";
        } else {
            results.executado = true;
            results.mensagem = "Autorizada";
            results.data = gerarToken(results_select.rows[0])
        }
    } catch (erro) {
        results.mensagem = `${erro}`;
    } finally {
        cliente.end();
    }
    return results;
}

const gerarToken = (dadosUsuario : any)  => {
    const SECRET_KEY = process.env.SECRET || "";

    const token = jwt.sign(dadosUsuario,SECRET_KEY,{
        expiresIn : '1h'
    });

    return token;
}

export const buscar = async (req : Request) => {
    const cliente = dbCliente();
    let results = limparResultado();
    try {
        cliente.connect();

        results.executado = true;

        results.mensagem = "Usuario retornado";

        results.data = (req as any).user;

    } 
    catch (erro) {
        results.mensagem = `${erro}`
    }
    finally {
        cliente.end()
    }
    return results
}