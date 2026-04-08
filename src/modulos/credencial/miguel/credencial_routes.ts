
import express from "express";
import { credencial_selected } from "./credencial_controler";


const rotasCredencial_miguel = express.Router();


rotasCredencial_miguel.post("/", credencial_selected)


export = rotasCredencial_miguel;
