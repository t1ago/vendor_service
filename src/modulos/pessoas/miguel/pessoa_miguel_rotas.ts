import express from "express";
import { control_inativar, control_get, control_insert, control_update, control_Vinculos, control_Endereco, control_getPorId } from "./pessoa_miguel_controlador";

const rotasPessoasMiguel = express.Router();

rotasPessoasMiguel.get("/vinculos", control_Vinculos);

rotasPessoasMiguel.get("/endereco/:id", control_Endereco);

rotasPessoasMiguel.get("/:id", control_getPorId);

rotasPessoasMiguel.get("/", control_get);

rotasPessoasMiguel.post("/", control_insert);

rotasPessoasMiguel.put("/inativar/:id", control_inativar);

rotasPessoasMiguel.put("/:id", control_update);


export default rotasPessoasMiguel;
