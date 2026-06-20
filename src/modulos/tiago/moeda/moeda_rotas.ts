import express from 'express';
import { autenticadorInterceptador } from '../../../utils/utils';
import { criar, alterar, buscar, buscarTodos, remover } from './moeda_controlador';

const rotasMoeda = express.Router();

/**
 * @swagger
 * tags:
 *   name: Moedas
 *   description: Moedas disponíveis no sistema
 */

/**
 * @swagger
 * /tiago/moeda:
 *   get:
 *     summary: Lista todas as moedas
 *     tags: [Moedas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de moedas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoedaListaResponse'
 *       500:
 *         description: Erro interno
 */
rotasMoeda.get('/', autenticadorInterceptador, buscarTodos);

/**
 * @swagger
 * /tiago/moeda/{id}:
 *   get:
 *     summary: Busca uma moeda pelo ID
 *     tags: [Moedas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da moeda
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoedaResponse'
 *       500:
 *         description: Erro interno
 */
rotasMoeda.get('/:id', autenticadorInterceptador, buscar);

/**
 * @swagger
 * /tiago/moeda:
 *   post:
 *     summary: Cadastra uma nova moeda
 *     tags: [Moedas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MoedaInput'
 *     responses:
 *       200:
 *         description: Moeda criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasMoeda.post('/', autenticadorInterceptador, criar);

/**
 * @swagger
 * /tiago/moeda/{id}:
 *   put:
 *     summary: Atualiza uma moeda existente
 *     tags: [Moedas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MoedaInput'
 *     responses:
 *       200:
 *         description: Moeda atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasMoeda.put('/:id', autenticadorInterceptador, alterar);

/**
 * @swagger
 * /tiago/moeda/{id}:
 *   delete:
 *     summary: Remove uma moeda
 *     tags: [Moedas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Moeda removida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasMoeda.delete('/:id', autenticadorInterceptador, remover);

export = rotasMoeda;
