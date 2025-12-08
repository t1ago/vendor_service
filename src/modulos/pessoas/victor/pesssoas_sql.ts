import { ISqlDados } from "../../../interfaces/sql_filtro";

export const criarPessoaSql = (lista:any): ISqlDados => {
    let data_nascimento = undefined

    if (lista.data_nascimento != undefined) {
        let data_entrada = lista.data_nascimento
        let info_data = data_entrada.split("/");

        const day = info_data[0].padStart(2, '0');
        const month = info_data[1].padStart(2, '0');
        const year = info_data[2];

        data_nascimento = `${year}-${month}-${day} 00:00:00`
    }
    return {
        'sql' : `
        INSERT INTO
        tb_pessoas_victor
        (nome,apelido,tipo_pessoa,sexo,data_nascimento,documento_federal,documento_estadual,ativo,id_vinculo)
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id_pessoa
        `,
        'valores' : [
            lista.nome,
            lista.apelido,
            lista.tipo_pessoa,
            lista.sexo,
            data_nascimento,
            lista.documento_federal,
            lista.documento_estadual,
            lista.ativo,
            lista.id_vinculo
        ]
    }
}
export const atualizarPessoaSql = (lista:any) : ISqlDados => {
    let data_nascimento = undefined

    if (lista.data_nascimento != undefined) {
        let data_entrada = lista.data_nascimento
        let info_data = data_entrada.split("/");

        const day = info_data[0].padStart(2, '0');
        const month = info_data[1].padStart(2, '0');
        const year = info_data[2];

        data_nascimento = `${year}-${month}-${day} 00:00:00`
    }
    return {
        'sql':`
        UPDATE
        tb_pessoas_victor
        SET
        nome=$1,
        apelido=$2,
        sexo=$3,
        data_nascimento=$4,
        documento_federal=$5,
        documento_estadual=$6,
        ativo=$7,
        id_vinculo=$8
        WHERE id_pessoa=$9
        `,
        'valores':[
            lista.nome,
            lista.apelido,
            lista.sexo,
            data_nascimento,
            lista.documento_federal,
            lista.documento_estadual,
            lista.ativo,
            lista.id_vinculo,
            lista.id_pessoa
        ]
    }
}

export const criarEnderecoSql = (lista:any) : ISqlDados => {
    return {
        'sql':`
        INSERT INTO
        tb_enderecos_pessoas_victor
        (cep,logradouro,numero,bairro,cidade,estado,ativo,tipo_endereco,id_pessoa)
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        'valores':[lista.cep,
            lista.logradouro,
            lista.numero,
            lista.bairro,
            lista.cidade,
            lista.estado,
            lista.ativo,
            lista.tipo_endereco,
            lista.id_pessoa]
    }
}
export const atualizarEnderecoSql = (lista:any): ISqlDados => {
    return {
        'sql': `
        UPDATE
        tb_enderecos_pessoas_victor
        SET
        cep=$1,
        logradouro=$2,
        numero=$3,
        bairro=$4,
        cidade=$5,
        estado=$6,
        ativo=$7,
        tipo_endereco=$8,
        WHERE
        id_pessoa = $9 AND id_endereco = $10
        `,
        'valores' : [
            lista.cep,
            lista.logradouro,
            lista.numero,
            lista.bairro,
            lista.cidade,
            lista.estado,
            lista.ativo,
            lista.tipo_endereco,
            lista.id_pessoa,
            lista.id_endereco
        ]
    }
}
export const atualizarInativarSql = (lista:any): ISqlDados => {
    return {
        'sql': `
        UPDATE
        tb_pessoas_victor
        SET
        ativo=$1
        WHERE id_pessoa =$2
        `,
        'valores': ['I',lista.id_pessoa]
    }
}