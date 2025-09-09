import { Resultado_all } from "./moedas_resultado";



export const moedaInsert = async (moeda: any) => {

    try {
        const sql = 'INSERT INTO tb_moeda (nome, moeda) VALUES ($1, $2) RETURNING id'
        const parametros = [moeda.nome, moeda.moeda]
        const resultado_insert = await Resultado_all(sql, parametros)

        return resultado_insert
    } finally {

    }
}

export const moedaUpdate = async (moeda: any) => {

    try {
        const sql = 'UPDATE tb_moeda SET nome=$1, moeda=$2 WHERE id=$3'
        const parametros = [moeda.nome, moeda.moeda, moeda.id]
        const resultado_insert = await Resultado_all(sql, parametros)

        return resultado_insert
    } finally {

    }
}

export const moedaDelete = async (moeda: any) => {

    try {
        const sql = 'DELETE FROM tb_moeda WHERE id=$1'
        const parametros = [moeda.id]
        const resultado_insert = await Resultado_all(sql, parametros)

        return resultado_insert
    } finally {

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
    } finally {

    }

}