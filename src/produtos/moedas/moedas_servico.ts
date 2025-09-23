import { Resultado_all } from "./moedas_resultado";

export const moedainsert = async (moeda: any) => {
    try {
        const sql = 'Insert into tb_moeda (nome, moeda) Values ($1, $2) Returning id'
        const parametros = [moeda.nome, moeda.moeda]
        const resultado_insert = await Resultado_all(sql, parametros)
        return resultado_insert
    } catch (error) {
        throw error
    }
}
export const moedaUpdate = async (moeda: any) => {
    try {
        // CORREÇÃO: A ordem dos parâmetros foi ajustada para corresponder ao SQL
        const sql = 'UPDATE tb_moeda SET nome=$1, moeda=$2 WHERE id=$3'
        const parametros = [moeda.nome, moeda.moeda, moeda.id]
        const resultado_insert = await Resultado_all(sql, parametros)
        return resultado_insert
    } catch (error) {
        throw error
    }
}
export const moedaDelete = async (moeda: any) => {
    try {
        const sql = 'DELETE FROM tb_moeda WHERE id=$1'
        const parametros = [moeda.id]
        const resultado_insert = await Resultado_all(sql, parametros)
        return resultado_insert
    } catch (error) {
        throw error
    }
}
export const moedaBuscar = async (moeda: any) => {
    try {
        let sql: string
        let parametros: any

        if (moeda.id != null) {
            sql = "SELECT * FROM tb_moeda WHERE id=$1"
            parametros = [moeda.id]
        } else if (moeda.nome != null || moeda.moeda != null) {
            sql = 'SELECT * FROM tb_moeda WHERE nome ILIKE $1 OR moeda ILIKE $2'
            // CORREÇÃO: Sintaxe correta para busca com LIKE
            parametros = [`%${moeda.nome}%`, `%${moeda.moeda}%`]
        } else {
            sql = "SELECT * FROM tb_moeda"
            parametros = null
        }

        if (parametros != null) {
            const resultado = await Resultado_all(sql, parametros)
            return resultado
        } else {
            const resultado_sql = await Resultado_all(sql)
            return resultado_sql
        }
    } catch (error) {
       
    }
}       
    
