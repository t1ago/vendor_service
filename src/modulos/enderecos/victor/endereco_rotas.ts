import express from 'express';
import { buscarEstados,buscarPorCep } from './endereco_controlador';

export const rotaEnderecoVictor = express.Router();
rotaEnderecoVictor.get("/localidade/cep",buscarPorCep);
rotaEnderecoVictor.get("/estados",buscarEstados);