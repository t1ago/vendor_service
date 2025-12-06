import { ISqlDados } from "../../../interfaces/sql_filtro"

export const sqlBuscarVinculos = (): ISqlDados => {
    return {
        sql: `
                SELECT tp.id, tp.nome 
                FROM tb_pessoa_tiago tp 
                WHERE tp.ativo = 'A' AND tp.tipo_pessoa = 'J'
            `,
        valores: null
    }
}

export const sqlCriarPessoa = (parametros: any): ISqlDados => {
    let dataInicio = undefined

    if (parametros.dataInicio != undefined) {
        let dateInput = parametros.dataInicio
        let dateArray = dateInput.split("/");

        const day = dateArray[0].padStart(2, '0');
        const month = dateArray[1].padStart(2, '0');
        const year = dateArray[2];

        dataInicio = `${year}-${month}-${day} 00:00:00`
    }

    return {
        sql: `
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
            `,
        valores: [
            parametros.nome,
            parametros.apelido,
            parametros.tipoPessoa,
            parametros.sexo,
            dataInicio,
            parametros.documentoEstadual,
            parametros.documentoFedereal,
            parametros.idVinculo,
            parametros.ativo]
    }
}

export const sqlCriarEndereco = (parametros: any): ISqlDados => {

    return {
        sql: `
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
            `,
        valores: [
            parametros.idPessoa,
            parametros.cep,
            parametros.logradouro,
            parametros.numero,
            parametros.bairro,
            parametros.cidade,
            parametros.estado,
            parametros.tipoEndereco,
            parametros.buscadoPorCep ? 'S' : 'N',
            parametros.ativo]
    }
}

export const sqlAlterarPessoa = (parametros: any): ISqlDados => {
    let dataInicio = undefined

    if (parametros.dataInicio != undefined) {
        let dateInput = parametros.dataInicio
        let dateArray = dateInput.split("/");

        const day = dateArray[0].padStart(2, '0');
        const month = dateArray[1].padStart(2, '0');
        const year = dateArray[2];

        dataInicio = `${year}-${month}-${day} 00:00:00`
    }

    return {
        sql: `
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
            `,
        valores: [
            parametros.nome,
            parametros.apelido,
            parametros.tipoPessoa,
            parametros.sexo,
            dataInicio,
            parametros.documentoEstadual,
            parametros.documentoFedereal,
            parametros.idVinculo,
            parametros.ativo ? 'A' : 'I',
            parametros.id]
    }
}

export const sqlAlterarEndereco = (parametros: any): ISqlDados => {

    return {
        sql: `
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
                `,
        valores: [
            parametros.cep,
            parametros.logradouro,
            parametros.numero,
            parametros.bairro,
            parametros.cidade,
            parametros.estado,
            parametros.tipoEndereco,
            parametros.buscadoPorCep ? 'S' : 'N',
            parametros.ativo,
            parametros.id,
            parametros.idPessoa]
    }
}

export const sqlInativarPessoa = (parametros: any): ISqlDados => {

    return {
        sql: `
            UPDATE tb_pessoa_tiago 
                SET ativo=$1
                WHERE id=$2
        `,
        valores: ['I', parametros.id]
    }
}

export const sqlBuscarPorId = (parametros: any) => {
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

export const sqlBuscarTodos = (parametros: any) => {
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

export const sqlBuscarPorTermo = (parametros: any) => {
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

export const sqlBuscarEnderecosPorIdPessoa = (parametros: any) => {
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

export const sqlBuscarEnderecosPorId = (parametros: any) => {
    return {
        sql: `
            SELECT 
                tb_end.cep,
                tb_end.logradouro,
                tb_end.numero,
                tb_end.bairro,
                tb_end.cidade,
                tb_end.estado
            FROM tb_endereco_pessoa_tiago tb_end
            WHERE tb_end.id=$1
        `,
        valores: [parametros.id]
    }
}