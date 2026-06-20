# spec-pattern.md

Canonical reference for every module in this Express + TypeScript API.
**Always use `tiago/pessoa` as the gold-standard example** — other modules are outdated.

---

## 0. Module Classification

Before reading anything else, classify the module. This determines which sections apply.

**Answer these two questions:**

1. Does the entity have sub-entities (e.g. endereços, itens)?
2. Does the entity have business rules that require validation (format, domain constraints)?

| Profile | Criteria | Canonical example | Additional complexity |
|---|---|---|---|
| **Basic CRUD** | No sub-entities, no complex business rules | `tiago/categoria` (after update) | §4–6 only |
| **Advanced CRUD** | Has sub-entities and/or complex validation | `tiago/pessoa` | §4–6 + transactions, `*_validacoes.ts` |

---

## 0. Project Stack

| Resource | Version |
|---|---|
| Node.js | LTS |
| Express | ^5.1.0 |
| TypeScript | ^5.8.3 |
| PostgreSQL driver | `pg` ^8.15.5 |
| JWT | `jsonwebtoken` ^9.0.3 |

**Key decisions implied by this stack:**
- No ORM — raw SQL with parameterized queries (`$1, $2, ...`) only.
- No dependency injection framework — services are plain exported async functions.
- No test runner configured — verification is done via TypeScript compilation + MCP DB check.

---

## 1. Directory layout

```
src/modulos/tiago/{moduleName}/
  {moduleName}_rotas.ts           ← route definitions + auth middleware + Swagger JSDoc
  {moduleName}_controlador.ts     ← request extraction, validation call, response
  {moduleName}_servico.ts         ← business logic, DB queries
  {moduleName}_sql_constants.ts   ← all SQL queries (always required)
  {moduleName}_schema.ts          ← OpenAPI schema definitions (always required)
  {moduleName}_validacoes.ts      ← body mapping + business rules (only when needed)
```

All new modules go under `src/modulos/tiago/`.

---

## 2. Shared utilities

Import these from `src/utils/` — never re-implement locally.

| Utility | Import path | Usage |
|---|---|---|
| `dbCliente` | `../../../utils/banco_dados` | Single-query connection |
| `dbPool` | `../../../utils/banco_dados` | Pool for transactions |
| `executarQuery` | `../../../utils/banco_dados` | Execute `ISqlDados` against a client |
| `responseAPI` | `../../../utils/utils` | Sends 200 or 500 based on `resultado.mensagem` |
| `responseInternalServerError` | `../../../utils/utils` | Always sends 500 |
| `processarDados` | `../../../utils/utils` | Creates a success `IResultadoAPI` |
| `processarDadosEmpty` | `../../../utils/utils` | Creates an error `IResultadoAPI` |
| `autenticadorInterceptador` | `../../../utils/utils` | JWT auth middleware |
| `ERROR_MESSAGES` | `../../../utils/error_messages` | Centralized error strings |
| `IResultadoAPI` | `../../../interfaces/resultado_api` | API response contract |
| `ISqlDados` | `../../../interfaces/sql_filtro` | SQL query wrapper |

---

## 3. Routes (`*_rotas.ts`)

```ts
import express from 'express';
import { autenticadorInterceptador } from '../../../utils/utils';
import { criar, alterar, buscar, remover } from './{moduleName}_controlador';

const rotas{ModuleName} = express.Router();

rotas{ModuleName}.get('/',         autenticadorInterceptador, buscar);
rotas{ModuleName}.get('/:id',      autenticadorInterceptador, buscar);
rotas{ModuleName}.post('/',        autenticadorInterceptador, criar);
rotas{ModuleName}.put('/:id',      autenticadorInterceptador, alterar);
rotas{ModuleName}.delete('/:id',   autenticadorInterceptador, remover);  // only if no `ativo` column
// OR
rotas{ModuleName}.put('/inativar/:id', autenticadorInterceptador, inativar);  // if entity has `ativo`

export = rotas{ModuleName};
```

**Rules:**
- All routes must use `autenticadorInterceptador`.
- Controller functions use short verb names without domain prefix: `criar`, `alterar`, `buscar`, `remover`, `inativar`.
- Sub-entity exception: `criarEndereco`, `buscarEndereco` when same controller handles sub-entities.
- Register new router in `app.ts` under `/tiago/{moduleName}`.

