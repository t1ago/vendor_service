import axios from "axios";
import { processarRequest } from "../../../utils/utils";

const url_buscar_estado = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const url_buscar_cep = "https://viacep.com.br/ws/{CEP}/json/";

export const servicoEstados = async() => {
    const resultado = processarRequest(
        axios.get(url_buscar_estado),(dados:any)=>{
            return dados.map((estado:any) => {
                return {
                    sigla: estado.sigla,
                    nome: estado.nome
                }
            }) 
        }
    );
    return resultado;
}

export const servicoCep = async(cep:string) => {
    
    const resultado = processarRequest(
        axios.get(url_buscar_cep.replace("{CEP}",cep)),
        (local: any)=> {
            return {
                logradouro : local.logradouro,
                bairro : local.bairro,
                cidade : local.localidade,
                estado : {sigla: local.uf,estado: local.estado},
                cep : local.cep
            } as any;
        }
    );
    return resultado;
}