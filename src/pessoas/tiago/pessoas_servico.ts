import { QueryResult } from "pg"
import { db_cliente, db_pool } from "../../../commons/banco_dados"
import { Resultado } from "../../../commons/resultado_api"

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

const limparResultado = () => {
    resultado.executado = false,
        resultado.mensagem = "",
        resultado.data = {}
}

export const criarServico = async (parametros: any) => {
    const pool = db_pool()
    limparResultado()

    const cliente = await pool.connect()
    let sql = ''
    let valores = []
    let resultado_banco = null

    try {
        sql = `
                INSERT INTO tb_pessoa_tiago (
                    nome, 
                    apelido, 
                    tipo_pessoa, 
                    sexo, 
                    data_inicio, 
                    documento_estadual, 
                    documento_federeal, 
                    id_vinculo, 
                    ativo
                ) values (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9
                ) RETURNING id;
            `

        let dataInicio = undefined

        if (parametros.dataInicio != undefined) {
            let dateInput = parametros.dataInicio
            let dateArray = dateInput.split("/");

            const day = dateArray[0].padStart(2, '0');
            const month = dateArray[1].padStart(2, '0');
            const year = dateArray[2];

            dataInicio = `${year}-${month}-${day} 00:00:00`
        }

        valores = [
            parametros.nome,
            parametros.apelido,
            parametros.tipoPessoa,
            parametros.sexo,
            dataInicio,
            parametros.documentoEstadual,
            parametros.documentoFedereal,
            parametros.idVinculo,
            parametros.ativo]

        await cliente.query('BEGIN');

        resultado_banco = await cliente.query(sql, valores)
        const idPessoa = resultado_banco.rows[0].id

        for (let index = 0; index < parametros.enderecos.length; index++) {
            const endereco = parametros.enderecos[index];

            sql = `
                    INSERT INTO tb_endereco_pessoa_tiago (
                        id_pessoa, 
                        cep, 
                        logradouro, 
                        numero, 
                        bairro, 
                        cidade, 
                        estado, 
                        tipo_endereco,
                        buscado_por_cep, 
                        ativo
                    ) values (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                    );
                `

            valores = [
                idPessoa,
                endereco.cep,
                endereco.logradouro,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.estado,
                endereco.tipoEndereco,
                endereco.buscadoPorCep ? 'S' : 'N',
                endereco.ativo]

            await cliente.query(sql, valores)
        }

        await cliente.query('COMMIT');

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = {
            'id': idPessoa
        }

    } catch (erro) {
        await cliente.query('ROLLBACK');
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`

    } finally {
        cliente.release();
    }

    return resultado
}

export const buscarVinculosServico = async (parametros?: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = `
                SELECT tp.id, tp.nome 
                FROM tb_pessoa_tiago tp 
                WHERE tp.ativo = 'A' AND tp.tipo_pessoa = 'J'
            `

        const resultado_banco = await cliente.query(sql)

        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = executed ? resultado_banco.rows : []
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const buscarServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()
        let parametros_busca: any
        let resultado_banco: QueryResult<any>

        if (parametros.id != null) {
            parametros_busca = buscarPorId(parametros)
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
            const executedPessoa = (resultado_banco.rowCount || 0) > 0

            let data = null
            if (executedPessoa) {
                data = resultado_banco.rows[0]
            }

            parametros_busca = buscarEnderecosPorIdPessoa(parametros)
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
            const executedEndereco = (resultado_banco.rowCount || 0) > 0

            data['enderecos'] = executedEndereco ? resultado_banco.rows : []

            resultado.data = data

        } else if (parametros.termo != null) {
            parametros_busca = buscarPorTermo(parametros)
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
            const executed = (resultado_banco.rowCount || 0) > 0
            resultado.data = executed ? resultado_banco.rows : []
        } else {
            parametros_busca = buscarTodos(parametros)
            resultado_banco = await cliente.query(parametros_busca.sql, parametros_busca.valores)
            const executed = (resultado_banco.rowCount || 0) > 0
            resultado.data = executed ? resultado_banco.rows : []
        }

        resultado.executado = true
        resultado.mensagem = ""
    } catch (erro) {
        resultado.executado = false
        resultado.data = {}
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const inativarServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()

        const sql = `
            UPDATE tb_pessoa_tiago 
                SET ativo=$1
                WHERE id=$2
        `
        const valores = ['I', parametros.id]

        const resultado_banco = await cliente.query(sql, valores)
        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = executed
        resultado.mensagem = ""
        resultado.data = executed ? parametros : {}

    } catch (erro) {
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const buscarEnderecoServico = async (parametros: any) => {
    const cliente = db_cliente()
    limparResultado()

    try {
        cliente.connect()
        const sql = `
            SELECT 
                tb_end.cep,
                tb_end.logradouro,
                tb_end.numero,
                tb_end.bairro,
                tb_end.cidade,
                tb_end.estado
            FROM tb_endereco_pessoa_tiago tb_end
            WHERE tb_end.id=$1
        `
        const valores = [parametros.id]

        const resultado_banco = await cliente.query(sql, valores)

        const executed = (resultado_banco.rowCount || 0) > 0

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = executed ? resultado_banco.rows[0] : {}
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`
    } finally {
        await cliente.end();
    }

    return resultado
}

