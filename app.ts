import express, { Request, Response } from "express"
import cors from "cors"
import { rotaPessoaVictor } from "./src/modulos/victor/pessoas/pessoas_rotas"
import { rotaEnderecoVictor } from "./src/modulos/victor/endereco/endereco_rotas"
import miguel_fornecedor from "./src/modulos/miguel/produtos/fornecedor_miguel_rotas"
import miguel_credencial from "./src/modulos/miguel/credencial/credencial_routes"
import miguel_medidas from "./src/modulos/miguel/medidas/medidas_rotas"
import miguel_moedas from "./src/modulos/miguel/moedas/moedas_rotas"
import rotasCores from './src/modulos/produtos/cores/cores_rotas';
import rotasFornecedoresDam from './src/modulos/produtos/fornecedores/dam/fornecedores_rotas';
import rotasTiagoCategoria from './src/modulos/tiago/categoria/categoria_rotas';
import rotasTiagoCredencial from './src/modulos/tiago/credencial/credencial_rotas';
import rotasTiagoEndereco from './src/modulos/tiago/endereco/endereco_rotas';
import rotasTiagoPessoa from './src/modulos/tiago/pessoa/pessoas_rotas';
import rotasTiagoProduto from './src/modulos/tiago/produto/produto_rotas';
import rotasVictorMarca from './src/modulos/victor/marca/marca_rotas';
import rotasVictorGrupo from './src/modulos/victor/grupo/grupo_rotas';
import rotasVictorProduto from './src/modulos/victor/produto/produto_rotas';
import rotasVictorCredencial from './src/modulos/victor/credencial/credencial_rotas';

/** Constantes do Servidor*/
const app = express();
const port = process.env.API_PORT || 3000;

/** Configuração do Servidor */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);

/** Criação de Rotas */
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
});

/**Miguel */
app.use("/miguel/moeda", miguel_moedas)
app.use("/miguel/fornecedor", miguel_fornecedor)
app.use("/miguel/login", miguel_credencial)
app.use("/miguel/medida", miguel_medidas)

/**Victor */
app.use("/victor/pessoa",rotaPessoaVictor)
app.use("/victor/endereco",rotaEnderecoVictor)
app.use("/victor/marca", rotasVictorMarca)
app.use("/victor/grupo", rotasVictorGrupo)
app.use("/victor/produto", rotasVictorProduto)
app.use("/victor/credencial", rotasVictorCredencial)

/**Danilo */
app.use('/cores', rotasCores);
app.use('/fornecedoresDam', rotasFornecedoresDam);

/**Tiago */
app.use('/tiago/categoria', rotasTiagoCategoria);
app.use('/tiago/produto', rotasTiagoProduto);
app.use('/tiago/endereco', rotasTiagoEndereco);
app.use('/tiago/pessoa', rotasTiagoPessoa);
app.use('/tiago/credencial', rotasTiagoCredencial);


/** Inicia o Servidor */
app.listen(port, () => {
    console.log(`Vendor Service (estudos) listen on PORT: ${port}`);
});