---

## 4. Controller (`*_controlador.ts`)

```ts
import { Request, Response } from 'express';
import { IResultadoAPI } from '../../../interfaces/resultado_api';
import { processarDadosEmpty, responseAPI, responseInternalServerError } from '../../../utils/utils';
import { ERROR_MESSAGES } from '../../../utils/error_messages';
import { criarServico, alterarServico, buscarServico, removerServico } from './{moduleName}_servico';
// import { mapear_body, validar_regras_{moduleName} } from './{moduleName}_validacoes'; // when needed

export const criar = async (req: Request, res: Response) => {
    // With validation:
    const parametros = mapear_body(req);
    const mensagemValidacao = validar_regras_{moduleName}(parametros);
    if (mensagemValidacao != '') {
        const resultado = processarDadosEmpty(mensagemValidacao);
        responseInternalServerError(res, resultado);
        return;
    }
    const resultado = await criarServico(parametros);
    responseAPI(res, resultado);
};

export const criar = async (req: Request, res: Response) => {
    // Without validation (simple entity):
    const parametros = { nome: req.body.nome };
    const resultado = await criarServico(parametros);
    responseAPI(res, resultado);
};

export const alterar = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id, nome: req.body.nome };
    const resultado = await alterarServico(parametros);
    responseAPI(res, resultado);
};

export const buscar = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await buscarServico(parametros);
    responseAPI(res, resultado);
};

export const remover = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await removerServico(parametros);
    responseAPI(res, resultado);
};

export const inativar = async (req: Request, res: Response) => {
    const parametros = { id: req.params.id };
    const resultado = await inativarServico(parametros);
    responseAPI(res, resultado);
};
```

**Rules:**
- Never `if (resultado.mensagem == '') res.json(...)` — always `responseAPI` or `responseInternalServerError`.
- Extract params inline (`req.body`, `req.params`, `req.query`) — no logic beyond extraction and delegation.
- Import `IResultadoAPI` only when declaring a typed local variable before the if/else (validation path).

---

## 5. Service (`*_servico.ts`)

### Simple query (single connection)
```ts
import { dbCliente, executarQuery } from '../../../utils/banco_dados';
import { IResultadoAPI } from '../../../interfaces/resultado_api';
import { processarDados, processarDadosEmpty } from '../../../utils/utils';
import { ERROR_MESSAGES } from '../../../utils/error_messages';
import { sqlCriar{ModuleName}, sqlBuscar{ModuleName} } from './{moduleName}_sql_constants';

export const criarServico = async (parametros: any) => {
    const cliente = dbCliente();
    let resultado: IResultadoAPI;

    try {
        await cliente.connect();

        const sqlDados = sqlCriar{ModuleName}(parametros);
        const queryResultado = await executarQuery(cliente, sqlDados);

        resultado = processarDados(() => ({ id: queryResultado.rows[0].id }));
    } catch (erro: any) {
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        await cliente.end();
    }

    return resultado;
};
```

### Transaction (multiple queries, pool)
```ts
import { dbPool, executarQuery } from '../../../utils/banco_dados';
import { PoolClient } from 'pg';

export const criarServico = async (parametros: any) => {
    const pool = dbPool();
    let cliente: PoolClient = await pool.connect();
    let resultado: IResultadoAPI;

    try {
        await cliente.query('BEGIN');

        const sqlDados = sqlCriar{ModuleName}(parametros);
        const queryResultado = await executarQuery(cliente, sqlDados);

        // ... additional queries

        await cliente.query('COMMIT');
        resultado = processarDados(() => ({ id: queryResultado.rows[0].id }));
    } catch (erro: any) {
        await cliente.query('ROLLBACK');
        resultado = processarDadosEmpty(ERROR_MESSAGES.DEFAULT_BANCO_ERROR.replace('{error}', erro));
    } finally {
        cliente.release();
    }

    return resultado;
};
```

