import { dbCliente,dbPool,executarQuery } from "../../../utils/banco_dados";
import { IResultadoAPI } from "../../../interfaces/resultado_api";
import { limparResultadoAPI,processarDados,processarDadosEmpty } from "../../../utils/utils";
import { 
    criarPessoaSql,
    criarEnderecoSql,
    atualizarEnderecoSql,
    atualizarInativarSql,
    atualizarPessoaSql
} from "./pesssoas_sql";
import { ERROR_MESSAGES } from "../../../utils/error_messages";

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
        const resultado_update_pessoa = await executarQuery(cliente,sql_pessoa);
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