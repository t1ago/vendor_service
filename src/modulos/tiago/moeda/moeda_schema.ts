export const moedaSchemas = {
    Moeda: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Real Brasileiro' },
            moeda: { type: 'string', example: 'BRL' },
        },
    },
    MoedaInput: {
        type: 'object',
        required: ['nome', 'moeda'],
        properties: {
            nome: { type: 'string', example: 'Real Brasileiro' },
            moeda: { type: 'string', example: 'BRL' },
        },
    },
    MoedaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { $ref: '#/components/schemas/Moeda' } } },
        ],
    },
    MoedaListaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Moeda' } } } },
        ],
    },
};
