import { Request } from "express"
const regex_cep = /^\d{5}-\d{3}$/;
const regex_doc_federal_pf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regex_doc_estadual_pf = /^(\d{1,2}\.?)(\d{3}\.?)(\d{3})(\-?[0-9Xx]{1})$/;
const regex_doc_federal_pj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
const regex_doc_estadual_pj = /^\d{3}.?\d{3}.?\d{3}.?\d{3}$/;

export const validarEnderecos = (lista_enderecos: any) => {
    if (lista_enderecos.length > 3) {
        return 'Essa pessoa pode ter até 3 tipos de endereços (Moradia, Cobrança e Entrega)'
    }

    let validMoradia = lista_enderecos.filter((item: any) => {
        return item.tipoEndereco == 'M' && item.ativo == 'A'
    })

    if (validMoradia.length > 1) {
        return 'Não é permitido mais de um endereço para Moradia.'
    }

    if (validMoradia.length == 0) {
        return 'Obrigatório informar um endereço tipo Moradia.'
    }

    for (let index = 0; index < lista_enderecos.length; index++) {
        const endereco = lista_enderecos[index];

        if (['M', 'C', 'E'].includes(endereco.tipoEndereco) == false) {
            return 'Os tipos permitidos para endereço são: Moradia, Cobrança e Entrega'
        }

        if (regex_cep.test(endereco.cep) == false) {
            return 'CEP deve ter o formato de 00000-000.'
        }
    }

    return ''
}

export const validarPessoa = (lista: any) => {

    if (['J', 'F'].includes(lista.tipoPessoa) == false) {
        return 'Os tipos permitidos para pessoa são: Física e Jurídica'
    }

    if (lista.tipoPessoa == 'F') {
        if (lista.data_nascimento == undefined || lista.data_nascimento.trim() == '') {
            return 'Data de Nascimento não informada para Pessoa Física.'
        }

        let data_entrada = lista.data_nascimento
        let info_data = data_entrada.split("/");

        const day = parseInt(info_data[0]);
        const month = parseInt(info_data[1]);
        const year = parseInt(info_data[2]);

        const newDate = new Date(year, month - 1, day);

        if ((newDate.getFullYear() === year &&
            newDate.getMonth() + 1 === month &&
            newDate.getDate() === day) == false) {
            return 'O Campo tem data inválida'
        }

        if (regex_doc_federal_pf.test(lista.documento_federal) == false) {
            return 'CPF inválido.'
        }

        if (regex_doc_estadual_pf.test(lista.documento_estadual) == false) {
            return 'RG inválido.'
        }

        if (['M', 'F'].includes(lista.sexo) == false) {
            return 'O Sexo são: Masculino ou Feminino'
        }
    } else {
        if (regex_doc_federal_pj.test(lista.documento_federal) == false) {
            return 'CNPJ inválido.'
        }

        if (regex_doc_estadual_pj.test(lista.documento_estadual) == false) {
            return 'Insc. Estadual inválida.'
        }
    }

    const mensagem_endereco = validarEnderecos(lista.enderecos)

    if (mensagem_endereco != '') {
        return mensagem_endereco
    }

    return ''
}

export const bodyMapeado = (req: Request) => {
    const dados_endereco = (req.body.enderecos || []).map((item: any) => {
        return {
            id_endereco: item.id_endereco,
            cep: item.cep,
            logradouro: item.logradouro,
            numero: item.numero,
            bairro: item.bairro,
            cidade: item.cidade,
            estado: item.estado,
            tipo_endereco: item.tipo_endereco,
            ativo: item.ativo,
        }
    })

    const dados = {
        id_pessoa: req.body.id_pessoa || req.params.id,
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipo_pessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        data_nascimento: req.body.data_nascimento,
        documento_estadual: req.body.documento_estadual,
        documento_federal: req.body.documento_federeal,
        id_vinculo: req.body.id_vinculo,
        ativo: req.body.ativo,
        enderecos: dados_endereco
    }

    return dados
}