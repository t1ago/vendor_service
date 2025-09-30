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
export const inserirFornecedor = async (
    nome: string,
    descricao: string,
    id_categoria: number,
    id_moeda: number,
    id_grupo: number,
    id_unidade_medida: number,
    id_cor: number,
    id_marca: number,
    preco_compra: number,
    preco_venda: number
) => {
    limparResultado();

    const sql = `
        INSERT INTO tb_fornecedor_dam 
        (nome, descricao, id_categoria, id_moeda, id_grupo,
        id_unidade_medida,id_cor, id_marca, preco_compra, preco_venda)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id;
    `;

    const parametros = [
        nome, descricao, id_categoria, id_moeda, id_grupo,
        id_unidade_medida, id_cor, id_marca, preco_compra, preco_venda
    ];
    console.log(parametros)
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado && resultado.data.length > 0) {
        const id = resultado.data[0].id;
        resultado.mensagem = "Fornecedor inserido com sucesso!";
        resultado.data = {
            nome,
            descricao,
            id_categoria,
            id_moeda,
            id_grupo,
            id_unidade_medida,
            id_cor,
            id_marca,
            preco_compra,
            preco_venda    
        };
    } else {
        resultado.mensagem = "Erro ao inserir fornecedor.";
    }

    return resultado;
}

// LISTAR TODOS
export const buscarFornecedor = async () => {
    const sql = `
        SELECT
            f.id,
            f.nome,
            f.descricao,
            f.preco_compra,
            f.preco_venda,
            
            -- Categoria
            f.id_categoria,
            c.nome AS nome_categoria,

            -- Moeda
            f.id_moeda,
            mo.nome AS nome_moeda,

            -- Grupo
            f.id_grupo,
            g.nome AS nome_grupo,

            -- Unidade de medida
            f.id_unidade_medida,
            um.nome AS nome_unidade_medida,

            -- Marca
            f.id_marca,
            m.nome AS nome_marca,

            -- Cor
            f.id_cor,
            co.hexadecimal AS cor_hexadecimal

        FROM tb_fornecedor_dam f
        LEFT JOIN tb_categoria c ON f.id_categoria = c.id
        LEFT JOIN tb_moeda mo ON f.id_moeda = mo.id
        LEFT JOIN tb_grupo g ON f.id_grupo = g.id
        LEFT JOIN tb_medida um ON f.id_unidade_medida = um.id
        LEFT JOIN tb_marca m ON f.id_marca = m.id
        LEFT JOIN tb_cores co ON f.id_cor = co.id
        ORDER BY f.nome;
    `;

    const resultado = await executarQuery(sql);

    if (resultado.executado) {
        resultado.mensagem = "Fornecedores encontrados.";
    } else {
        resultado.mensagem = "Erro ao buscar fornecedores.";
    }

    return resultado;
};

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
export const atualizarFornecedor = async (
    id: number,
    nome: string,
    descricao: string,
    id_categoria: number,
    id_moeda: number,
    id_grupo: number,
    id_unidade_medida: number,
    id_cor: number,
    id_marca: number,
    preco_compra: number,
    preco_venda: number
) => {
    limparResultado();

    const sql = `
        UPDATE tb_fornecedor_dam 
        SET
            nome = $1,
            descricao = $2,
            id_categoria = $3,
            id_moeda = $4,
            id_grupo = $5,
            id_unidade_medida = $6,
            id_cor = $7,
            id_marca = $8,
            preco_compra = $9,
            preco_venda = $10
        WHERE id = $11;
    `;

    const parametros = [
        nome,
        descricao,
        id_categoria,
        id_moeda,
        id_grupo,
        id_unidade_medida,
        id_cor,
        id_marca,
        preco_compra,
        preco_venda,
        id
    ];
    const resultado = await executarQuery(sql, parametros);

    if (resultado.executado) {
        resultado.mensagem = "Fornecedor atualizado com sucesso!";
        resultado.data = {
            id, 
            nome, 
            descricao, 
            id_categoria, 
            id_moeda, 
            id_grupo, 
            id_unidade_medida, 
            id_cor, 
            id_marca, 
            preco_compra, 
            preco_venda 
        };
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
            f.id_categoria,
            c.nome AS nome_categoria,
            cor.nome AS nome_cor,
            m.nome AS nome_marca
        FROM tb_fornecedor_dam f
        INNER JOIN tb_categoria c ON f.id_categoria = c.id
        INNER JOIN tb_cores cor ON f.id_cor = cor.id
        INNER JOIN tb_marca m ON f.id_marca = m.id
        WHERE
            f.nome ILIKE $1
            OR f.descricao ILIKE $1
            OR cor.nome ILIKE $1
            OR m.nome ILIKE $1
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
