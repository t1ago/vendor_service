import swaggerJsdoc from 'swagger-jsdoc';
import { pessoaSchemas } from '../modulos/tiago/pessoa/pessoa_schema';
import { enderecoSchemas } from '../modulos/tiago/endereco/endereco_schema';
import { categoriaSchemas } from '../modulos/tiago/categoria/categoria_schema';
import { credencialSchemas } from '../modulos/tiago/credencial/credencial_schema';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vendor Service API',
            version: '1.0.0',
            description: 'API REST do Vendor App — projeto de estudos',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                basicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
            schemas: {
                ResultadoAPI: {
                    type: 'object',
                    properties: {
                        executado: { type: 'boolean', example: true },
                        mensagem: { type: 'string', example: '' },
                        data: {},
                    },
                },
                IdResponse: {
                    allOf: [
                        { $ref: '#/components/schemas/ResultadoAPI' },
                        { type: 'object', properties: { data: { type: 'object', properties: { id: { type: 'integer' } } } } },
                    ],
                },
                ...enderecoSchemas,
                ...pessoaSchemas,
                ...categoriaSchemas,
                ...credencialSchemas,
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/modulos/tiago/**/*_rotas.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
