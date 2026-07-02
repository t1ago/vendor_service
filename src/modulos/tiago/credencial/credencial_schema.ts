export const credencialSchemas = {
    TokenResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        properties: {
                            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                            expiresIn: { type: 'integer', example: 3600 },
                        },
                    },
                },
            },
        ],
    },
    UsuarioResponse: {
        allOf: [
            { $ref: '#/components/schemas/ResultadoAPI' },
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        properties: {
                            idCredencial: { type: 'integer' },
                            nomeCredencial: { type: 'string' },
                            idPerfil: { type: 'integer' },
                            nomePerfil: { type: 'string' },
                            identificadorPerfil: { type: 'string' },
                        },
                    },
                },
            },
        ],
    },
};
