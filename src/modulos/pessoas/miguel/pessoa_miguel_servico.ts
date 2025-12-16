import { dbCliente, dbPool, executarQuery } from "../../../utils/banco_dados"
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { PoolClient, QueryResult } from 'pg';
import { alterarPessoa, buscarId, BuscarTodos, BuscarVinculos, criarEndereco, criarPessoa, EnderecosId, EnderecosId_Pessoa, inativarPessoa } from "./utils";
import { ISqlDados } from "../../../interfaces/sql_filtro"
import { processarDados } from "../../../utils/utils"

export const service_insert = async (pessoa: any) => {

    const pool = dbPool();
    let cliente = await pool.connect();
    const resultado: IResultadoAPI = { executado: false, mensagem: "", data: [] };

    try {
        await cliente.query('BEGIN');

        const sqlPessoa = criarPessoa(pessoa);
        const queryResultado = await executarQuery(cliente, sqlPessoa);

        const idPessoa = queryResultado.rows[0].id;

        if (pessoa.enderecos) {
            for (const endereco of pessoa.enderecos) {
                const sqlEndereco = criarEndereco(endereco, idPessoa);
                await executarQuery(cliente, sqlEndereco);
            }
        }

        await cliente.query('COMMIT');

        resultado.executado = true;
        resultado.mensagem = "Pessoa inserida com sucesso";
        resultado.data = [{ id: idPessoa }];

    } catch (erro: any) {
        await cliente.query('ROLLBACK');

        resultado.executado = false;
        resultado.mensagem = "Erro ao inserir pessoa: " + erro.message;

    } finally {
        cliente.release();
    }

    return resultado;
}


export const service_update = async (pessoa: any) => {

    const pool = dbPool();
    let cliente: PoolClient = await pool.connect();

    const resultado: IResultadoAPI = { executado: false, mensagem: "", data: [] };

    try {
        await cliente.query('BEGIN');

        const sqlDados = alterarPessoa(pessoa);

        await executarQuery(cliente, sqlDados);

        await cliente.query('COMMIT');

        resultado.executado = true;
        resultado.mensagem = "Pessoa atualizada com sucesso";
        resultado.data = [{ id: pessoa.id }];

    } catch (erro: any) {

        await cliente.query('ROLLBACK');

        resultado.executado = false;
        resultado.mensagem = "Erro ao atualizar pessoa: " + erro.message;

    } finally {
        cliente.release();
    }

    return resultado;
};

export const service_inativar = async (pessoa: any) => {

    const db_cliente = dbCliente();
    const resultado: IResultadoAPI = { executado: false, mensagem: "", data: [] };

    try {
        await db_cliente.connect()

        const sqlDados = inativarPessoa(pessoa);

        const resposta = await executarQuery(db_cliente, sqlDados);

        resultado.executado = true;
        resultado.mensagem = "Pessoa inativada com sucesso.";
        resultado.data = resposta.rows;

    } catch (erro: any) {

        resultado.executado = false;
        resultado.mensagem = "Erro ao inativar pessoa: " + erro.message;

    } finally {
        await db_cliente.end()
    }

    return resultado;
};

// Exemplo de adaptação no service_get (se você tiver uma separação por service)

// Dentro de pessoa_miguel_servico.ts
// ARQUIVO: pessoa_miguel_servico.ts
export const service_get = async (parametros: { id?: string, tipo_pessoa?: string, filtro?: string }): Promise<IResultadoAPI> => {
    let resultado: IResultadoAPI = { executado: false, mensagem: "", data: [] };
    const client = dbCliente(); // NÃO É NECESSÁRIO O AWAIT AQUI

    try {
        await client.connect(); // <--- CRÍTICO: Abre a conexão

        let sqlDados: ISqlDados;

        if (parametros.id) {
            sqlDados = buscarId({ id: parametros.id });
        } else if (parametros.tipo_pessoa) {
            sqlDados = BuscarTodos({
                tipo_pessoa: parametros.tipo_pessoa,
                filtro: parametros.filtro
            });
        } else {
            resultado.mensagem = "Parâmetros de busca insuficientes.";
            return resultado;
        }

        const res = await client.query(sqlDados.sql, sqlDados.valores);
        
        resultado.executado = true;
        resultado.data = res.rows;
        resultado.mensagem = "Pessoas listadas com sucesso.";

    } catch (error: any) {
        resultado.mensagem = "Erro ao buscar pessoas: " + error.message;
        console.error(error);
    } finally {
        // Garante que o cliente será encerrado
        await client.end(); 
    }
    return resultado;
}

export const service_Vinculos = async () => {
    const db_cliente = dbCliente();
    let resultado: IResultadoAPI = { executado: false, mensagem: "", data: [] };

    try {
        db_cliente.connect();

        const sql_data = BuscarVinculos();
        const resultado_dados = await executarQuery(db_cliente, sql_data);

        resultado = processarDados(() => {
            return resultado_dados.rows
        });
    } catch (erro: any) {
        resultado.executado = false;
        resultado.mensagem = "Erro ao vincular pessoa: " + erro.message;

    } finally {
        await db_cliente.end();
    }

    return resultado;
}

export const service_Endereco = async (pessoa: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI = { executado: false, mensagem: "", data: [] };

    try {
        cliente.connect();

        const sqlDados = EnderecosId(pessoa)
        const resultado_dados = await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => {
            return (resultado_dados.rowCount || 0) > 0 ? resultado_dados.rows[0] : {};
        });
    } catch (erro: any) {
        resultado.executado = false;
        resultado.mensagem = "Erro ao buscar endereco: " + erro.message;

    } finally {
        await cliente.end();
    }

    return resultado;
}
