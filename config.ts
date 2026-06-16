// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Convenience helpers that wire a {@linkcode Moloni} client from environment
 * variables. No credentials are bundled — they are read at call time.
 *
 * @module
 */

import Moloni from "./src/index.ts";

/** Higitotal company id used as the default `company_id` for the Moloni API. */
export const HIGITOTAL_ID = 240211;

/**
 * Reads Moloni credentials from the environment.
 *
 * Looks up `MOLONI_CLIENT_ID`, `MOLONI_CLIENT_SECRET`, `MOLONI_USER`, and
 * `MOLONI_PASSWORD`, defaulting each missing variable to an empty string.
 * Requires Deno's `--allow-env` permission.
 *
 * @returns The credentials read from the environment.
 */
export function createMoloniCredentials(): {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
} {
  return {
    clientId: Deno.env.get("MOLONI_CLIENT_ID") || "",
    clientSecret: Deno.env.get("MOLONI_CLIENT_SECRET") || "",
    username: Deno.env.get("MOLONI_USER") || "",
    password: Deno.env.get("MOLONI_PASSWORD") || "",
  };
}

/**
 * Creates a {@linkcode Moloni} client from the environment and scopes it to the
 * Higitotal company ({@linkcode HIGITOTAL_ID}).
 *
 * Reads credentials via {@linkcode createMoloniCredentials} and validates that
 * all four required variables are present.
 *
 * @returns A ready-to-use client with the company id already set.
 * @throws {Error} If any required credential environment variable is missing.
 */
export function createConfiguredMoloniClient(): Moloni {
  const creds = createMoloniCredentials();

  const missing: string[] = [];
  if (!creds.clientId) missing.push("MOLONI_CLIENT_ID");
  if (!creds.clientSecret) missing.push("MOLONI_CLIENT_SECRET");
  if (!creds.username) missing.push("MOLONI_USER");
  if (!creds.password) missing.push("MOLONI_PASSWORD");

  if (missing.length > 0) {
    throw new Error(
      `Missing Moloni credentials: ${missing.join(", ")}. ` +
        "Set the required environment variables.",
    );
  }

  const client = new Moloni(creds);
  console.log(
    `Client created, with credentials client id ${creds.clientId} and client username ${creds.username}`,
  );
  client.setCompanyId(HIGITOTAL_ID);
  return client;
}
