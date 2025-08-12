import  express from "express";
import { buscar_new, NovoDelete, NovoPost, NovoUpdate } from "./fornecedor_miguel_controlador";

const rotasfornecedor_miguel = express.Router()


rotasfornecedor_miguel.get("/", buscar_new)
rotasfornecedor_miguel.post("/", NovoPost)
rotasfornecedor_miguel.put("/", NovoUpdate)
rotasfornecedor_miguel.delete("/", NovoDelete)

export = rotasfornecedor_miguel