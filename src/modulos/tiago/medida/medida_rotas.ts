import express from 'express';
import { autenticadorInterceptador } from '../../../utils/utils';
import { criar, alterar, buscar, buscarTodos, remover } from './medida_controlador';

const rotasMedida = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medidas
 *   description: Unidades de medida disponíveis no sistema
 */

/**
 * @swagger
 * /tiago/medida:
 *   get:
 *     summary: Lista todas as medidas
 *     tags: [Medidas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedidaListaResponse'
 *       500:
 *         description: Erro interno
 */
rotasMedida.get('/', autenticadorInterceptador, buscarTodos);

/**
 * @swagger
 * /tiago/medida/{id}:
 *   get:
 *     summary: Busca uma medida pelo ID
 *     tags: [Medidas]
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
 *         description: Dados da medida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedidaResponse'
 *       500:
 *         description: Erro interno
 */
rotasMedida.get('/:id', autenticadorInterceptador, buscar);

/**
 * @swagger
 * /tiago/medida:
 *   post:
 *     summary: Cadastra uma nova medida
 *     tags: [Medidas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedidaInput'
 *     responses:
 *       200:
 *         description: Medida criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasMedida.post('/', autenticadorInterceptador, criar);

/**
 * @swagger
 * /tiago/medida/{id}:
 *   put:
 *     summary: Atualiza uma medida existente
 *     tags: [Medidas]
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
 *             $ref: '#/components/schemas/MedidaInput'
 *     responses:
 *       200:
 *         description: Medida atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasMedida.put('/:id', autenticadorInterceptador, alterar);

/**
 * @swagger
 * /tiago/medida/{id}:
 *   delete:
 *     summary: Remove uma medida
 *     tags: [Medidas]
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
 *         description: Medida removida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasMedida.delete('/:id', autenticadorInterceptador, remover);

export = rotasMedida;
