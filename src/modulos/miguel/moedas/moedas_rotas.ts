import express from 'express';
import { autenticadorInterceptador } from '../../../utils/utils';
import { buscar, delet, inserir, update } from './moedas_controlador';

const miguel_moedas = express.Router();

miguel_moedas.get('/', autenticadorInterceptador, buscar);
miguel_moedas.post('/', autenticadorInterceptador, inserir);
miguel_moedas.put('/:id', autenticadorInterceptador, update);
miguel_moedas.delete('/:id', autenticadorInterceptador, delet);

export default miguel_moedas;
