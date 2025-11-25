// /src/produtos/clientes/dam/service/clientes.utils.ts

import { PessoaDam } from "./clientes.modelo";

export function validarCampos(pessoa: PessoaDam): boolean {
    if (pessoa.tipo_pessoa === 'PF') {
        if (!pessoa.cpf || !pessoa.rg) {
            throw new Error('RG e CPF são obrigatórios para Pessoa Física.');
        }
        if (!pessoa.sexo || !pessoa.data_nascimento) {
            throw new Error('Sexo e Data de Nascimento são obrigatórios para Pessoa Física.');
        }
        if (pessoa.cnpj || pessoa.inscricao_estadual) {
             throw new Error('CNPJ/Inscrição Estadual não devem ser fornecidos para PF.');
        }
    } 
    
    else if (pessoa.tipo_pessoa === 'PJ') {
        if (!pessoa.cnpj || !pessoa.inscricao_estadual) {
            throw new Error('CNPJ e Inscrição Estadual são obrigatórios para Pessoa Jurídica.');
        }
        if (pessoa.cpf || pessoa.rg || pessoa.sexo || pessoa.data_nascimento) {
             throw new Error('CPF/RG/Sexo/Data de Nascimento não devem ser fornecidos para PJ.');
        }
        if (pessoa.tipo_pessoa === 'PJ' && !pessoa.apelido) {
            throw new Error('Nome Fantasia é obrigatório.');
        }
        if (pessoa.id_pessoa_juridica && pessoa.tipo_pessoa === 'PJ') {
        throw new Error('Pessoa Jurídica não pode ter vínculo com outra PJ (id_pessoa_juridica).');
        }
    }
    return true;
}

export async function buscarCep(cep: string): Promise<any> {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        throw new Error("CEP deve conter 8 dígitos.");
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const resultado = await resposta.json();

        if (resultado.erro) {
            throw new Error('CEP não encontrado ou inválido.');
        }

        return {
            logradouro: resultado.logradouro,
            bairro: resultado.bairro,
            cidade: resultado.localidade,
            estado: resultado.uf,
        };
    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        throw new Error('Falha na consulta de CEP.');
    }
}