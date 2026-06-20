# /adjust-code

Adjusts, refactors, or extends existing module code while keeping it aligned with the canonical pattern.

---

## [I] Intent

Modify one or more files inside an existing module without breaking the pattern contracts defined in
`$PWD/.claude/patterns/spec-pattern.md`. This covers: adding a field, changing validation, renaming a column,
adding a new service function, fixing a bug, or updating error messages.

---

## [A] Analysis — gather before acting

1. **Read the spec**: `$PWD/.claude/patterns/spec-pattern.md` (full file) — mandatory before any edit.
2. **Read every file the user mentions** (or that is affected by the change).
3. **Identify the change surface**:
   - Does it touch the SQL? → update `*_sql_constants.ts`; never write SQL inline in the service.
   - Does it touch the service? → confirm `resultado` is declared locally, `await cliente.connect()`, `executarQuery()` in use.
   - Does it touch the controller? → confirm `responseAPI` / `responseInternalServerError` in use; no `if/else` inline.
   - Does it touch routes? → check `app.ts` registration.
   - Does it touch business rules? → update or create `*_validacoes.ts` accordingly.
   - Does it add/remove a column? → verify mapping between DB, SQL constants, and service.
4. **Collect from the user** (ask if not already clear):
   - Exact description of what must change and why.
   - Which module / which files are in scope.

---

## [P] Plan — present before acting

After completing the analysis and **before writing any code**, present a plan to the user containing:

- List of files that will be created or modified, with a one-line description of each change.
- Any ambiguities or decisions that require the user's input.

**Wait for explicit approval before proceeding.** Do not start editing files until the user confirms.

---

## [S] Spec — what to respect during edits

Read `$PWD/.claude/patterns/spec-pattern.md` for the full contract. Key invariants that must hold after any edit:

| Layer | Invariant |
|---|---|
| Routes | All routes use `autenticadorInterceptador`; functions imported from controller have short verb names |
| Controller | Response via `responseAPI` or `responseInternalServerError` — never inline `if/else` |
| Controller | Validate with `mapear_body` + `validar_regras_*` only when business rules exist |
| Service | `resultado` declared locally inside each function — never shared at module level |
| Service | Always `await cliente.connect()` before any query |
| Service | Always `executarQuery(cliente, sqlDados)` — never `cliente.query()` directly |
| Service | Always `processarDados(() => ...)` / `processarDadosEmpty(ERROR_MESSAGES.xxx)` |
| Service | Function names: verb + `Servico` suffix (`criarServico`, `buscarEnderecoServico`) |
| SQL | Always in `*_sql_constants.ts` — never inline in the service |
| SQL | Functions return `ISqlDados`; queries use `$1, $2, ...` — never string concatenation |
| Exclusão | Entity has `ativo` column → `inativarServico` (UPDATE ativo='I'); no `ativo` → DELETE físico |
| Error messages | Centralized in `src/utils/error_messages.ts` — never strings hardcoded no serviço |

---

## [D] Delivery — execution order

1. Read all files that will be touched (never edit blind).
2. Apply changes in dependency order: sql_constants → service → controller → routes.
3. If a new error message is needed, add it to `src/utils/error_messages.ts` first.
4. **Run `$PWD/.claude/patterns/spec-verification.md`** — execute every applicable check and fix all errors before continuing.
5. Report the full list of modified files, a summary of each change, and the verification result.

---

## [D] Decisions — hard rules

- **Never** rewrite a whole file when a targeted edit suffices — use Edit, not Write, for existing files.
- **Never** write SQL inline in the service — always `*_sql_constants.ts`.
- **Never** use `if (resultado.mensagem == '') res.json(...)` — always `responseAPI`.
- **Never** declare `resultado` at module level — always local inside the function.
- **Always** `await cliente.connect()`.
- **Always** use `executarQuery(cliente, sqlDados)` from `banco_dados.ts`.
- **Never** use `categoria`, `miguel`, or `victor` modules as reference — use `tiago/pessoa` only.
- If the adjustment reveals that an existing file is outdated (e.g. inline SQL, shared `resultado`, missing `await`),
  flag it to the user and ask before touching it — do not silently refactor out of scope.
- **Never** report the task as done without completing step 4 (spec-verification). No exceptions.
