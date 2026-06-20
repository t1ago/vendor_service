# spec-verification.md

Checklist to run after any code change. Execute every applicable step before reporting a task as done.

---

## Build

```bash
npm run ts
```

- Must pass with **zero errors**.
- If it fails, fix all errors before proceeding.

---

## Imports

When new files were created or imports changed:
- Confirm path `../../../utils/banco_dados` is correct relative to the module folder.
- Confirm path `../../../utils/utils` is correct.
- Confirm path `../../../interfaces/resultado_api` and `../../../interfaces/sql_filtro` are correct.
- Confirm no broken relative imports.

---

## Database mapping

When a SQL constants file, service, or controller was touched (or for any new module):

1. Query the table structure via MCP:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tb_{entity}'
ORDER BY ordinal_position;
```

2. Compare each column against the SQL constants and service parameters:

| Coluna DB | Tipo DB | Nullable | Campo SQL ($n) | Campo Serviço | Mapeamento |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ✅ / ❌ |

3. Report:
   - ✅ if every column maps correctly with no divergence.
   - If any mismatch exists, show the table with the problem row highlighted and fix before proceeding.

---

## Service invariants

When any service file was touched, confirm:

- [ ] `resultado` is declared locally (`let resultado: IResultadoAPI`) inside each function — not at module level.
- [ ] `await cliente.connect()` is present before any query (single connection pattern).
- [ ] `executarQuery(cliente, sqlDados)` is used — no `cliente.query()` calls directly.
- [ ] `processarDados` used for success path; `processarDadosEmpty(ERROR_MESSAGES.xxx)` for error path.

---

## Controller invariants

When any controller file was touched, confirm:

- [ ] Every handler ends with `responseAPI(res, resultado)` or `responseInternalServerError(res, resultado)`.
- [ ] No inline `if (resultado.mensagem == '') res.json(...)` pattern.

---

## Route registration

When a new module was created or routes were changed:
- Confirm the router is registered in `app.ts` under `/tiago/{moduleName}`.

---

## Swagger response schemas

When any service file was touched (refactor, new field, return value change), re-verify every route response schema in `*_rotas.ts` against what the service **actually puts in `data`**. Use the decision table from `spec-pattern.md §8.2` as reference.

For each route in the changed module, confirm:

| Route | Service `data` value | Expected schema | Current `$ref` | Match |
|---|---|---|---|---|
| POST / | `{ id }` | `IdResponse` | ... | ✅ / ❌ |
| PUT /:id | `{ id }` | `IdResponse` | ... | ✅ / ❌ |
| DELETE /:id | `{ id }` | `IdResponse` | ... | ✅ / ❌ |
| GET /:id | `rows[0]` or `rows`? | `{Entity}Response` or `{Entity}ListaResponse` | ... | ✅ / ❌ |
| GET / | `rows` | `{Entity}ListaResponse` | ... | ✅ / ❌ |

**Critical triggers:**
- Service return value changed (e.g. was returning full object, now returns `{ id }`) → update `$ref` in route.
- New field added to `processarDados` callback → update `{Entity}` schema in `*_schema.ts`.
- `buscar` changed from `rows` to `rows[0]` or vice versa → swap between `{Entity}Response` and `{Entity}ListaResponse`.

Do not report the task as done without completing this check.
