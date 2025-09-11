import { Resultado } from "../../../../commons/resultado_api";
import { executarQuery } from "./fornecedores_utils";

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

const limparResultado = () => {
    resultado.executado = false;
    resultado.mensagem = "";
    resultado.data = {};
}

// INSERIR
export const inserirFornecedor = async (nome: string, descricao: string, id_categoria: number) => {
    limparResultado();

    const sql = `
        INSERT INTO tb_fornecedor_dam (nome, descricao, id_categoria)
        VALUES ($1, $2, $3) RETURNING id;
    `;
    const parametros = [nome, descricao, id_categoria];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        const id = resultado.data[0].id;
        resultado.mensagem = "Fornecedor inserido com sucesso!";
        resultado.data = { id, nome, descricao, id_categoria };
    } else {
        resultado.mensagem = "Erro ao inserir fornecedor.";
    }

    return resultado;
}

// LISTAR TODOS
export const buscarFornecedor = async () => {
    const sql = "SELECT * FROM tb_fornecedor_dam;";
    const resultado = await executarQuery(sql);

    if (resultado.executado) {
        resultado.mensagem = "Fornecedores encontrados.";
    } else {
        resultado.mensagem = "Erro ao buscar fornecedores.";
    }

    return resultado;
}

// BUSCAR POR ID
export const buscarFornecedorId = async (id: number) => {
    limparResultado();
    const sql = "SELECT id, nome, descricao, id_categoria FROM tb_fornecedor_dam WHERE id = $1;";
    const parametros = [id];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        resultado.mensagem = "Fornecedor encontrado!";
    } else {
        resultado.mensagem = "Nenhum fornecedor encontrado para este ID.";
    }

    return resultado;
}

// ATUALIZAR
export const atualizarFornecedor = async (id: number, nome: string, descricao: string, id_categoria: number) => {
    limparResultado();
    const sql = "UPDATE tb_fornecedor_dam SET nome = $1, descricao = $2, id_categoria = $3 WHERE id = $4;";
    const parametros = [nome, descricao, id_categoria, id];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado) {
        resultado.mensagem = "Fornecedor atualizado com sucesso!";
        resultado.data = { id, nome, descricao, id_categoria };
    } else {
        resultado.mensagem = "Erro ao atualizar fornecedor!";
    }

    return resultado;
}

// APAGAR
export const apagarFornecedor = async (id: number) => {
    limparResultado();
    const sql = "DELETE FROM tb_fornecedor_dam WHERE id = $1;";
    const parametros = [id];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado) {
        resultado.mensagem = "Fornecedor apagado com sucesso!";
    } else {
        resultado.mensagem = "Erro ao apagar fornecedor!";
    }

    return resultado;
}

// BUSCA GENÉRICA
export const buscarGenerico = async (parametro: string) => {
    limparResultado();

    const sql = `
        SELECT
            f.id,
            f.nome,
            f.descricao,
            f.cor,
            f.marca,
            f.id_categoria,
            c.nome AS nome_categoria
        FROM tb_fornecedor_dam f
        INNER JOIN tb_categorias c ON f.id_categoria = c.id
        WHERE
            f.nome ILIKE $1
            OR f.descricao ILIKE $1
            OR f.cor ILIKE $1
            OR f.marca ILIKE $1
            OR c.nome ILIKE $1
        ORDER BY f.nome;
    `;
    const parametros = [`%${parametro}%`];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado) {
        resultado.mensagem = "Busca concluída com sucesso!";
    } else {
        resultado.mensagem = "Erro na busca.";
    }

    return resultado;
}
