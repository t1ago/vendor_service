import { Request, Response} from "express"
import { 
    criarCorServico,
    alterarCorServico,
    removerCorServico,
    buscarCorServico,
    buscarCoresServico
 } from "./cores_servico"


export const criarCor = async (req: Request, res: Response) => {
    const cor = {
        'hexadecimal': req.body.hexadecimal
    }
    const resultado = await criarCorServico(cor)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const alterarCor = async (req: Request, res: Response) => {
    const cor = {
        'id': req.params.id,
        'hexadecimal': req.body.hexadecimal
    }
    const resultado = await alterarCorServico(cor)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const removerCor = async (req: Request, res: Response) => {
    const cor = {
        'id': req.params.id
    }
    const resultado = await removerCorServico(cor)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const buscarCor = async (req: Request, res: Response) => {
    const cor = {
        'id': req.params.id
    }
    const resultado = await buscarCorServico(cor)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const buscarCores = async (req: Request, res: Response) => {
    const resultado = await buscarCoresServico()
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

