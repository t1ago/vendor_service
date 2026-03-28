import express from 'express';
import { validarLogin } from './login_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasLoginTiago = express.Router();

rotasLoginTiago.post('/', autenticadorInterceptador, validarLogin);

export = rotasLoginTiago;
