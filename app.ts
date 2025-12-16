import express, { Request, Response } from "express"
import cors from "cors"
import { rotas_moedas } from "./src/modulos/produtos/moedas/moedas_rotas"
import rotasfornecedor_miguel from "./src/modulos/produtos/fornecedores/miguel/fornecedor_miguel_rotas"
import rota from "./src/modulos/produtos/marca/marca_rotas"
import gruporota from "./src/modulos/produtos/grupo/grupo_rotas"
import rotasPessoasMiguel from "./src/modulos/pessoas/miguel/pessoa_miguel_rotas"




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
app.use("/grupos", gruporota)
app.use("/pessoa/miguel", rotasPessoasMiguel);

/**Victor */
app.use("/marca", rota)
app.use("/moedas", rotas_moedas)

/** Inicia o Servidor */
app.listen(port, () => {
  console.log(`Vendor Service (estudos) listen on PORT: ${port}`)
})

