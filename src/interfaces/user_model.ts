import { IResultadoAPI } from "./resultado_api";


export interface IUserModel extends IResultadoAPI {

    id: any,
    nome: any,
    email: any,
    password: any,
    perfil: any,
    status: any

}

// Interface de usuários para a tela de front-end retorno de API - PERSONALIZADO para se adapatar para qualquer jeito de receber; dia 08/04