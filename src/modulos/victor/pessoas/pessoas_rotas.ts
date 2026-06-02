import express from "express";
import { criar,atualizar,inativar, buscar, buscarVinculos,buscarEnderecos } from "./pessoas_controlador";

export const rotaPessoaVictor = express.Router();
rotaPessoaVictor.post("/",criar);
rotaPessoaVictor.put("/:id",atualizar);
rotaPessoaVictor.put("/i/:id",inativar);
rotaPessoaVictor.get("/v",buscarVinculos);
rotaPessoaVictor.get("/",buscar);
rotaPessoaVictor.get("/:id",buscar);
rotaPessoaVictor.get("/e/:id",buscarEnderecos);