import express from "express";
import {
    insert_endereco,
    update_endereco,
    delete_endereco,
    get_endereco
} from "./endereco_miguel_controlador";

const rotasEnderecos = express.Router();

rotasEnderecos.get("/", get_endereco);             // lista tudo
rotasEnderecos.get("/:id", get_endereco);          // busca por ID
rotasEnderecos.post("/", insert_endereco);         // cria
rotasEnderecos.put("/:id", update_endereco);       // atualiza
rotasEnderecos.delete("/:id", delete_endereco);    // deleta

export default rotasEnderecos;
