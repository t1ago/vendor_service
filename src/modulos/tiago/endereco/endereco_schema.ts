export const enderecoSchemas = {
    Endereco: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            cep: { type: 'string', example: '01310-100' },
            logradouro: { type: 'string' },
            numero: { type: 'string' },
            bairro: { type: 'string' },
            cidade: { type: 'string' },
            estado: { type: 'string' },
            tipo_endereco: { type: 'string', enum: ['M', 'C', 'E'] },
            ativo: { type: 'string', enum: ['A', 'I'] },
            buscado_por_cep: { type: 'string', enum: ['S', 'N'] },
        },
    },
    Estado: {
        type: 'object',
        properties: {
            sigla: { type: 'string', example: 'SP' },
            nome: { type: 'string', example: 'São Paulo' },
        },
    },
    LocalidadeCep: {
        type: 'object',
        properties: {
            cep: { type: 'string', example: '01310-100' },
            logradouro: { type: 'string', example: 'Avenida Paulista' },
            bairro: { type: 'string', example: 'Bela Vista' },
            cidade: { type: 'string', example: 'São Paulo' },
            estado: {
                type: 'object',
                properties: {
                    sigla: { type: 'string', example: 'SP' },
                    nome: { type: 'string', example: 'São Paulo' },
                },
            },
        },
    },
    EnderecoResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { $ref: '#/components/schemas/Endereco' } } },
        ],
    },
    EstadoListaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Estado' } } } },
        ],
    },
    LocalidadeCepResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { $ref: '#/components/schemas/LocalidadeCep' } } },
        ],
    },
};
