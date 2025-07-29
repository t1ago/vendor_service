/* app.get("/", (req: Request, res: Response) => {
  res.json({'status': 'OK'})
}); */

import { Request, Response } from "express";
import {
  inserirMedida,
  buscarTodasMedidas,
  buscarPorId,
  atualizarMedida,
  apagarMedida
} from "./medidas_servico";

export const criarMedida = async (req: Request, res: Response) => {
  const parametrosMedidas = { nome: req.body.nome };
  const resultado = await inserirMedida(parametrosMedidas);
  res.json(resultado);
};

export const listarMedidas = async (req: Request, res: Response) => {
  const resultado = await buscarTodasMedidas();
  res.json(resultado);
};

export const buscarMedida = async (req: Request, res: Response) => {
 
  try {
    const id = parseInt(req.params.id);
    
    const resultado = await buscarPorId(id);
    res.json(resultado);

  } catch (e) {
    res.status(400).json({
      executado: false,
      mensagem: "Erro ao buscar a medida, verifique o ID e tente novamente.",
      data: {}
    })
  }
};

export const alterarMedida = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const nome = req.body.nome;

    const resultado = await atualizarMedida(id, nome);
    res.json(resultado);

  } catch (erro) {
    res.status(400).json({
      executado: false,
      mensagem: "Erro ao atualizar a medida. Verifique o ID e o nome.",
      data: {}
    })
  }
}

export const removerMedida = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const resultado = await apagarMedida(id);
    res.json(resultado);

  } catch (erro) {
    res.status(400).json({
      executado: false,
      mensagem: "Erro ao atualizar a medida. Verifique o ID e o nome.",
      data: {}
    })
  }
}