
import { responseAPI } from "../../../utils/utils"
import { inserirGrupoServico, alterarGrupoServico, removerGrupoServico, buscarGrupoServico, buscarGruposServico} from "./grupo_servico"
import { Request, Response } from "express"

export const inserirGrupo = async (req: Request, res: Response) => {
    const parametros = {
        nome: req.body.nome
    }
    const resultado = await inserirGrupoServico(parametros);
    responseAPI(res,resultado);
}

export const alterarGrupo = async (req: Request, res: Response) => {
    const parametros = {
        nome: req.body.nome,
        id: req.params.id
    }
    const resultado = await alterarGrupoServico(parametros);
    responseAPI(res,resultado);
}

export const removerGrupo = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id
    }
    const resultado = await removerGrupoServico(parametros);
    responseAPI(res,resultado);
}

export const buscarGrupo = async (req: Request, res: Response) => {
    const parametros = {
        id: req.params.id
    }
    const resultado = await buscarGrupoServico(parametros);
    responseAPI(res,resultado);
}

export const buscarGrupos = async (_: Request, res: Response) => {
    const resultado = await buscarGruposServico()
    responseAPI(res,resultado);
}