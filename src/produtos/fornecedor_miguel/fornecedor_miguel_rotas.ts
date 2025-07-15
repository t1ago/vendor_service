import  express from "express";
import { NovoDelete, NovoGet_All, NovoGet_Id, NovoGet_Name, NovoPost, NovoUpdate } from "./fornecedor_miguel_controlador";

const rotasfornecedor_miguel = express.Router()


rotasfornecedor_miguel.get("/:id", NovoGet_Id)
rotasfornecedor_miguel.get("/", NovoGet_Name)
rotasfornecedor_miguel.get("/", NovoGet_All)
rotasfornecedor_miguel.post("/", NovoPost)
rotasfornecedor_miguel.put("/", NovoUpdate)
rotasfornecedor_miguel.delete("/", NovoDelete)

export = rotasfornecedor_miguel