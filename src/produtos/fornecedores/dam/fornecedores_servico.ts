import { Resultado } from "../../../../commons/resultado_api";
import { executarQuery } from "./fornecedores_utils";

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

export const inserirFornecedor = async (nome: string, descricao: string) => {
    limparResultado();

    const sql = "INSERT INTO tb_fornecedores_dam (nome, descricao) values ($1, $2) RETURNING id;"
    const parametros = [nome, descricao];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        const id = resultado.data[0].id;
        resultado.mensagem = "Nunca dúvidei que o fornecedor seria inserido com sucesso!";
        resultado.data = {id, nome, descricao};
    }

    return resultado;
}

export const buscarFornecedor = async () => {
    limparResultado();
    const sql = "SELECT * FROM tb_fornecedores_dam;";
    const resultado = await executarQuery(sql);

    if (resultado.executado) {
        resultado.mensagem = "Parabéns, nunca dúvidei, buscou mesmo!!";
    }

    return resultado;
}

export const buscarFornecedorId = async (id: number) => {
    limparResultado();
    const sql = "SELECT id, nome, descricao, id_categorias FROM tb_fornecedores_dam WHERE id = $1;";
    const parametros = [id];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        resultado.mensagem = "Nunca dúvidei que o fornecedor apareceria!"
    } else {
        resultado.mensagem = "Foda em, não tem nenhum fornecedor nesse ID."
    }

    return resultado
}

export const atualizarFornecedor = async (id: number, nome: string, descricao: string, id_categoria: string) => {
    limparResultado();
    const sql = "UPDATE tb_fornecedores_dam SET nome = $1, descricao = $2, id_categoria = $3 WHERE id = $4;";
    const parametros = [nome, descricao, id_categoria, id];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        resultado.mensagem = "Foda em, não conseguiu alterar o forncedor!";
        resultado.data = resultado.data[0];
    }else{
        resultado.mensagem = "Nunca dúvidei que alteraria!";
        resultado.data = {id, nome, descricao, id_categoria};
    }
    
    return resultado;
}

export const apagarFornecedor = async (id: number) => {
    limparResultado();
    const sql = "DELETE FROM tb_fornecedores_dam WHERE id = $1;";
    const parametros = [id];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado) {
        resultado.mensagem = "Nunca dúvidei que apagaria!!";
        resultado.data = resultado.data[0];
    }else{
        resultado.mensagem = "Foda em, não conseguiu apagar o forncedor!";
    }

    return resultado;
}

export const buscarGenerico = async (parametro: string) => {
    return {
        sql: `
            SELECT
                f. id,
                f. nome,
                f. descricao,
                f. cor,
                f. marca,
                f. id_categoria,
                c. nome AS nome_categoria
            from tb_fornecedor_dam f
            INNER JOIN tb_categorias c ON f.id_categoria = c.id
            WHERE
                f.nome ILIKE $1
                OR f.descricao ILIkE $1
                OR f.cor ILIkE $1
                OR f.marca ILIkE $1
                OR c.nome ILIkE $1
            ORDER BY f.nome;
        `,
        valores: [`%${parametro}%`]
    }
}