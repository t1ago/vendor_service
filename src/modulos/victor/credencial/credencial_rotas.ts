import express from "express";
import { buscarUsuario, validarCredencial } from "./credencial_controlador";
import { autentificadorInterruptor } from "../../../utils/victor/utils";

const rotasCredencialVictor = express.Router();
rotasCredencialVictor.post("/login",validarCredencial);
rotasCredencialVictor.get("/usuario",autentificadorInterruptor,buscarUsuario);

export = rotasCredencialVictor