// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
/**
 * Module for loading canned API responses for testing.
 * Each endpoint has its own JSON file in the canned/v1/{endpoint}/{method}/ folder.
 */

const BASE_PATH = new URL("./v1/", import.meta.url).pathname;

/**
 * Load a canned response for a given endpoint and method.
 * @param endpoint The API endpoint (e.g., "companies", "users")
 * @param method The API method (e.g., "getAll", "getOne")
 * @returns The parsed JSON response
 */
export async function loadCannedResponse<T>(
  endpoint: string,
  method: string,
): Promise<T> {
  const path = `${BASE_PATH}${endpoint}/${method}/response.json`;
  const content = await Deno.readTextFile(path);
  return JSON.parse(content) as T;
}

/**
 * Load a canned response synchronously using import.
 * Prefer this for test files where async setup is cumbersome.
 */
export function getCannedPath(endpoint: string, method: string): string {
  return `${BASE_PATH}${endpoint}/${method}/response.json`;
}

// Auth response fixture for testing authentication
export const AUTH_RESPONSE = {
  access_token: "test-access-token-12345",
  expires_in: 3600,
  token_type: "bearer" as const,
  scope: null,
  refresh_token: "test-refresh-token-67890",
};

// Error response fixtures
export const AUTH_ERROR_RESPONSE = {
  error: "invalid_grant",
  error_description: "Invalid username or password",
};

export const API_ERROR_RESPONSE = {
  error: "invalid_request",
  error_description: "Missing required parameter: company_id",
};
