// /src/produtos/clientes/dam/clientes.rotas.ts

import { Router } from "express";
import * as controleClientes from "./clientes.controle";

const router = Router();

router.post('/', controleClientes.criarPessoa);

router.get('/', controleClientes.buscarTudo);
router.get('/id/:id', controleClientes.buscarPessoaPorId);
router.get('/nome', controleClientes.pesquisarComNome);

router.put('/id/:id', controleClientes.atualizarPessoa);

router.delete('/id/:id', controleClientes.deletarPessoa);

export default router;