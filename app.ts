import express, { Request, Response } from "express"
import cors from "cors"
import rotasCategorias from "./src/produtos/categorias/categorias_rotas"
import rotasFornecedoresTiago from "./src/produtos/fornecedores/tiago/fornecedores_rotas"
import { rotaProdutoVictor } from "./src/produtos/produto/victor/produto_rotas"
import rota from "./src/produtos/marca/marca_rotas"
import gruporota from "./src/produtos/grupo/grupo_rotas"
import { rotas_moedas } from "./src/produtos/moedas/moedas_rotas"
import rotasCores from "./src/produtos/cores/cores_rotas"
import rotasMedidas from "./src/produtos/medidas/medidas_rotas"
import rotasfornecedor_miguel from "./src/produtos/fornecedores/miguel/fornecedor_miguel_rotas"


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

app.use("/categorias", rotasCategorias)
app.use("/cores", rotasCores)
app.use("/medidas", rotasMedidas)
app.use("/fornecedores/tiago", rotasFornecedoresTiago)
app.use("/produto/victor", rotaProdutoVictor)
app.use("/marca", rota)
app.use("/grupos", gruporota)
app.use("/fornecedor/miguel", rotasfornecedor_miguel)
app.use("/moedas", rotas_moedas)


/** Inicia o Servidor */
app.listen(port, () => {
  console.log(`Vendor Service (estudos) listen on PORT: ${port}`)
})

