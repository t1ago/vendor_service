import { novogrupo, alterargruposervico, removergruposervico, buscargrupoServico } from "./grupo_servico"
import { Request, Response } from "express"

export const inserirgrupo = async (req: Request, res: Response) => {
    let grupoparametros = {
        nome: req.body.nome
    }
    const resultado = await novogrupo(grupoparametros)
    res.json(resultado)
}


export const alterargrupo = async (req: Request, res: Response) => {
    let alterarparametros = {
        id: req.params.id,
        nome: req.body.nome
    }
    const resultado = await alterargruposervico(alterarparametros)
    if(resultado.mensagem == "") {
    } else {
        res.json(resultado)
    }
}

export const removergrupo = async (req: Request, res: Response) => {
    let deletegrupo = {
        id: req.body.id
    }
    const resultado = await removergruposervico(deletegrupo)
    if (resultado.mensagem == "") {
    } else {
        res.json(resultado)
    }
}

export const buscargrupo = async (req: Request, res: Response) => {
    let gruposearch = { 
        id: req.params.id
     }
     console.log(req.params)
   const resultado = await buscargrupoServico(gruposearch);
   if (resultado.mensagem === "") {
    } else {
      res.json(resultado)
    }
}