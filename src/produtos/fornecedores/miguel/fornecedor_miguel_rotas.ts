import express from "express";
import { buscar_new, NovoDelete, NovoPost, NovoUpdate } from "./fornecedor_miguel_controlador";

const rotasfornecedor_miguel = express.Router();

rotasfornecedor_miguel.get("/:id", buscar_new);
rotasfornecedor_miguel.post("/", NovoPost);
rotasfornecedor_miguel.put("/:id", NovoUpdate); 
rotasfornecedor_miguel.delete("/:id", NovoDelete); 


export = rotasfornecedor_miguel;