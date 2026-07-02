export const medidaSchemas = {
    Medida: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Quilograma' },
        },
    },
    MedidaInput: {
        type: 'object',
        required: ['nome'],
        properties: {
            nome: { type: 'string', example: 'Quilograma' },
        },
    },
    MedidaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { $ref: '#/components/schemas/Medida' } } },
        ],
    },
    MedidaListaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Medida' } } } },
        ],
    },
};
