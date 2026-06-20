import express from 'express';
import { autenticadorInterceptador } from '../../../utils/utils';
import { alterar, buscar, buscarEndereco, buscarVinculos, criar, inativar } from './pessoas_controlador';

const rotasPessoasTiago = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pessoa
 *   description: Cadastro de pessoas físicas e jurídicas
 */

/**
 * @swagger
 * /tiago/pessoa/vinculos:
 *   get:
 *     summary: Lista pessoas jurídicas ativas para uso como vínculo
 *     tags: [Pessoa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vínculos disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PessoaVinculoListaResponse'
 *       500:
 *         description: Erro interno
 */
rotasPessoasTiago.get('/vinculos', autenticadorInterceptador, buscarVinculos);

/**
 * @swagger
 * /tiago/pessoa:
 *   post:
 *     summary: Cria uma nova pessoa com endereços
 *     tags: [Pessoa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PessoaInput'
 *     responses:
 *       200:
 *         description: Pessoa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro de validação ou banco de dados
 */
rotasPessoasTiago.post('/', autenticadorInterceptador, criar);

/**
 * @swagger
 * /tiago/pessoa/{id}:
 *   put:
 *     summary: Altera os dados de uma pessoa e seus endereços
 *     tags: [Pessoa]
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
 *             $ref: '#/components/schemas/PessoaInput'
 *     responses:
 *       200:
 *         description: Pessoa alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdResponse'
 *       500:
 *         description: Erro interno
 */
rotasPessoasTiago.put('/:id', autenticadorInterceptador, alterar);

/**
 * @swagger
 * /tiago/pessoa/inativar/{id}:
 *   put:
 *     summary: Inativa uma pessoa (exclusão lógica)
 *     tags: [Pessoa]
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
 *         description: Pessoa inativada com sucesso
 *       500:
 *         description: Erro interno
 */
rotasPessoasTiago.put('/inativar/:id', autenticadorInterceptador, inativar);

/**
 * @swagger
 * /tiago/pessoa:
 *   get:
 *     summary: Busca todas as pessoas por tipo ou por termo de pesquisa
 *     tags: [Pessoa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tipo_pessoa
 *         required: true
 *         schema:
 *           type: string
 *           enum: [F, J]
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Termo de busca (nome, apelido, documento, endereço)
 *     responses:
 *       200:
 *         description: Lista de pessoas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PessoaListaResponse'
 *       500:
 *         description: Tipo de pessoa não informado ou erro interno
 */
rotasPessoasTiago.get('/', autenticadorInterceptador, buscar);

/**
 * @swagger
 * /tiago/pessoa/{id}:
 *   get:
 *     summary: Busca uma pessoa pelo ID com seus endereços
 *     tags: [Pessoa]
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
 *         description: Dados da pessoa com endereços
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PessoaResponse'
 *       500:
 *         description: Erro interno
 */
rotasPessoasTiago.get('/:id', autenticadorInterceptador, buscar);

/**
 * @swagger
 * /tiago/pessoa/{id}/enderecos/{id_endereco}:
 *   get:
 *     summary: Busca um endereço específico de uma pessoa
 *     tags: [Pessoa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_endereco
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do endereço
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnderecoResponse'
 *       500:
 *         description: Erro interno
 */
rotasPessoasTiago.get('/:id/enderecos/:id_endereco', autenticadorInterceptador, buscarEndereco);

export = rotasPessoasTiago;
