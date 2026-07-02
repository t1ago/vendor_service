export const categoriaSchemas = {
    Categoria: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Eletrônicos' },
        },
    },
    CategoriaInput: {
        type: 'object',
        required: ['nome'],
        properties: {
            nome: { type: 'string', example: 'Eletrônicos' },
        },
    },
    CategoriaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { $ref: '#/components/schemas/Categoria' } } },
        ],
    },
    CategoriaListaResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            { type: 'object', properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Categoria' } } } },
        ],
    },
};
