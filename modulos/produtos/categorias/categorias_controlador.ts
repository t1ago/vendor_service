import { Request, Response} from "express"
import { 
    criarCategoriaServico,
    alterarCategoriaServico,
    removerCategoriaServico,
    buscarCategoriaServico,
    buscarCategoriasServico
 } from "./categorias_servico"


export const criarCategoria = async (req: Request, res: Response) => {
    const categoria = {
        'nome': req.body.nome
    }
    const resultado = await criarCategoriaServico(categoria)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const alterarCategoria = async (req: Request, res: Response) => {
    const categoria = {
        'id': req.params.id,
        'nome': req.body.nome
    }
    const resultado = await alterarCategoriaServico(categoria)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const removerCategoria = async (req: Request, res: Response) => {
    const categoria = {
        'id': req.params.id
    }
    const resultado = await removerCategoriaServico(categoria)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const buscarCategoria = async (req: Request, res: Response) => {
    const categoria = {
        'id': req.params.id
    }
    const resultado = await buscarCategoriaServico(categoria)
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}
    
export const buscarCategorias = async (req: Request, res: Response) => {
    const resultado = await buscarCategoriasServico()
    if (resultado.mensagem == "") {
        res.json(resultado)
    } else {
        res.status(500).json(resultado)
    }
}

