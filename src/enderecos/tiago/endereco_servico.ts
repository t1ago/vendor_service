
import axios from "axios"
import { Resultado } from "../../../commons/resultado_api"

const API_BUSCAR_ESTADOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const API_BUSCAR_LOCALIDADE_POR_CEP = 'https://viacep.com.br/ws/{CEP}/json/'

const resultado: Resultado = {
    executado: false,
    mensagem: "",
    data: {}
}

const limparResultado = () => {
    resultado.executado = false,
        resultado.mensagem = "",
        resultado.data = {}
}

export const buscarTodosEstados = async () => {
    limparResultado()

    try {
        const response = await axios.get(API_BUSCAR_ESTADOS);

        resultado.executado = true
        resultado.mensagem = ""
        resultado.data = (await response.data || []).map((estado: any) => {
            return {
                sigla: estado.sigla,
                nome: estado.nome
            }
        })
    } catch (erro) {
        resultado.executado = true
        resultado.mensagem = `A busca de Estados falhou com a MSG: ${erro}`
    }

    return resultado
}

export const buscarLocalidadePorCep = async (cep: string) => {
    limparResultado()

    try {
        const response = await axios.get(`${API_BUSCAR_LOCALIDADE_POR_CEP.replace('{CEP}', cep)}`);
        resultado.executado = true
        resultado.mensagem = ""

        const dados = await response.data

        if (dados.erro == undefined) {
            resultado.data = {
                cep: dados.cep,
                estado: { sigla: dados.uf, nome: dados.estado },
                cidade: dados.localidade,
                bairro: dados.bairro,
                logradouro: dados.logradouro
            }
        } else {
            throw new Error('Address not found')
        }
    } catch (erro) {
        limparResultado()
    }

    return resultado
}

