// /src/produtos/clientes/dam/clientes.modelo.ts

export interface EnderecoDam {
    id?: number;
    id_pessoa: number;
    tipo_endereco: 'Moradia' | 'Cobranca' | 'Entrega';
    ativo: boolean;
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    data_cadastro?: Date;
    data_atualizacao?: Date;
}

export interface PessoaDam {
    id?: number;
    tipo_pessoa: 'PF' | 'PJ';
    ativo: boolean;

    nome: string;
    apelido: string;

    cpf?: string;
    rg?: string;

    cnpj?: string;
    inscricao_estadual?: string;

    sexo?: 'M' | 'F' | 'O';
    data_nascimento?: Date;

    id_pessoa_juridica?: number;

    enderecos?: EnderecoDam[];

    data_cadastro?: Date;
    data_atualizacao?: Date;
}