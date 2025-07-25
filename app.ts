import express, { Request, Response } from "express"
import cors from "cors"
import rotasCategorias from "./src/produtos/categorias/categorias_rotas"
import rotasFornecedoresTiago from "./src/produtos/fornecedores/tiago/fornecedores_rotas"
import gruporota from "./src/produtos/grupo/grupo_rotas"
import rotasfornecedor_miguel from "./src/produtos/fornecedor_miguel/fornecedor_miguel_rotas"
import { rotas_moedas } from "./src/produtos/moedas/moedas_rotas"


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
app.use("/fornecedores/tiago", rotasFornecedoresTiago)
app.use("/grupos", gruporota)
app.use("/fornecedor/miguel", rotasfornecedor_miguel)
app.use("/moedas", rotas_moedas)


/** Inicia o Servidor */
app.listen(port, () => {
  console.log(`Vendor Service (estudos) listen on PORT: ${port}`)
})

