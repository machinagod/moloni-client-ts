// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Tests for `utils/moloni-client/config.ts`. Lives at this directory level
 * because the `deno task test` runner --ignores the `utils/moloni-client/`
 * subtree (where the API-wrapper code under test sits is integration-only
 * and depends on `api.moloni.pt`), but the credentials/env-var helpers
 * themselves are pure functions worth covering.
 */

import { assert, assertEquals, assertThrows } from "std/assert/mod.ts";
import { afterEach, beforeEach, describe, it } from "std/testing/bdd.ts";
import {
  createConfiguredMoloniClient,
  createMoloniCredentials,
  HIGITOTAL_ID,
} from "./config.ts";

const ENV_KEYS = [
  "MOLONI_CLIENT_ID",
  "MOLONI_CLIENT_SECRET",
  "MOLONI_USER",
  "MOLONI_PASSWORD",
] as const;

describe("createMoloniCredentials", () => {
  let snapshot: Record<string, string | undefined>;

  beforeEach(() => {
    snapshot = Object.fromEntries(
      ENV_KEYS.map((k) => [k, Deno.env.get(k)]),
    );
  });

  afterEach(() => {
    for (const k of ENV_KEYS) {
      if (snapshot[k] === undefined) Deno.env.delete(k);
      else Deno.env.set(k, snapshot[k] as string);
    }
  });

  it("reads credentials from env vars", () => {
    Deno.env.set("MOLONI_CLIENT_ID", "id");
    Deno.env.set("MOLONI_CLIENT_SECRET", "secret");
    Deno.env.set("MOLONI_USER", "user");
    Deno.env.set("MOLONI_PASSWORD", "pwd");

    const creds = createMoloniCredentials();
    assertEquals(creds, {
      clientId: "id",
      clientSecret: "secret",
      username: "user",
      password: "pwd",
    });
  });

  it("returns empty strings when env vars are unset", () => {
    for (const k of ENV_KEYS) Deno.env.delete(k);
    const creds = createMoloniCredentials();
    assertEquals(creds.clientId, "");
    assertEquals(creds.clientSecret, "");
    assertEquals(creds.username, "");
    assertEquals(creds.password, "");
  });
});

describe("createConfiguredMoloniClient", () => {
  let snapshot: Record<string, string | undefined>;

  beforeEach(() => {
    snapshot = Object.fromEntries(
      ENV_KEYS.map((k) => [k, Deno.env.get(k)]),
    );
  });

  afterEach(() => {
    for (const k of ENV_KEYS) {
      if (snapshot[k] === undefined) Deno.env.delete(k);
      else Deno.env.set(k, snapshot[k] as string);
    }
  });

  it("throws with the names of every missing env var", () => {
    for (const k of ENV_KEYS) Deno.env.delete(k);
    const err = assertThrows(() => createConfiguredMoloniClient(), Error);
    for (const k of ENV_KEYS) assert(err.message.includes(k));
  });

  it("throws when only some env vars are missing", () => {
    Deno.env.set("MOLONI_CLIENT_ID", "id");
    Deno.env.set("MOLONI_CLIENT_SECRET", "secret");
    Deno.env.delete("MOLONI_USER");
    Deno.env.delete("MOLONI_PASSWORD");
    const err = assertThrows(() => createConfiguredMoloniClient(), Error);
    assert(err.message.includes("MOLONI_USER"));
    assert(err.message.includes("MOLONI_PASSWORD"));
    assert(!err.message.includes("MOLONI_CLIENT_ID"));
  });

  it("builds the client + sets the company id when all env vars present", () => {
    Deno.env.set("MOLONI_CLIENT_ID", "id");
    Deno.env.set("MOLONI_CLIENT_SECRET", "secret");
    Deno.env.set("MOLONI_USER", "user");
    Deno.env.set("MOLONI_PASSWORD", "pwd");
    const client = createConfiguredMoloniClient();
    assert(client);
    // No public getter for the company id — exercising the function for
    // line/branch coverage is the goal; the Moloni client itself is
    // separately integration-tested.
  });

  it("HIGITOTAL_ID is the production company id", () => {
    assertEquals(HIGITOTAL_ID, 240211);
  });
});
