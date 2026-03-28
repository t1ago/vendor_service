import express from 'express';
import { buscarVinculos, criar, buscar, inativar, buscarEndereco, alterar } from './pessoas_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasPessoasTiago = express.Router();

rotasPessoasTiago.get('/vinculos', autenticadorInterceptador, buscarVinculos);
rotasPessoasTiago.post('/', autenticadorInterceptador, criar);
rotasPessoasTiago.put('/:id', autenticadorInterceptador, alterar);
rotasPessoasTiago.put('/inativar/:id', autenticadorInterceptador, inativar);
rotasPessoasTiago.get('/', autenticadorInterceptador, buscar);
rotasPessoasTiago.get('/:id', autenticadorInterceptador, buscar);
rotasPessoasTiago.get('/enderecos/:id', autenticadorInterceptador, buscarEndereco);

export = rotasPessoasTiago;
