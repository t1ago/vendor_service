import express from 'express';
import { autenticadorInterceptador } from '../../../utils/utils';
import { alterar, buscar, buscarEndereco, buscarVinculos, criar, inativar } from './pessoas_controlador';

const rotasPessoasTiago = express.Router();

rotasPessoasTiago.get('/vinculos', autenticadorInterceptador, buscarVinculos);
rotasPessoasTiago.post('/', autenticadorInterceptador, criar);
rotasPessoasTiago.put('/:id', autenticadorInterceptador, alterar);
rotasPessoasTiago.put('/inativar/:id', autenticadorInterceptador, inativar);
rotasPessoasTiago.get('/', autenticadorInterceptador, buscar);
rotasPessoasTiago.get('/:id', autenticadorInterceptador, buscar);
rotasPessoasTiago.get('/:id/enderecos/:id_endereco', autenticadorInterceptador, buscarEndereco);

export = rotasPessoasTiago;
