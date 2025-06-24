import { db_cliente } from "../../../commons/banco_dados";
import { Resultado } from "../../../commons/resultado_api";

const limparResultado = (resultado: Resultado) => {
  resultado.executado = false;
  resultado.mensagem = "";
  resultado.data = {};
};

export const inserirMedida = async (medidas: any) => {
  const cliente = db_cliente();
  const resultado: Resultado = { executado: false, mensagem: "", data: {} };

  try {
    await cliente.connect();
    const inserirSql = "INSERT INTO tb_medida (nome) VALUES ($1) RETURNING id;";
    const parametros = [medidas.nome];

    const resultadoInsert = await cliente.query(inserirSql, parametros);
    resultado.executado = true;
    resultado.data = { id: resultadoInsert.rows[0].id };
  } catch (erro) {
    resultado.mensagem = `Erro de execução no banco de dados. MSG ${erro}`;
  } finally {
    await cliente.end();
  }

  return resultado;
};

export const buscarTodasMedidas = async () => {
  const cliente = db_cliente();
  const resultado: Resultado = { executado: false, mensagem: "", data: {} };

  try {
    await cliente.connect();
    const buscarSql = `SELECT * FROM tb_medida;`;

    const resultadoBanco = await cliente.query(buscarSql);

    resultado.executado = true;
    resultado.data = resultadoBanco.rows;
  } catch (erro) {
    resultado.mensagem = `Erro ao buscar medidas. MSG ${erro}`;
  } finally {
    await cliente.end();
  }

  return resultado;
};

export const buscarPorId = async (id: number) => {
  const cliente = db_cliente();
  const resultado: Resultado = { executado: false, mensagem: "", data: {} };

  try {
    await cliente.connect();
    const buscarSql = `SELECT id, nome FROM tb_medida WHERE id = $1;`;
    const parametros = [id];

    const resultadoBanco = await cliente.query(buscarSql, parametros);
    resultado.executado = true;
    resultado.data = resultadoBanco.rows;
  } catch (erro) {
    resultado.mensagem = `Erro ao buscar medida por ID. MSG ${erro}`;
  } finally {
    await cliente.end();
  }

  return resultado;
};

export const atualizarMedida = async (id: number, nome: string) => {
  const cliente = db_cliente();
  const resultado: Resultado = { executado: false, mensagem: "", data: {} };

  try {
    await cliente.connect();

    const sql = "UPDATE tb_medida SET nome = $1 WHERE id = $2;";
    const parametros = [nome, id];

    const resultadoBanco = await cliente.query(sql, parametros);
    resultado.executado = true;
    resultado.data = resultadoBanco.rows;
    resultado.data = { id, nome };

    return resultado;

  } catch (erro) {
    resultado.executado = false;
    resultado.mensagem = `Erro ao atualizar medida. MSG: ${erro}`;
    return resultado;

  } finally {
    await cliente.end();
  }
};

export const apagarMedida = async (id: number) => {
  const cliente = db_cliente();
  const resultado: Resultado = { executado: false, mensagem: "", data: {} };

  try {
    await cliente.connect();

    const sql = "DELETE FROM tb_medida WHERE id = $1;";
    const parametros = [id];
    const resultadoBanco = await cliente.query(sql, parametros);
    resultado.executado = true;
    resultado.data = resultadoBanco.rows;
    resultado.data = { id };


    resultado.data = { id };
  } catch (erro) {
    resultado.executado = false;
    resultado.mensagem = `Erro ao apagar medida. MSG: ${erro}`;
    return resultado;

  } finally {
    await cliente.end();
  }

  return resultado;
};