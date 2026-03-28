import express, { Request, Response } from "express";
import cors from "cors";
import { rotas_moedas } from "./src/modulos/produtos/moedas/moedas_rotas";
import rotasfornecedor_miguel from "./src/modulos/produtos/fornecedores/miguel/fornecedor_miguel_rotas";
import rota from "./src/modulos/produtos/marca/marca_rotas";
import gruporota from "./src/modulos/produtos/grupo/grupo_rotas";
import { rotaProdutoVictor } from "./src/modulos/produtos/produto/victor/produto_rotas";
import rotasCores from "./src/modulos/produtos/cores/cores_rotas";
import rotasMedidas from "./src/modulos/produtos/medidas/medidas_rotas";
import rotasFornecedoresDam from "./src/modulos/produtos/fornecedores/dam/fornecedores_rotas";
import rotasTiagoCategoria from "./src/modulos/tiago/categoria/categoria_rotas";
import rotasTiagoEndereco from "./src/modulos/tiago/endereco/endereco_rotas";
import rotasTiagoPessoa from "./src/modulos/tiago/pessoa/pessoas_rotas";
import rotasTiagoProduto from "./src/modulos/tiago/produto/produto_rotas";
import rotasTiagoLogin from "./src/modulos/tiago/login/login_rotas";

/** Constantes do Servidor*/
const app = express();
const port = process.env.API_PORT || 3000;

/** Configuração do Servidor */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

/** Criação de Rotas */
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

/**Miguel */
app.use("/moedas", rotas_moedas);
app.use("/fornecedor/miguel", rotasfornecedor_miguel);

/**Victor */
app.use("/marca", rota);
app.use("/grupos", gruporota);
app.use("/produto/victor", rotaProdutoVictor);

/**Danilo */
app.use("/cores", rotasCores);
app.use("/medidas", rotasMedidas);
app.use("/fornecedoresDam", rotasFornecedoresDam);

/**Tiago */
app.use("/tiago/categorias", rotasTiagoCategoria);
app.use("/tiago/produtos", rotasTiagoProduto);
app.use("/tiago/enderecos", rotasTiagoEndereco);
app.use("/tiago/pessoas", rotasTiagoPessoa);
app.use("/tiago/login", rotasTiagoLogin);

/** Inicia o Servidor */
app.listen(port, () => {
  console.log(`Vendor Service (estudos) listen on PORT: ${port}`);
});
