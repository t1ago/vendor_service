import express from "express";
import { control_inativar, control_get, insert, update } from "./pessoa_miguel_controlador";

const rotasPessoasMiguel = express.Router();


rotasPessoasMiguel.get("/", control_get);
rotasPessoasMiguel.post("/", insert);
rotasPessoasMiguel.put("/inativar/:id", control_inativar);
rotasPessoasMiguel.put("/:id", update);

export default rotasPessoasMiguel;
