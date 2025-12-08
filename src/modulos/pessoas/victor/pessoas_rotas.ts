import express from "express";
import { criar,atualizar,inativar } from "./pessoas_controlador";

export const rotaPessoaVictor = express.Router();
rotaPessoaVictor.post("/",criar);
rotaPessoaVictor.put("/:id",atualizar);
rotaPessoaVictor.put("/i/:id",inativar);