import express from 'express';
import { alterar, buscar, criar, remover } from './produto_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasProdutoTiago = express.Router();

rotasProdutoTiago.get('/', autenticadorInterceptador, buscar);
rotasProdutoTiago.get('/:id', autenticadorInterceptador, buscar);
rotasProdutoTiago.post('/', autenticadorInterceptador, criar);
rotasProdutoTiago.put('/:id', autenticadorInterceptador, alterar);
rotasProdutoTiago.delete('/:id', autenticadorInterceptador, remover);

export = rotasProdutoTiago;
