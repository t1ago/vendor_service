import express from 'express';
import { buscarEstados, buscarLocalidadeCep } from './endereco_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasEnderecoTiago = express.Router();

/**
 * @swagger
 * tags:
 *   name: Endereço
 *   description: Consultas de localidades e estados via APIs externas
 */

/**
 * @swagger
 * /tiago/endereco/estados:
 *   get:
 *     summary: Lista todos os estados brasileiros
 *     tags: [Endereço]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados com sigla e nome
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstadoListaResponse'
 *       500:
 *         description: Erro ao consultar API do IBGE
 */
rotasEnderecoTiago.get('/estados', autenticadorInterceptador, buscarEstados);

/**
 * @swagger
 * /tiago/endereco/localidade/{cep}:
 *   get:
 *     summary: Busca os dados de endereço a partir de um CEP
 *     tags: [Endereço]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cep
 *         required: true
 *         schema:
 *           type: string
 *           example: "01310-100"
 *     responses:
 *       200:
 *         description: Dados de localidade do CEP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocalidadeCepResponse'
 *       500:
 *         description: Erro ao consultar ViaCEP
 */
rotasEnderecoTiago.get('/localidade/:cep', autenticadorInterceptador, buscarLocalidadeCep);

export = rotasEnderecoTiago;
