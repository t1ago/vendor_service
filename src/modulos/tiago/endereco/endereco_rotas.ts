import express from 'express';
import { buscarEstados, buscarLocalidadeCep } from './endereco_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasEnderecoTiago = express.Router();

rotasEnderecoTiago.get('/estados', autenticadorInterceptador, buscarEstados);
rotasEnderecoTiago.get('/localidade/:cep', autenticadorInterceptador, buscarLocalidadeCep);

export = rotasEnderecoTiago;
