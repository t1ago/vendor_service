import { Request } from "express"

const REGEX_DOCUMENTO_FEDEREAL_PESSOA_FISICA = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
const REGEX_DOCUMENTO_FEDEREAL_PESSOA_JURIDICA = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
const REGEX_DOCUMENTO_ESTADUAL_PESSOA_FISICA = /^(\d{1,2}\.?)(\d{3}\.?)(\d{3})(\-?[0-9Xx]{1})$/
const REGEX_DOCUMENTO_ESTADUAL_PESSOA_JURIDICA = /^\d{3}.?\d{3}.?\d{3}.?\d{3}$/
const REGEX_CEP = /^\d{5}-\d{3}$/

export const validar_regras_enderecos = (enderecos: any) => {
    if (enderecos.length > 3) {
        return 'Essa pessoa pode ter até 3 tipos de endereços (Moradia, Cobrança e Entrega)'
    }

    let validMoradia = enderecos.filter((item: any) => {
        return item.tipoEndereco == 'M' && item.ativo == 'A'
    })

    if (validMoradia.length > 1) {
        return 'Não é permitido mais de um endereço para Moradia.'
    }

    if (validMoradia.length == 0) {
        return 'Obrigatório informar um endereço tipo Moradia.'
    }

    for (let index = 0; index < enderecos.length; index++) {
        const endereco = enderecos[index];

        if (['M', 'C', 'E'].includes(endereco.tipoEndereco) == false) {
            return 'Os tipos permitidos para endereço são: Moradia, Cobrança e Entrega'
        }

        if (REGEX_CEP.test(endereco.cep) == false) {
            return 'CEP deve ter o formato de 000000-000.'
        }
    }

    return ''
}

export const validar_regras_pessoa = (pessoa: any) => {

    if (['J', 'F'].includes(pessoa.tipoPessoa) == false) {
        return 'Os tipos permitidos para pessoa são: Física e Jurídica'
    }

    if (pessoa.tipoPessoa == 'F') {
        if (pessoa.dataInicio == undefined || pessoa.dataInicio.trim() == '') {
            return 'Data de Nascimento não informada para Pessoa Física.'
        }

        let dateInput = pessoa.dataInicio
        let dateArray = dateInput.split("/");

        const day = parseInt(dateArray[0]);
        const month = parseInt(dateArray[1]);
        const year = parseInt(dateArray[2]);

        const newDate = new Date(year, month - 1, day);

        if ((newDate.getFullYear() === year &&
            newDate.getMonth() + 1 === month &&
            newDate.getDate() === day) == false) {
            return 'O Campo tem data inválida'
        }

        if (REGEX_DOCUMENTO_FEDEREAL_PESSOA_FISICA.test(pessoa.documentoFedereal) == false) {
            return 'CPF inválido.'
        }

        if (REGEX_DOCUMENTO_ESTADUAL_PESSOA_FISICA.test(pessoa.documentoEstadual) == false) {
            return 'RG inválido.'
        }

        if (['M', 'F'].includes(pessoa.sexo) == false) {
            return 'O Sexo são: Masculino ou Feminino'
        }
    } else {
        if (REGEX_DOCUMENTO_FEDEREAL_PESSOA_JURIDICA.test(pessoa.documentoFedereal) == false) {
            return 'CNPJ inválido.'
        }

        if (REGEX_DOCUMENTO_ESTADUAL_PESSOA_JURIDICA.test(pessoa.documentoEstadual) == false) {
            return 'Insc. Estadual inválida.'
        }
    }

    const validacao_mensagem = validar_regras_enderecos(pessoa.enderecos)

    if (validacao_mensagem != '') {
        return validacao_mensagem
    }

    return ''
}

export const mapear_body = (req: Request) => {
    const dataEndereco = (req.body.enderecos || []).map((item: any) => {
        return {
            id: item.id_endereco,
            cep: item.cep,
            logradouro: item.logradouro,
            numero: item.numero,
            bairro: item.bairro,
            cidade: item.cidade,
            estado: item.estado,
            tipoEndereco: item.tipo_endereco,
            ativo: item.ativo,
            buscadoPorCep: item.buscado_por_cep
        }
    })

    const data = {
        id: req.body.id_pessoa || req.params.id,
        nome: req.body.nome,
        apelido: req.body.apelido,
        tipoPessoa: req.body.tipo_pessoa,
        sexo: req.body.sexo,
        dataInicio: req.body.data_inicio,
        documentoEstadual: req.body.documento_estadual,
        documentoFedereal: req.body.documento_federeal,
        idVinculo: req.body.id_vinculo,
        ativo: req.body.ativo,
        enderecos: dataEndereco
    }

    return data
}