import express, { Request, Response } from "express"
import cors from "cors"
import rotasCategorias from "./modulos/produtos/categorias/categorias_rotas"
import rotasCores from "./modulos/produtos/cores/cores_rotas"

/** Constantes do Servidor*/
const app = express()
const port = process.env.API_PORT || 4000

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

/** Inicia o Servidor */
app.listen(port, () => {
  console.log(`Vendor Service (estudos) listen on PORT: ${port}`)
})

