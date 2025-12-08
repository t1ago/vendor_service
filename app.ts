import express, { Request, Response } from "express"
import cors from "cors"
import { rotas_moedas } from "./src/modulos/produtos/moedas/moedas_rotas"
import rotasfornecedor_miguel from "./src/modulos/produtos/fornecedores/miguel/fornecedor_miguel_rotas"
import rota from "./src/modulos/produtos/marca/marca_rotas"
import gruporota from "./src/modulos/produtos/grupo/grupo_rotas"
import { rotaProdutoVictor } from "./src/modulos/produtos/produto/victor/produto_rotas"
import rotasCores from "./src/modulos/produtos/cores/cores_rotas"
import rotasMedidas from "./src/modulos/produtos/medidas/medidas_rotas"
import rotasFornecedoresDam from "./src/modulos/produtos/fornecedores/dam/fornecedores_rotas"
import rotasCategorias from "./src/modulos/produtos/categorias/categorias_rotas"
import rotasProdutoTiago from "./src/modulos/produtos/produto/tiago/produto_rotas"
import rotasEnderecoTiago from "./src/modulos/enderecos/tiago/endereco_rotas"
import rotasPessoasTiago from "./src/modulos/pessoas/tiago/pessoas_rotas"
import { rotaPessoaVictor } from "./src/modulos/pessoas/victor/pessoas_rotas"
/** Constantes do Servidor*/
const app = express()
const port = process.env.API_PORT || 3000

/** Configuração do Servidor */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "*",
  credentials: true
}))


/** Criação de Rotas */
app.get("/", (req: Request, res: Response) => {
  res.json({ 'status': 'OK' })
});


/**Miguel */
app.use("/moedas", rotas_moedas)
app.use("/fornecedor/miguel", rotasfornecedor_miguel)

/**Victor */
app.use("/marca", rota)
app.use("/grupos", gruporota)
app.use("/produto/victor", rotaProdutoVictor)
app.use("/pessoas/victor",rotaPessoaVictor)

/**Danilo */
app.use("/cores", rotasCores)
app.use("/medidas", rotasMedidas)
app.use("/fornecedoresDam", rotasFornecedoresDam);

/**Tiago */
app.use("/categorias", rotasCategorias)
app.use("/produtos/tiago", rotasProdutoTiago)
app.use("/enderecos/tiago", rotasEnderecoTiago)
app.use("/pessoas/tiago", rotasPessoasTiago)



/** Inicia o Servidor */
app.listen(port, () => {
  console.log(`Vendor Service (estudos) listen on PORT: ${port}`)
})

