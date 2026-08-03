import express from 'express';
import { alterarCor, buscarCor, criarCor, deletarCor } from './cor_controlador';
import { autenticadorInterceptador } from '../../../utils/utils';

const rotasVictorCor = express.Router();
rotasVictorCor.post('/',autenticadorInterceptador, criarCor);
rotasVictorCor.get('/',autenticadorInterceptador, buscarCor);
rotasVictorCor.get('/:id',autenticadorInterceptador, buscarCor);
rotasVictorCor.put('/:id',autenticadorInterceptador, alterarCor);
rotasVictorCor.delete('/:id',autenticadorInterceptador, deletarCor);

export = rotasVictorCor;
