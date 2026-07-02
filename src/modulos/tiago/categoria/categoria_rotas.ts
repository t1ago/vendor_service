import express from 'express';
import { criar, alterar, buscar, buscarTodos, remover } from './categoria_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasCategorias = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categoria
 *   description: Categorias de produtos
 */

/**
 * @swagger
 * /tiago/categoria:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaListaResponse'
 *       500:
 *         description: Erro interno
 */
rotasCategorias.get('/', autenticadorInterceptador, buscarTodos);

/**
 * @swagger
 * /tiago/categoria/{id}:
 *   get:
 *     summary: Busca uma categoria pelo ID
 *     tags: [Categoria]
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
 *         description: Dados da categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaResponse'
 *       500:
 *         description: Erro interno
 */
rotasCategorias.get('/:id', autenticadorInterceptador, buscar);

/**
 * @swagger
 * /tiago/categoria:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       200:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasCategorias.post('/', autenticadorInterceptador, criar);

/**
 * @swagger
 * /tiago/categoria/{id}:
 *   put:
 *     summary: Altera o nome de uma categoria
 *     tags: [Categoria]
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
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       200:
 *         description: Categoria alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasCategorias.put('/:id', autenticadorInterceptador, alterar);

/**
 * @swagger
 * /tiago/categoria/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categoria]
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
 *         description: Categoria removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasCategorias.delete('/:id', autenticadorInterceptador, remover);

export = rotasCategorias;
