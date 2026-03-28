import express from "express";
import { validarLogin } from "./login_controlador";

const rotasLoginTiago = express.Router();

rotasLoginTiago.post("/", validarLogin);

export = rotasLoginTiago;
