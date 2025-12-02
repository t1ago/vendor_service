import express  from "express";
import { inativo, novaAtualiza, novaBusca, novaPessoa } from "./pessoas_controlador";


export const rotaPessoaVictor = express.Router()
rotaPessoaVictor.post("/",novaPessoa)
rotaPessoaVictor.get("/",novaBusca)
rotaPessoaVictor.put("/:id",novaAtualiza)
rotaPessoaVictor.put("/inativo/:id",inativo)