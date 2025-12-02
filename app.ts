import express, { Request, Response } from "express"
import cors from "cors"
import rotasCategorias from "./src/produtos/categorias/categorias_rotas"
import { rotaProdutoVictor } from "./src/produtos/produto/victor/produto_rotas"
import rotasProdutoTiago from "./src/produtos/produto/tiago/produto_rotas"
import rota from "./src/produtos/marca/marca_rotas"
import gruporota from "./src/produtos/grupo/grupo_rotas"
import { rotas_moedas } from "./src/produtos/moedas/moedas_rotas"
import rotasCores from "./src/produtos/cores/cores_rotas"
import rotasMedidas from "./src/produtos/medidas/medidas_rotas"
import rotasfornecedor_miguel from "./src/produtos/fornecedores/miguel/fornecedor_miguel_rotas"
import rotasEnderecoTiago from "./src/enderecos/tiago/endereco_rotas"
import rotasPessoasTiago from "./src/pessoas/tiago/pessoas_rotas"
import rotasFornecedoresDam from "./src/produtos/fornecedores/dam/fornecedores_rotas";
import { rotaPessoaVictor } from "./src/pessoas/victor/pessoas_rotas"

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

/**Danilo */
app.use("/cores", rotasCores)
app.use("/medidas", rotasMedidas)
app.use("/fornecedoresDam", rotasFornecedoresDam);

/**Tiago */
app.use("/categorias", rotasCategorias)
app.use("/produtos/tiago", rotasProdutoTiago)
app.use("/enderecos/tiago", rotasEnderecoTiago)
app.use("/pessoas/tiago", rotasPessoasTiago)
app.use("/pessoas/victor", rotaPessoaVictor)


/** Inicia o Servidor */
app.listen(port, () => {
  console.log(`Vendor Service (estudos) listen on PORT: ${port}`)
})

