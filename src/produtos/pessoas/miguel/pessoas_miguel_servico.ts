import { db_cliente } from "../../../../commons/banco_dados";
import { Resultado } from "../../../../commons/resultado_api";

interface pessoafisica {
  id?: string | number;
  nome: string;
  apelido?: string;
  tipo_pessoa: "F";
  sexo?: string;
  idade?: number;
  rg?: string;
  cpf?: string;
  ativo?: boolean;
  vinculo?: string;
}

export const service_insert = async (pessoas: pessoafisica) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect()

        const sql = "INSERT INTO tb_pessoa_miguel (nome, apelido, tipo_pessoa, sexo, idade, rg, cpf, ativo, vinculo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING ID"
        const parametros = [pessoas.nome, pessoas.apelido, pessoas.tipo_pessoa, pessoas.sexo, pessoas.idade, pessoas.rg, pessoas.cpf, pessoas.ativo, pessoas.vinculo]

        const resultado_insert = await cliente.query(sql, parametros)

        resultado.executado = true,
            resultado.mensagem = "",
            resultado.data = resultado_insert.rows
    } catch (erro) {
        resultado.executado = false,
            resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}

export const service_update = async (pessoa: pessoafisica) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect()

        const sql = "UPDATE tb_pessoa_miguel SET nome=$1, apelido=$2, tipo_pessoa=$3, sexo=$4, idade=$5, rg=$6, cpf=$7, ativo=$8, vinculo=$9 WHERE id=$10"
        const parametros = [pessoa.nome, pessoa.apelido, pessoa.tipo_pessoa, pessoa.sexo, pessoa.idade, pessoa.rg, pessoa.cpf, pessoa.ativo, pessoa.vinculo, pessoa.id]

        const resultado_update = await cliente.query(sql, parametros)

        resultado.executado = true,
            resultado.mensagem = "",
            resultado.data = resultado_update.rows

    } catch (erro) {
        resultado.executado = false,
            resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}

export const service_delete = async (pessoa: any) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect()

        const sql = "DELETE from tb_pessoa_miguel WHERE id=$1"
        const parametros = [pessoa.id]

        const resultado_delete = await cliente.query(sql, parametros)

        resultado.executado = true,
            resultado.mensagem = "",
            resultado.data = resultado_delete.rows
    } catch (erro) {
        resultado.executado = false,
            resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}

export const service_get = async (pessoa: pessoafisica) => {
    const cliente = db_cliente()
    const resultado: Resultado = { executado: false, mensagem: "", data: {} };

    try {
        await cliente.connect()

        let sql: string
        let parametros: any

        if (pessoa.id != null) {
            sql = "SELECT * FROM tb_pessoa_miguel WHERE id=$1"
            parametros = [pessoa.id]
        } else if (pessoa.nome != null || pessoa.apelido != null || pessoa.sexo != null || pessoa.rg != null || pessoa.cpf != null) {
            sql = 'SELECT * FROM tb_pessoa_miguel WHERE nome ILIKE $1 OR apelido ILIKE $2 OR sexo ILIKE $3 OR rg ILIKE $4 OR cpf ILIKE $5'
            parametros = [`%${pessoa.nome}%`, `%${pessoa.apelido}%`, `%${pessoa.sexo}%`, `%${pessoa.rg}%`, `%${pessoa.cpf}%`]
        } else {
            sql = "SELECT * FROM tb_pessoa_miguel"
            parametros = null
        }

        let queryResult
        if (parametros != null) {
            queryResult = await cliente.query(sql, parametros)
        } else {
            queryResult = await cliente.query(sql)
        }

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = queryResult.rows
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = "erro" + erro
        resultado.data = {}
    } finally {
        await cliente.end()
    }
    return resultado
}