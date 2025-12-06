// /src/produtos/clientes/dam/service/clientes.servico.ts

import { EnderecoDam, PessoaDam } from "./clientes.modelo";
import { validarCampos, buscarCep } from "./clientes.utils";
import * as repositorioClientes from "./clientes.repositorio"

export async function criar(pessoa: PessoaDam): Promise<number> {
    validarCampos(pessoa);

    if (!pessoa.enderecos || pessoa.enderecos.length === 0) {
        throw new Error('É obrigatório fornecer pelo menos um endereço (Moradia).');
    }

    const tiposEncontrados = new Set<string>();
    let moradiaAtivo = false;
    
    for (const endereco of pessoa.enderecos) {
        if (tiposEncontrados.has(endereco.tipo_endereco)) {
            throw new Error(`O tipo de endereço '${endereco.tipo_endereco}' está duplicado na lista.`);
        }
        tiposEncontrados.add(endereco.tipo_endereco);

        if (endereco.tipo_endereco === 'Moradia') {
            if (!endereco.ativo) {
                throw new Error('O endereço de Moradia deve estar ativo para o primeiro cadastro.');
            }
            moradiaAtivo = true;
        }
        
        if (!endereco.logradouro || !endereco.bairro || !endereco.cidade || !endereco.estado) {
            const dadosCep = await buscarCep(endereco.cep);
            endereco.logradouro = dadosCep.logradouro;
            endereco.bairro = dadosCep.bairro;
            endereco.cidade = dadosCep.cidade;
            endereco.estado = dadosCep.estado;
        }
    }

    if (!moradiaAtivo) {
        throw new Error('É obrigatório que um endereço de Moradia esteja ativo.');
    }

    pessoa.ativo = true;
    const idGerado = await repositorioClientes.inserirPessoaDam(pessoa);

    for (const endereco of pessoa.enderecos) {
        endereco.id_pessoa = idGerado;
        await repositorioClientes.inserirEndereco(endereco);
    }
    
    return idGerado;
}



export async function buscarTodasPessoas(): Promise<PessoaDam[]> {
    return repositorioClientes.buscarTudo();
}

export async function buscarPorId(id: number): Promise<PessoaDam> {
    const pessoa = await repositorioClientes.buscarPorId(id);

    if (!pessoa) {
        throw new Error(`Pessoa com ID ${id} não encontrada.`);
    }
    const enderecos = await repositorioClientes.buscarEndPorId(id);
    pessoa.enderecos = enderecos;

    return pessoa;
}

export async function pesquisarPorNome(termoBusca: string): Promise<PessoaDam[]> {
    if (termoBusca.trim(). length <3) {
        return [];
    }
    return repositorioClientes.encontrarPessoaPorNome(termoBusca);
}

export async function atualizarDados(id: number, novosDados: PessoaDam): Promise<PessoaDam> {
    const existe = await buscarPorId(id);
    if (!existe) {
        throw new Error(`Pessoa com ID ${id} não pode ser atualizada, pois não foi encontrada.`);
    }
    
    validarCampos(novosDados);
    novosDados.id = id;

    const moradiaAtivo = novosDados.enderecos?.some(e => e.tipo_endereco === 'Moradia' && e.ativo);
    if (!moradiaAtivo) {
        throw new Error('A atualização exige que um endereço de Moradia esteja sempre ativo.');
    }

    const sucessoPessoa = await repositorioClientes.atualizar(id, novosDados);

    if(!sucessoPessoa) {
        throw new Error(`Falha ao aplicar atualização na Pessoa com ID ${id}.`);
    }

    if (novosDados.enderecos) {
        const enderecosExistentes = new Set(existe.enderecos?.map(e => e.id));
        const tiposAtuais = new Set<string>();

        for (const novoEndereco of novosDados.enderecos) {
            if (tiposAtuais.has(novoEndereco.tipo_endereco)) {
                 throw new Error(`O tipo de endereço '${novoEndereco.tipo_endereco}' está duplicado no objeto de atualização.`);
            }
            tiposAtuais.add(novoEndereco.tipo_endereco);

            if (!novoEndereco.logradouro || !novoEndereco.bairro) {
                const dadosCep = await buscarCep(novoEndereco.cep);
                novoEndereco.logradouro = dadosCep.logradouro;
                novoEndereco.bairro = dadosCep.bairro;
                novoEndereco.cidade = dadosCep.cidade;
                novoEndereco.estado = dadosCep.estado;
            }

            if (novoEndereco.id && enderecosExistentes.has(novoEndereco.id)) {
                novoEndereco.id_pessoa = id;
                await repositorioClientes.atualizarEnderecos(novoEndereco as EnderecoDam); 
                enderecosExistentes.delete(novoEndereco.id);
            } else {
                novoEndereco.id_pessoa = id;
                await repositorioClientes.inserirEndereco(novoEndereco as EnderecoDam);
            }
        }
        
        for (const idParaDeletar of enderecosExistentes) {
            if (idParaDeletar) {
                await repositorioClientes.deletarEnd(idParaDeletar);
            }
        }
    }
    
    return buscarPorId(id);
}

export async function apagarPessoa(id: number): Promise<boolean> {
    const sucesso = await repositorioClientes.deletar(id);

    if(!sucesso) {
        throw new Error(`Pessoa com ID ${id} não encontrada ou já deletada.`)
    }
    return true;
}