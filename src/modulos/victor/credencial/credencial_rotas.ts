import express from "express";
import { buscarUsuario, validarCredencial } from "./credencial_controlador";
import { autentificadorInterruptor } from "../../../utils/victor/utils";

const rotaCredencialVictor = express.Router();
rotaCredencialVictor.post("/login",validarCredencial);
rotaCredencialVictor.get("/usuario",autentificadorInterruptor,buscarUsuario);

export = rotaCredencialVictor