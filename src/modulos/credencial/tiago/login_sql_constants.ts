import { ISqlDados } from "../../../interfaces/sql_filtro"

export const sqlValidarLoginCredencial = (parametros: any): ISqlDados => {

    const email = parametros.username
    const pwd = btoa(parametros.pwd)

    return {
        sql: `
                select 
                    tc.id as idCredencial,
                    tc.name as nomeCredencial,
                    tc.id_profile as idPerfil,
                    tp.nome_perfil as nomePerfil,
                    tp.identificador as identificadorPerfil
                from tb_credencial tc
                inner join tb_perfil tp on tc.id_profile = tp.id
                where tc.email=$1::text and tc.password = $2::text
            `,
        valores: [
            email,
            pwd
        ]
    }
}