**Rules:**
- `resultado` must be declared locally (`let resultado: IResultadoAPI`) inside each function — never at module level.
- Always `await cliente.connect()` before any query (single connection pattern).
- Always `executarQuery(cliente, sqlDados)` — never `cliente.query(sql, valores)` directly.
- Always `processarDados(() => ...)` for success and `processarDadosEmpty(ERROR_MESSAGES.xxx)` for errors.
- Function names: verb + `Servico` suffix (`criarServico`, `buscarEnderecoServico`).
- Use `dbCliente()` for single queries; `dbPool()` only when a transaction is needed.

---

## 6. SQL Constants (`*_sql_constants.ts`)

```ts
import { ISqlDados } from '../../../interfaces/sql_filtro';

export const sqlCriar{ModuleName} = (parametros: any): ISqlDados => {
    return {
        sql: `
            INSERT INTO tb_{entity} (nome)
            VALUES ($1)
            RETURNING id;
        `,
        valores: [parametros.nome],
    };
};

export const sqlAlterar{ModuleName} = (parametros: any): ISqlDados => {
    return {
        sql: `
            UPDATE tb_{entity}
            SET nome=$1
            WHERE id=$2;
        `,
        valores: [parametros.nome, parametros.id],
    };
};

export const sqlBuscar{ModuleName} = (parametros: any): ISqlDados => {
    return {
        sql: `
            SELECT * FROM tb_{entity}
            WHERE id=$1;
        `,
        valores: [parametros.id],
    };
};

export const sqlBuscarTodos{ModuleName} = (): ISqlDados => {
    return {
        sql: `SELECT * FROM tb_{entity} ORDER BY nome;`,
        valores: null,
    };
};

export const sqlRemover{ModuleName} = (parametros: any): ISqlDados => {
    return {
        sql: `DELETE FROM tb_{entity} WHERE id=$1;`,
        valores: [parametros.id],
    };
};

// Only for entities with `ativo` column:
export const sqlInativar{ModuleName} = (parametros: any): ISqlDados => {
    return {
        sql: `UPDATE tb_{entity} SET ativo=$1 WHERE id=$2;`,
        valores: ['I', parametros.id],
    };
};
```

**Rules:**
- All SQL must live here — never inline in the service.
- All functions return `ISqlDados`.
- Use `$1, $2, ...` placeholders — never string concatenation.
- Use ILIKE + CONCAT for case-insensitive search: `ILIKE lower(concat('%', $1::text, '%'))`.

---

## 7. Validations (`*_validacoes.ts`) — only when needed

```ts
import { Request } from 'express';

export const mapear_body = (req: Request) => {
    return {
        id: req.body.id_{entity} || req.params.id,
        // camelCase fields mapped from snake_case body
        campo: req.body.campo_snake,
    };
};

export const validar_regras_{moduleName} = (parametros: any): string => {
    if (!parametros.campo || parametros.campo.trim() == '') {
        return 'Mensagem de erro específica do domínio.';
    }
    // ... other business rules
    return ''; // empty string = valid
};
```

**Rules:**
- Create this file only when there are meaningful business rules (format validation, domain constraints, complex body mapping with sub-entities).
- `mapear_body` normalizes snake_case API body → camelCase internal object.
- `validar_regras_*` returns empty string on success, error message on failure.
- Simple null/empty checks on a single field may stay inline in the controller.

---

## 8. OpenAPI Schema (`*_schema.ts`) — always required

Every module must export its OpenAPI schema definitions in a dedicated `*_schema.ts` file. These are registered programmatically in `src/utils/swagger.ts`.

```ts
export const {moduleName}Schemas = {
    {EntityName}: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            nome: { type: 'string', example: 'Exemplo' },
        },
    },
    {EntityName}Input: {
        type: 'object',
        required: ['nome'],
        properties: {
            nome: { type: 'string', example: 'Exemplo' },
        },
    },
};
```

After creating the file, import and spread it in `src/utils/swagger.ts`:

```ts
import { {moduleName}Schemas } from '../modulos/tiago/{moduleName}/{moduleName}_schema';

// inside options.definition.components.schemas:
schemas: {
    ...{moduleName}Schemas,
}
```

In `*_rotas.ts`, reference the schemas via `$ref` instead of inlining properties:

```yaml
requestBody:
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/{EntityName}Input'
responses:
  200:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/{EntityName}'
```

