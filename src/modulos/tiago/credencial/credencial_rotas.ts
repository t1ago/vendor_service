import express from 'express';
import { buscarUsuario, validarLogin } from './credencial_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasCredencialTiago = express.Router();

rotasCredencialTiago.post('/login', validarLogin);
rotasCredencialTiago.get('/usuario', autenticadorInterceptador, buscarUsuario);

export = rotasCredencialTiago;
