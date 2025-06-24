
import { novogrupo, alterargruposervico, removergruposervico, buscargrupoServico, buscargruposServico} from "./grupo_servico"
import { Request, Response } from "express"

export const inserirgrupo = async (req: Request, res: Response) => {
    let grupoparametros = {
        nome: req.body.nome
    }
    const resultado = await novogrupo(grupoparametros)
    if(resultado.mensagem === "") {
        res.json(resultado);
    } else {
        res.status(500).json(resultado)
    }
    
}

export const alterargrupo = async (req: Request, res: Response) => {
    let alterarparametros = {
        id: req.params.id,
        nome: req.body.nome
    }
    const resultado = await alterargruposervico(alterarparametros)
    if( resultado.mensagem === ""){
        res.json(resultado);
    } else {
        res.status(500).json(resultado)
    }
}

export const removergrupo = async (req: Request, res: Response) => {
    let deletegrupo = {
        'id': req.params.id 
    }
    const resultado = await removergruposervico(deletegrupo)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

export const buscargrupo = async (req: Request, res: Response) => {
    let gruposearch = { 
        id: req.params.id
     }
    const resultado = await buscargrupoServico(gruposearch);
    if (resultado.mensagem === "") {
        res.json(resultado)
    } else {
       res.status(500).json(resultado)
    }
}

export const buscargrupos = async (req: Request, res: Response) => {
    const resultado = await buscargruposServico();
    if (resultado.mensagem === "") {
         res.json(resultado);
     } else {
        res.status(500).json(resultado);
    }
}