**Rules:**
- One schema file per module — no exceptions.
- Export name: `{moduleName}Schemas` (camelCase).
- Always define both the response shape (`{Entity}`) and the input shape (`{Entity}Input`) when the module has write operations.
- When the entity has sub-entities (e.g. `Endereco` inside `Pessoa`), reference them via `$ref` — don't duplicate inline.
- The schema `Endereco` must be defined before `Pessoa` in the `swagger.ts` spread order, since `Pessoa` references it.
- **After any change to a service file, re-verify every `$ref` in the corresponding `*_rotas.ts`** — service refactors silently break Swagger accuracy. Follow the checklist in `spec-verification.md § Swagger response schemas`.

---

### 8.1 — Response schemas: always wrap with `ResultadoAPI`

Every API response is an `IResultadoAPI` (`{ executado, mensagem, data }`). Response schemas must use `allOf` to compose `ResultadoAPI` with the typed `data`:

```ts
{EntityName}Response: {
    allOf: [
        { $ref: '#/components/schemas/ResultadoAPI' },
        { type: 'object', properties: { data: { $ref: '#/components/schemas/{EntityName}' } } },
    ],
},
{EntityName}ListaResponse: {
    allOf: [
        { $ref: '#/components/schemas/ResultadoAPI' },
        { type: 'object', properties: { data: { type: 'array', items: { $ref: '#/components/schemas/{EntityName}' } } } },
    ],
},
```

### 8.2 — Which response schema to use per operation

Before assigning a `$ref` to a route response, read the service and check **what it actually puts in `data`**:

| Operation | What `data` contains | Schema to use |
|---|---|---|
| `criar` (POST) | `{ id }` only — from `RETURNING id` | `IdResponse` (shared schema in `swagger.ts`) |
| `alterar` (PUT) | `{ id }` only — unless the service explicitly returns the full entity | `IdResponse` |
| `inativar` (PUT) | `{ id }` (the params passed to the service) | `IdResponse` |
| `remover` (DELETE) | `{ id }` | `IdResponse` |
| `buscar` by ID | Check whether the service returns `rows[0]` (single object) or `rows` (array) | `{Entity}Response` or `{Entity}ListaResponse` |
| `buscar` list | `rows` (array) | `{Entity}ListaResponse` |

> **Watch out:** some older services return `rows` even for a single-item lookup (e.g. `buscarCategoriaServico`). Always read the service before picking the schema.

### 8.3 — External API schemas

When the module consumes an external API (e.g. IBGE, ViaCEP), the schema must reflect **what the service transforms and returns**, not the raw external API structure.

Example: `buscarLocalidadePorCep` builds `{ cep, estado: { sigla, nome }, cidade, bairro, logradouro }` — the `LocalidadeCep` schema must have exactly those fields, not the original ViaCEP fields.

---

## 9. Deletion rule

| Condition | Pattern |
|---|---|
| Entity has `ativo` column in DB | Use `inativarServico` — `UPDATE tb_x SET ativo='I' WHERE id=$1` |
| Entity has no `ativo` column | Use `removerServico` — `DELETE FROM tb_x WHERE id=$1` |

Always verify in the DB schema before deciding.

---

## 10. Route registration in `app.ts`

```ts
import rotas{ModuleName}Tiago from './src/modulos/tiago/{moduleName}/{moduleName}_rotas';

app.use('/tiago/{moduleName}', rotas{ModuleName}Tiago);
```

---

## Naming conventions

| Concept | Convention | Example |
|---|---|---|
| Module folder | snake_case | `produto_unit` |
| Route prefix | `/tiago/{moduleName}` | `/tiago/categoria` |
| File names | `{moduleName}_{layer}.ts` | `categoria_servico.ts` |
| Router variable | `rotas{ModuleName}` | `rotasCategoria` |
| Controller functions | short verbs | `criar`, `alterar`, `buscar`, `remover`, `inativar` |
| Sub-entity exception | verb + entity | `criarEndereco`, `buscarEndereco` |
| Service functions | verb + `Servico` | `criarServico`, `buscarEnderecoServico` |
| SQL functions | `sql` + verb + entity | `sqlCriarCategoria`, `sqlBuscarTodos` |
| Error constants | `SCREAMING_SNAKE_CASE` in `ERROR_MESSAGES` | `ERROR_MESSAGES.PESSOA_TIPO_NAO_INFORMADO` |
