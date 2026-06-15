# moloni-client-ts

# Moloni Typescript Client,

A typed [Deno](https://deno.com/) client for the
[Moloni](https://www.moloni.pt/) (Portuguese ERP / invoicing) REST API.

Based on https://github.com/plckr/moloni-client

The client is organised into mixins — `Users`, `Products`, `Company`,
`Entities`, `Documents`, `Settings`, and `GlobalData` — composed onto a single
`Moloni` class, so every endpoint group is available from one instance.

## Usage

```ts
import Moloni from "./src/index.ts";

const client = new Moloni({
  clientId: Deno.env.get("MOLONI_CLIENT_ID")!,
  clientSecret: Deno.env.get("MOLONI_CLIENT_SECRET")!,
  username: Deno.env.get("MOLONI_USER")!,
  password: Deno.env.get("MOLONI_PASSWORD")!,
});

client.setCompanyId(123456);

const products = await client.getAllProducts();
```

`InitConfig` accepts either `username` / `password` (password grant) or a
pre-obtained `credentials` object when you authenticate elsewhere. Set
`sandbox: true` to target Moloni's sandbox host.

The `config.ts` helper wires the client from the `MOLONI_CLIENT_ID`,
`MOLONI_CLIENT_SECRET`, `MOLONI_USER`, and `MOLONI_PASSWORD` environment
variables. No credentials are bundled — they are read from the environment at
call time.

## Development

```bash
deno task test           # run the unit tests
deno task ok             # fmt --check, lint, type-check, test
deno task hooks:install  # enable the pre-commit gate (run once per clone)
```

### Pre-commit hook

`deno task hooks:install` points Git at `.githooks/`, whose `pre-commit` hook
runs `deno task ok` before every commit — the same gate CI enforces. Bypass it
for a single commit with `git commit --no-verify`.

### Continuous integration & releases

- **CI** (`.github/workflows/ci.yml`) runs `deno task ok` on every pull request
  and on pushes to `main`. The `main` branch is protected and requires this
  check to pass.
- **Publishing** (`.github/workflows/publish.yml`) is triggered by pushing a
  `v*` tag. It verifies the tag matches the `version` in `deno.json`, runs
  `deno task ok`, then publishes to [JSR](https://jsr.io) via OIDC. To cut a
  release, bump `version` in `deno.json`, commit, then:

  ```bash
  git tag v0.1.2 && git push origin v0.1.2
  ```

### Test fixtures

`canned/` holds recorded Moloni API responses used as hermetic fixtures
(imported as JSON modules — the tests make no network or filesystem calls).
**All fixture data is anonymized**: customer/supplier names, tax IDs (NIF),
emails, phone numbers, and addresses have been replaced with synthetic values.
Re-record your own fixtures against a real company with `fetch-canned-data.sh`
(which reads credentials from a local `.env`) if you need realistic data locally
— do not commit real customer data.
