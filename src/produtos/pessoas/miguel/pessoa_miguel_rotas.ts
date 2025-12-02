import express from "express";
import { control_delete, control_get, insert, update } from "./pessoa_miguel_controlador";

const rotasPessoasMiguel = express.Router()

rotasPessoasMiguel.get("/", control_get)
rotasPessoasMiguel.get("/:id", control_get)
rotasPessoasMiguel.post("/", insert)
rotasPessoasMiguel.put("/:id", update)
rotasPessoasMiguel.delete("/:id", control_delete)

export default rotasPessoasMiguel;

