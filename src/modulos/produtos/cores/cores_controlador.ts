import { Request, Response} from "express"
import { apagarCor, atualizarCor, buscarCor, buscarCorId, inserirCor } from "./cores_servico";

export const criarCor = async (req: Request, res: Response) => {
    const { hexadecimal, ativo } = req.body;

    const resultado = await inserirCor (hexadecimal, ativo);
    res.json(resultado);
}

export const listarCor = async (req: Request, res: Response) => {
    const resultado = await buscarCor();
    res.json(resultado);
}

export const listarCorId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const resultado = await buscarCorId(id);
        res.json(resultado);

    } catch (erro) {
        res.status(400).json({
            executado: false,
            mensagem: `Foda em, não conseguiu buscar né? MSG: ${erro}`,
            data: {}
        });
    }
};

export const alterarCor = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { hexadecimal, ativo } = req.body;

        const resultado = await atualizarCor (id, hexadecimal, ativo)
        res.json(resultado);
    } catch(erro) {
        res.status(400).json({
            executado: false,
            mensagem: "Não foi dessa vez, tente novamente! =(",
            data: {}
        });
    }
};

export const romverCor = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        
        const resultado = await apagarCor(id);
        res.json(resultado);

    } catch (erro) {
    res.status(400).json({
      executado: false,
      mensagem: "Não foi dessa vez campeão!",
      data: {}
    })
  }
}