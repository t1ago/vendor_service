import { inserirCor } from "./cores_servico";
import {Request, Response} from "express"

export const criarCor = async (req: Request, res: Response) => {
    let paramentosCores = {
        hexadecimal: req.body.hex,
        ativo: req.body.ativo
    }
    const resultado = await inserirCor (paramentosCores)
    res.json(resultado)
}