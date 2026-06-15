// Copyright 2026 Higitotal, LDA. MIT License.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { Users } from "./index.ts";
import { loadCannedResponse } from "../../canned/mod.ts";

// Load canned responses at top level
const usersGetAll = await loadCannedResponse<unknown[]>("users", "getAll");

// Create a concrete test class extending Users for testing
class TestUsers extends Users {
  constructor() {
    super({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      // Provide mock credentials to bypass authenticate() API calls
      credentials: {
        access_token: "mock-access-token",
        expires_in: 3600,
        token_type: "bearer",
        scope: null,
        refresh_token: "mock-refresh-token",
      },
    });
  }
}

// Helper to create a mock fetch response
function createMockFetchResponse(data: unknown) {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

// Helper to extract endpoint from fetch URL
function getEndpointFromUrl(url: string): string {
  const urlObj = new URL(url);
  return urlObj.pathname;
}

Deno.test("[moloni-client/users] users getAll method with fixture data", async () => {
  const users = new TestUsers();
  const mockResponse = usersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await users.users("getAll", { company_id: 240211 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/users/getAll/");

    // Verify fixture data structure
    assertEquals(result.length, 2);
    assertEquals(result[0].user_id, 311296);
    assertEquals(result[0].email, "contacto4@example.com");
    assertEquals(result[0].salesman_id, 142705);
    assertEquals(result[0].language.code, "PT");
    assertEquals(result[1].user_id, 334335);
    assertEquals(result[1].name, "Pessoa 4");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] users getMe method", async () => {
  const users = new TestUsers();
  const mockResponse = {
    user_id: 311296,
    user_group_id: 1,
    salesman_id: 142705,
    name: "Pessoa 3",
    email: "contacto4@example.com",
    cellphone: "927720370",
    language_id: 1,
    language: {
      language_id: 1,
      code: "PT",
      title: "Portugues",
    },
    registered_since: "2022-10-26T10:29:06+0100",
    last_login: "2026-01-29T11:26:14+0000",
    num_companies: 1,
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await users.users("getMe", {});

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/users/getMe/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] users signUp method", async () => {
  const users = new TestUsers();
  const mockResponse = {
    valid: 1,
    user_id: 999999,
    company_id: 999888,
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await users.users("signUp", {
      name: "Test User",
      email: "test@example.com",
      password: "securepassword123",
      language_id: 1,
      company: "Test Company",
      vat: "999999999",
      slug: "test-company",
      country_id: 1,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/users/signUp/");

    // Verify request body contains the params
    const requestInit = fetchStub.calls[0].args[1] as RequestInit;
    const body = JSON.parse(requestInit.body as string);
    assertEquals(body.name, "Test User");
    assertEquals(body.email, "test@example.com");
    assertEquals(body.country_id, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] users recoverPassword method", async () => {
  const users = new TestUsers();
  const mockResponse = { valid: 1 as const };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await users.users("recoverPassword", {
      email: "test@example.com",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/users/recoverPassword/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] users updateMe method", async () => {
  const users = new TestUsers();
  const mockResponse = { valid: 1 as const };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await users.users("updateMe", {
      name: "Updated Name",
      email: "updated@example.com",
      cellphone: "912345678",
      language_id: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/users/updateMe/");

    // Verify request body contains the params
    const requestInit = fetchStub.calls[0].args[1] as RequestInit;
    const body = JSON.parse(requestInit.body as string);
    assertEquals(body.name, "Updated Name");
    assertEquals(body.cellphone, "912345678");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] error handling for API errors", async () => {
  const users = new TestUsers();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await users.users("getAll", { company_id: 999999 }),
      Error,
      "User not found",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] error handling with error_description", async () => {
  const users = new TestUsers();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({
            error: "invalid_request",
            error_description: "Missing required parameter: company_id",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        ),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await users.users("getAll", { company_id: 0 }),
      Error,
      "Missing required parameter: company_id",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] users method without optional params", async () => {
  const users = new TestUsers();
  const mockResponse = usersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    // Call without params (undefined)
    const result = await users.users("getAll");

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/users/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] users recoverPassword error response", async () => {
  const users = new TestUsers();
  const mockResponse = {
    error: "invalid_email",
    error_description: "Email not found in the system",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    // The API returns error in the response body with status 200
    const result = await users.users("recoverPassword", {
      email: "nonexistent@example.com",
    });

    // When API returns 200 with error in body, the client returns it as-is
    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/users] users getAll verifies fixture data fields", async () => {
  const users = new TestUsers();
  const mockResponse = usersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await users.users("getAll", { company_id: 240211 });

    // Verify all expected fields are present in the response
    const user = result[0];
    assertEquals(typeof user.user_id, "number");
    assertEquals(typeof user.user_group_id, "number");
    assertEquals(typeof user.salesman_id, "number");
    assertEquals(typeof user.name, "string");
    assertEquals(typeof user.email, "string");
    assertEquals(typeof user.language_id, "number");
    assertEquals(typeof user.registered_since, "string");
    assertEquals(typeof user.last_login, "string");

    // Verify nested language object
    assertEquals(typeof user.language.language_id, "number");
    assertEquals(typeof user.language.code, "string");
    assertEquals(typeof user.language.title, "string");
  } finally {
    fetchStub.restore();
  }
});
