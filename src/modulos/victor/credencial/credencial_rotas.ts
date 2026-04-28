import express from "express";
import { buscarUsuario, validarCredencial } from "./credencial_controlador";
import { autentificadorInterruptor } from "../../../utils/victor/utils";

const rotasVictorCredencial = express.Router();
rotasVictorCredencial.post("/login",validarCredencial);
rotasVictorCredencial.get("/usuario",autentificadorInterruptor,buscarUsuario);

export = rotasVictorCredencial