// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.

import Moloni from "@/utils/moloni-client/src/index.ts";

/** Higitotal company ID for Moloni API */
export const HIGITOTAL_ID = 240211;

/**
 * Creates Moloni credentials from environment variables
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
 * Creates and configures a Moloni client with Higitotal company ID.
 * Throws if required credentials are missing.
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
