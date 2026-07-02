export const pessoaSchemas = {
    Pessoa: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            apelido: { type: 'string' },
            tipo_pessoa: { type: 'string', enum: ['F', 'J'] },
            sexo: { type: 'string', enum: ['M', 'F'] },
            data_inicio: { type: 'string', example: '01/01/1990' },
            documento_estadual: { type: 'string' },
            documento_federeal: { type: 'string' },
            id_vinculo: { type: 'integer' },
            ativo: { type: 'string', enum: ['A', 'I'] },
            enderecos: {
                type: 'array',
                items: { $ref: '#/components/schemas/Endereco' },
            },
        },
    },
    PessoaInput: {
        type: 'object',
        required: ['nome', 'apelido', 'tipo_pessoa', 'documento_estadual', 'documento_federeal', 'ativo', 'enderecos'],
        properties: {
            nome: { type: 'string' },
            apelido: { type: 'string' },
            tipo_pessoa: { type: 'string', enum: ['F', 'J'] },
            sexo: { type: 'string', enum: ['M', 'F'] },
            data_inicio: { type: 'string', example: '01/01/1990' },
            documento_estadual: { type: 'string' },
            documento_federeal: { type: 'string' },
            id_vinculo: { type: 'integer' },
            ativo: { type: 'string', enum: ['A', 'I'] },
            enderecos: {
                type: 'array',
                items: { $ref: '#/components/schemas/Endereco' },
            },
        },
    },
    PessoaVinculo: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
        },
    },
    PessoaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { $ref: '#/components/schemas/Pessoa' } } },
        ],
    },
    PessoaLista: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            apelido: { type: 'string' },
            tipo_pessoa: { type: 'string', enum: ['F', 'J'] },
            sexo: { type: 'string', enum: ['M', 'F'] },
            data_inicio: { type: 'string' },
            documento_estadual: { type: 'string' },
            documento_federeal: { type: 'string' },
            id_vinculo: { type: 'integer' },
            nome_vinculo: { type: 'string' },
            ativo: { type: 'string', enum: ['A', 'I'] },
            id_moradia: { type: 'integer' },
            id_cobranca: { type: 'integer' },
            id_entrega: { type: 'integer' },
        },
    },
    PessoaListaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { type: 'array', items: { $ref: '#/components/schemas/PessoaLista' } } } },
        ],
    },
    PessoaVinculoListaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { type: 'array', items: { $ref: '#/components/schemas/PessoaVinculo' } } } },
        ],
    },
};
