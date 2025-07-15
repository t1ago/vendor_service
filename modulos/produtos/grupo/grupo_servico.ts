import { db_cliente } from "../../../commons/banco_dados"
import { Resultado } from "../../../commons/resultado_api";


const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}


export const novogrupo = async (grupo:any) => {
    const cliente = db_cliente() 
    
    try{
        await cliente.connect() 
        let colocandosql = 'INSERT INTO tb_grupo (nome) VALUES ($1) RETURNING id';
        let parameters = [grupo.nome]
        let resultadoinsert =  await cliente.query(colocandosql, parameters)
        let resultado: Resultado = {
            executado: true, 
            mensagem: "",
            data: {
                id: resultadoinsert.rows[0].id
            }
        }
        return resultado
    }catch  (erro){ 
        let resultado: Resultado = {
            executado: false,
            mensagem: 'erro' + erro,
            data: {}
        }
        return resultado
    }finally {
        await cliente.end() 
    }
    
}


export const alterargruposervico = async (grupo: any) => {
    const cliente = db_cliente();

    try {
        await cliente.connect();

        const sql = "UPDATE tb_grupo SET nome=$1 WHERE id=$2;";
        const grupovalores = [grupo.nome, grupo.id]; 
        const resultado_grupo = await cliente.query(sql, grupovalores);

        resultado.executado = resultado_grupo.rows[0]
        resultado.mensagem = "";
        resultado.data = grupo; 

    } catch (erro) {
        resultado.executado = false;
        resultado.mensagem = `Erro. MSG: ${erro}`;
        resultado.data = []
    } finally {
        await cliente.end();
    }

    return resultado;
}


export const removergruposervico = async (grupo: any) => {
    const cliente = db_cliente()

    try {    
        cliente.connect()

        const sql = "DELETE FROM tb_grupo WHERE id=$1;"
        const grupovalores = [grupo.id]

        const resultado_delete = await cliente.query(sql, grupovalores)

        resultado.executado = (resultado_delete.rows[0])
        resultado.mensagem = "";
        resultado.data = {
            'id': grupo.id
        }

    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = `Erro . MSG: ${erro}`;
        resultado.data = []
    } finally {
        await cliente.end();
    }
    return resultado
}

export const buscargrupoServico = async (grupo: any) => {
    const cliente = db_cliente()
   
    try {
        cliente.connect()

        const sql = "SELECT * FROM tb_grupo WHERE id=$1;"
        const valoresgrupo = [grupo.id]

        const resultado_grupo = await cliente.query(sql, valoresgrupo)

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = resultado_grupo.rows

       
    } catch (erro) {
        resultado.executado = false
        resultado.mensagem = `Erro. MSG: ${erro}`
        resultado.data = []
    } finally {
        await cliente.end();
    }
    return resultado
}


export const buscargruposServico = async () => {
    try {
        cliente.connect()
        const sql = "SELECT * FROM tb_grupo;"

        const resultado_total = await cliente.query(sql)
    
        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = resultado_total.rows


    } catch(erro){
        resultado.executado = false
        resultado.mensagem = `Erro. MSG: ${erro}`
        resultado.data = []
    } finally{
          await cliente.end();
    }   
    return resultado

}