export const alterarServico = async (parametros: any) => {
    const pool = db_pool()
    limparResultado()

    const cliente = await pool.connect()
    let sql = ''
    let valores = []
    let resultado_banco = null

    try {
        sql = `
                UPDATE tb_pessoa_tiago 
                    SET nome=$1, 
                        apelido=$2, 
                        tipo_pessoa=$3, 
                        sexo=$4, 
                        data_inicio=$5, 
                        documento_estadual=$6, 
                        documento_federeal=$7, 
                        id_vinculo=$8, 
                        ativo=$9
                WHERE id=$10
            `


        let dataInicio = undefined

        if (parametros.dataInicio != undefined) {
            let dateInput = parametros.dataInicio
            let dateArray = dateInput.split("/");

            const day = dateArray[0].padStart(2, '0');
            const month = dateArray[1].padStart(2, '0');
            const year = dateArray[2];

            dataInicio = `${year}-${month}-${day} 00:00:00`
        }

        valores = [
            parametros.nome,
            parametros.apelido,
            parametros.tipoPessoa,
            parametros.sexo,
            dataInicio,
            parametros.documentoEstadual,
            parametros.documentoFedereal,
            parametros.idVinculo,
            parametros.ativo ? 'A' : 'I',
            parametros.id
        ]

        await cliente.query('BEGIN');
        await cliente.query(sql, valores)

        for (let index = 0; index < parametros.enderecos.length; index++) {
            const endereco = parametros.enderecos[index];

            if (endereco.id == undefined) {
                sql = `
                    INSERT INTO tb_endereco_pessoa_tiago (
                        id_pessoa, 
                        cep, 
                        logradouro, 
                        numero, 
                        bairro, 
                        cidade, 
                        estado, 
                        tipo_endereco,
                        buscado_por_cep, 
                        ativo
                    ) values (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                    );
                `

                valores = [
                    parametros.id,
                    endereco.cep,
                    endereco.logradouro,
                    endereco.numero,
                    endereco.bairro,
                    endereco.cidade,
                    endereco.estado,
                    endereco.tipoEndereco,
                    endereco.buscadoPorCep ? 'S' : 'N',
                    endereco.ativo]
            } else {
                sql = `
                    UPDATE tb_endereco_pessoa_tiago
                        SET cep=$1, 
                            logradouro=$2, 
                            numero=$3, 
                            bairro=$4, 
                            cidade=$5, 
                            estado=$6, 
                            tipo_endereco=$7,
                            buscado_por_cep=$8, 
                            ativo=$9
                    WHERE id=$10 AND id_pessoa=$11
                `

                valores = [
                    endereco.cep,
                    endereco.logradouro,
                    endereco.numero,
                    endereco.bairro,
                    endereco.cidade,
                    endereco.estado,
                    endereco.tipoEndereco,
                    endereco.buscadoPorCep ? 'S' : 'N',
                    endereco.ativo,
                    endereco.id,
                    parametros.id]
            }

            await cliente.query(sql, valores)
        }

        await cliente.query('COMMIT');

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = {
            'id': parametros.id
        }

    } catch (erro) {
        await cliente.query('ROLLBACK');
        resultado.mensagem = `Erro de execução no banco de dados. MSG: ${erro}`

    } finally {
        cliente.release();
    }

    return resultado
}

