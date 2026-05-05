import { IResultadoAPI } from "../../../interfaces/resultado_api"
import { dbCliente } from "../../../utils/banco_dados"
import jwt from "jsonwebtoken";

export const credencial_Select = async (credencial: any) => {

    const cliente = dbCliente()

    let resultado: IResultadoAPI = {
        executado: false,
        mensagem: "",
        data: []
    }


    const gerarToken = (dadosUsuario: any) => {

        const SECRET_KEY = 'Secret'

        const token = jwt.sign(dadosUsuario, SECRET_KEY, {
            expiresIn: '1h'
        });

        return token
    }

    try {
        cliente.connect()

        const SQL =
            `select 
                tc.id as idcredencial,
                tc.name as nomeCredencial,
                tc.id_profile as idPerfil,
                tp.nome_perfil as nomePerfil,
                tp.identificador as identicadorPerfil
            from tb_credencial tc
            inner join tb_perfil tp on tc.id_profile = tp.id
            where tc.email=$1::text and tc.password = $2::text`

        const parametros = [credencial.username, btoa(credencial.password)]

        console.log(credencial)
        console.log(parametros)

        const resultado_select = await cliente.query(SQL, parametros)


        if (resultado_select.rows.length == 0) {
            resultado.executado = true;
            resultado.mensagem = "Credencial invalida";
            resultado.data = {};

        } else {
            resultado.executado = true;
            resultado.mensagem = "";
            resultado.data = {
                token: gerarToken(resultado_select.rows[0]),
                expireIn: 3600
            };

        }

    }
    finally {
        await cliente.end()
    }

    return resultado

}