import express from 'express';
import { buscarUsuario, validarLogin } from './credencial_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasCredencialTiago = express.Router();

/**
 * @swagger
 * tags:
 *   name: Credencial
 *   description: Autenticação e dados do usuário logado
 */

/**
 * @swagger
 * /tiago/credencial/login:
 *   post:
 *     summary: Autentica um usuário via Basic Auth e retorna um JWT
 *     tags: [Credencial]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Credencial inválida ou header ausente
 *       500:
 *         description: Erro interno
 */
rotasCredencialTiago.post('/login', validarLogin);

/**
 * @swagger
 * /tiago/credencial/usuario:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Credencial]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário logado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponse'
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno
 */
rotasCredencialTiago.get('/usuario', autenticadorInterceptador, buscarUsuario);

export = rotasCredencialTiago;
