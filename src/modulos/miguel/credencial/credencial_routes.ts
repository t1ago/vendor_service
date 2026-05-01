
import express from "express";

import { authenticadorInteceptador } from "../../../utils/miguel/utils";
import { credencial_selected, getUsuario } from "./credencial_controler";



const miguel_credencial = express.Router();


miguel_credencial.post("/", credencial_selected)
miguel_credencial.get("/", authenticadorInteceptador, getUsuario)


export = miguel_credencial;