const buscarPorId = (parametros: any) => {
    return {
        sql: `
             SELECT 
                tb_pessoa.id,
                tb_pessoa.nome,
                tb_pessoa.apelido,
                tb_pessoa.tipo_pessoa,
                tb_pessoa.sexo,
                tb_pessoa.data_inicio,
                tb_pessoa.documento_estadual,
                tb_pessoa.documento_federeal,
                tb_pessoa.id_vinculo,
                tb_pessoa.ativo
            FROM tb_pessoa_tiago tb_pessoa
            WHERE tb_pessoa.id=$1
            ORDER BY tb_pessoa.nome
        `,
        valores: [parametros.id]
    }
}

const buscarTodos = (parametros: any) => {
    return {
        sql: `
            SELECT 
                tb_pessoa.id,
                tb_pessoa.nome,
                tb_pessoa.apelido,
                tb_pessoa.tipo_pessoa,
                tb_pessoa.sexo,
                tb_pessoa.data_inicio,
                tb_pessoa.documento_estadual,
                tb_pessoa.documento_federeal,
                tb_pessoa.id_vinculo,
                tb_pessoa.ativo,
                tb_vinculo.nome as nome_vinculo,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'M') as id_moradia,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'C') as id_cobranca,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'E') as id_entrega
            FROM tb_pessoa_tiago tb_pessoa
            LEFT JOIN tb_pessoa_tiago tb_vinculo on tb_vinculo.id = tb_pessoa.id_vinculo
            WHERE tb_pessoa.tipo_pessoa=$1
            ORDER BY tb_pessoa.nome
        `,
        valores: [parametros.tipo_pessoa]
    }
}

const buscarPorTermo = (parametros: any) => {
    return {
        sql: `
            SELECT 
                tb_pessoa.id,
                tb_pessoa.nome,
                tb_pessoa.apelido,
                tb_pessoa.tipo_pessoa,
                tb_pessoa.sexo,
                tb_pessoa.data_inicio,
                tb_pessoa.documento_estadual,
                tb_pessoa.documento_federeal,
                tb_pessoa.id_vinculo,
                tb_pessoa.ativo,
                tb_vinculo.nome as nome_vinculo,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'M') as id_moradia,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'C') as id_cobranca,
                (SELECT tb_end.id FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'E') as id_entrega
            FROM tb_pessoa_tiago tb_pessoa
            LEFT JOIN tb_pessoa_tiago tb_vinculo on tb_vinculo.id = tb_pessoa.id_vinculo
            WHERE tb_pessoa.tipo_pessoa=$1
            AND (lower(tb_pessoa.nome) LIKE lower(concat('%', $2::text, '%'))
            OR lower(tb_pessoa.apelido) LIKE lower(concat('%', $2::text, '%'))
            OR lower(tb_pessoa.documento_estadual) LIKE lower(concat('%', $2::text, '%'))
            OR lower(tb_pessoa.documento_federeal) LIKE lower(concat('%', $2::text, '%'))
            OR ((SELECT lower(tb_end.cep || tb_end.logradouro || tb_end.numero || tb_end.bairro || tb_end.cidade || tb_end.estado) FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'M') LIKE lower(concat('%', $2::text, '%'))
            OR (SELECT lower(tb_end.cep || tb_end.logradouro || tb_end.numero || tb_end.bairro || tb_end.cidade || tb_end.estado) FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'C') LIKE lower(concat('%', $2::text, '%'))
            OR (SELECT lower(tb_end.cep || tb_end.logradouro || tb_end.numero || tb_end.bairro || tb_end.cidade || tb_end.estado) FROM tb_endereco_pessoa_tiago tb_end WHERE tb_end.id_pessoa = tb_pessoa.id and tb_end.tipo_endereco = 'E') LIKE lower(concat('%', $2::text, '%'))))
            ORDER BY tb_pessoa.nome
        `,
        valores: [parametros.tipo_pessoa, parametros.termo]
    }
}

const buscarEnderecosPorIdPessoa = (parametros: any) => {
    return {
        sql: `
             SELECT 
                tb_end.id,
                tb_end.cep,
                tb_end.logradouro,
                tb_end.numero,
                tb_end.bairro,
                tb_end.cidade,
                tb_end.estado,
                tb_end.tipo_endereco,
                tb_end.buscado_por_cep,
                tb_end.ativo
            FROM tb_endereco_pessoa_tiago tb_end
            WHERE tb_end.id_pessoa=$1
        `,
        valores: [parametros.id]
    }
}
