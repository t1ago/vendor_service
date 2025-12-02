
import axios from "axios"
import { processarRequest } from "../../../utils/utils"

const API_BUSCAR_ESTADOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const API_BUSCAR_LOCALIDADE_POR_CEP = 'https://viacep.com.br/ws/{CEP}/json/'

export const buscarTodosEstados = async () => {

    const resultado = processarRequest(
        axios.get(API_BUSCAR_ESTADOS),
        (data: any) => {
            return data.map((estado: any) => {
                return {
                    sigla: estado.sigla,
                    nome: estado.nome
                }
            });
        }
    )

    return resultado;
}

export const buscarLocalidadePorCep = async (cep: string) => {

    const resultado = processarRequest(
        axios.get(`${API_BUSCAR_LOCALIDADE_POR_CEP.replace('{CEP}', cep)}`),
        (data: any) => {
            return {
                cep: data.cep,
                estado: { sigla: data.uf, nome: data.estado },
                cidade: data.localidade,
                bairro: data.bairro,
                logradouro: data.logradouro
            } as any;
        }
    )

    return resultado;
}

