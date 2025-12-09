import { dbCliente,dbPool,executarQuery } from "../../../utils/banco_dados";
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { limparResultadoAPI,processarDados,processarDadosEmpty } from "../../../utils/utils";
import { 
    criarPessoaSql,
    criarEnderecoSql,
    atualizarEnderecoSql,
    atualizarInativarSql,
    atualizarPessoaSql,
    buscarVinculoSql,
    buscarPessoaIdSql,
    buscarEnderecosIdPessoaSql,
    buscarPessoaSql,
    buscarEnderecosIdSql,
} from "./pesssoas_sql";
import { ERROR_MESSAGES } from "../../../utils/error_messages";
import { ISqlDados } from "../../../interfaces/sql_filtro";

let resultado : IResultadoAPI = {
    executado: true,
    mensagem: "",
    data: []
}
export const servicoCriar = async(lista:any) => {
    const pool = dbPool();
    let cliente = await pool.connect();
    limparResultadoAPI(resultado);
    try{
        await cliente.query('BEGIN');
        let sql_pessoa = criarPessoaSql(lista);
        const resultado_insert_pessoa = await executarQuery(cliente,sql_pessoa);
        let id_pessoa = resultado_insert_pessoa.rows[0].id_pessoa;

        for(let i = 0; i<lista.enderecos.length ; i++){
            let endereco = lista.enderecos[i];
            endereco['id_pessoa'] = id_pessoa;

            if(endereco.id_endereco == undefined) {
                let sql_endereco_criar = criarEnderecoSql(endereco);
                await executarQuery(cliente,sql_endereco_criar);
            } else {
                let sql_endereco_atualizar = atualizarEnderecoSql(endereco);
                await executarQuery(cliente,sql_endereco_atualizar);
            }
        }

        await cliente.query('COMMIT');
        resultado = processarDados(() => {
            return{
                id : id_pessoa
            }  
        });
    } catch(erro:any) {
        await cliente.query('ROLLBACK');
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        cliente.release();
    }
    return resultado;
}
export const servicoAtualizar = async(lista:any) => {
    const pool = dbPool();
    let cliente = await pool.connect();
    limparResultadoAPI(resultado);
    try{
        await cliente.query('BEGIN');
        let sql_pessoa = atualizarPessoaSql(lista);
        await executarQuery(cliente,sql_pessoa);
        let id_pessoa = lista.id_pessoa

        for(let i = 0; i<lista.enderecos.length ; i++){
            let endereco = lista.enderecos[i];
            endereco['id_pessoa'] = id_pessoa;

            if(endereco.id_endereco == undefined) {
                let sql_endereco_criar = criarEnderecoSql(endereco);
                await executarQuery(cliente,sql_endereco_criar);
            } else {
                let sql_endereco_atualizar = atualizarEnderecoSql(endereco);
                await executarQuery(cliente,sql_endereco_atualizar);
            }
        }

        await cliente.query('COMMIT');
        resultado = processarDados(() => {
            return{
                id : id_pessoa
            }  
        });
    } catch(erro:any) {
        await cliente.query('ROLLBACK');
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        cliente.release();
    }
    return resultado;
}
export const servicoInativar = async(lista:any) => {
    const cliente = dbCliente();
    try {
        await cliente.connect();
        let sql_inativar = atualizarInativarSql(lista);
        await executarQuery(cliente,sql_inativar);
        resultado = processarDados(()=>{
            return lista
        });
    } catch(erro:any){
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        cliente.end();
    }
    return resultado;
}

export const servicoBuscarVinculos = async() => {
    const cliente = dbCliente();
    try{
        await cliente.connect();
        let sql_buscar_vinculos = buscarVinculoSql();
        const resultado_select_vinculos = await executarQuery(cliente,sql_buscar_vinculos);

        resultado = processarDados(()=>{
            return resultado_select_vinculos.rows
        });
    } catch(erro:any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    }finally {
        cliente.end();
    }
    return resultado;
}

export const servicoBuscar = async(lista:any) => {
    const cliente = dbCliente();
    let sql_buscar : ISqlDados;
    try{
        await cliente.connect();
        if(lista.id_pessoa != undefined) {
            sql_buscar = buscarPessoaIdSql(lista);
            const resultado_select_id = await executarQuery(cliente,sql_buscar);

            const info_pessoa = (resultado_select_id.rowCount || 0) > 0 ? resultado_select_id.rows[0] : {};

            sql_buscar = buscarEnderecosIdPessoaSql(lista);

            const resultado_select_endereco = await executarQuery(cliente,sql_buscar);
            
            const info_endereco = (resultado_select_endereco.rowCount || 0) > 0 ? resultado_select_endereco.rows : {};
            resultado = processarDados(()=>{
                info_pessoa['enderecos'] = info_endereco;
                return info_pessoa;
            });
        } else {
            sql_buscar = buscarPessoaSql(lista);
            const resultado_select = await executarQuery(cliente,sql_buscar);
            resultado = processarDados(()=>{
                return (resultado_select.rowCount || 0) > 0 ? resultado_select.rows : {};
            })
        }
    } catch(erro: any){
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        cliente.end();
    }
    return resultado;
}

export const servicoBuscarEnderecos = async(lista:any) => {
    const cliente = dbCliente();
    try {
        await cliente.connect();
        let sql_buscar_enderecos = buscarEnderecosIdSql(lista);
        const resultado_select_endereco_id = await executarQuery(cliente,sql_buscar_enderecos);


        resultado = processarDados(()=>{
                return (resultado_select_endereco_id.rowCount || 0) > 0 ? resultado_select_endereco_id.rows : {};
            });
    } catch(erro:any) {
         resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        cliente.end();
    }
    return resultado;
}