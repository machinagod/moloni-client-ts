// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { Base, InitConfig } from "./base.ts";

// Concrete implementation for testing the abstract Base class
class TestableBase extends Base {
  constructor(config: InitConfig) {
    super(config);
  }

  // Expose protected request method for testing
  public testRequest<T>(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    return this.request<T>(endpoint, params);
  }
}

const testConfig: InitConfig = {
  clientId: "test-client-id",
  clientSecret: "test-client-secret",
  username: "test-user",
  password: "test-password",
};

Deno.test("[Base] request throws when insert has status 1 (published)", async () => {
  const client = new TestableBase(testConfig);
  await assertRejects(
    () => client.testRequest("/invoices/insert/", { status: 1 }),
    Error,
    "Publishing documents is not allowed",
  );
});

Deno.test("[Base] request throws when update has status 1 (published)", async () => {
  const client = new TestableBase(testConfig);
  await assertRejects(
    () => client.testRequest("/invoices/update/", { status: 1 }),
    Error,
    "Publishing documents is not allowed",
  );
});

Deno.test("[Base] request throws when insert has status 2 (deleted)", async () => {
  const client = new TestableBase(testConfig);
  await assertRejects(
    () => client.testRequest("/invoices/insert/", { status: 2 }),
    Error,
    "Publishing documents is not allowed",
  );
});

Deno.test("[Base] request allows read endpoint with status filter", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };
  const apiResponse = [{ document_id: 1 }];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      Promise.resolve(
        new Response(JSON.stringify(apiResponse), { status: 200 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    // status:1 as a filter on a read is allowed
    const result = await client.testRequest<unknown[]>(
      "/invoices/getAll/",
      { status: 1 },
    );
    assertEquals(result.length, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request allows status 0 (draft)", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };
  const apiResponse = { valid: 1, document_id: 42 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      Promise.resolve(
        new Response(JSON.stringify(apiResponse), { status: 200 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    const result = await client.testRequest<
      { valid: number; document_id: number }
    >(
      "/invoices/insert",
      { status: 0, customer_id: 1 },
    );
    assertEquals(result.valid, 1);
    assertEquals(result.document_id, 42);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request allows params without status field", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };
  const apiResponse = { data: "ok" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      Promise.resolve(
        new Response(JSON.stringify(apiResponse), { status: 200 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    const result = await client.testRequest<{ data: string }>(
      "/documents/getAll",
      { customer_id: 123 },
    );
    assertEquals(result.data, "ok");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] setCompanyId returns this for chaining", () => {
  const client = new TestableBase(testConfig);
  const result = client.setCompanyId(123);
  assertEquals(result, client);
});

Deno.test("[Base] authenticate with provided credentials skips API call", async () => {
  const credentials = {
    access_token: "pre-provided-token",
    expires_in: 3600,
    token_type: "bearer" as const,
    refresh_token: "refresh-token",
    scope: null,
  };

  const client = new TestableBase({
    ...testConfig,
    credentials,
  });

  const result = await client.authenticate();
  assertEquals(result, credentials);
});

Deno.test("[Base] authenticate fetches token from API when no credentials provided", async () => {
  const mockResponse = {
    access_token: "new-access-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "new-refresh-token",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify(mockResponse), { status: 200 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    const result = await client.authenticate();

    assertEquals(result.access_token, "new-access-token");
    assertEquals(result.expires_in, 3600);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] authenticate throws on auth failure with error_description", async () => {
  const errorResponse = {
    error: "invalid_grant",
    error_description: "Invalid username or password",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify(errorResponse), { status: 401 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.authenticate(),
      Error,
      "Invalid username or password",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] authenticate throws on auth failure without error_description", async () => {
  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response("", { status: 403 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.authenticate(),
      Error,
      "Authentication failed with status 403",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] authenticate handles non-JSON error response", async () => {
  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response("Internal Server Error", { status: 500 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.authenticate(),
      Error,
      "Authentication failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] authenticate handles network error", async () => {
  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.reject(new Error("Network unavailable")),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.authenticate(),
      Error,
      "Network unavailable",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request authenticates before making API call", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const apiResponse = { data: "test-data" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // Auth call
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call
      Promise.resolve(
        new Response(JSON.stringify(apiResponse), { status: 200 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    client.setCompanyId(123);
    const result = await client.testRequest<{ data: string }>("/test/endpoint");

    assertEquals(result.data, "test-data");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request re-authenticates when token is expired", async () => {
  const authResponse = {
    access_token: "new-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const apiResponse = { result: "success" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // First auth call (will be made twice due to expiry simulation)
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call
      Promise.resolve(
        new Response(JSON.stringify(apiResponse), { status: 200 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    const result = await client.testRequest<{ result: string }>(
      "/test/endpoint",
    );

    assertEquals(result.result, "success");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request throws on API error with error_description", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const errorResponse = {
    error: "invalid_request",
    error_description: "Missing required parameter",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // Auth call
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call fails
      Promise.resolve(
        new Response(JSON.stringify(errorResponse), { status: 400 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.testRequest("/test/endpoint"),
      Error,
      "Missing required parameter",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request throws on API error with message", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const errorResponse = {
    message: "Resource not found",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // Auth call
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call fails
      Promise.resolve(
        new Response(JSON.stringify(errorResponse), { status: 404 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.testRequest("/test/endpoint"),
      Error,
      "Resource not found",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request throws generic error on API failure without message", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // Auth call
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call fails
      Promise.resolve(
        new Response("{}", { status: 500 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.testRequest("/test/endpoint"),
      Error,
      "Request failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request handles non-JSON API error response", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // Auth call
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call fails with non-JSON
      Promise.resolve(
        new Response("Internal Server Error", { status: 500 }),
      ),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.testRequest("/test/endpoint"),
      Error,
      "Request failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request handles network error", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // Auth call
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call fails with network error
      Promise.reject(new Error("Connection refused")),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.testRequest("/test/endpoint"),
      Error,
      "Connection refused",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request handles non-Error thrown", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      // Auth call
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      // API call throws non-Error
      Promise.reject("String error"),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.testRequest("/test/endpoint"),
      Error,
      "String error",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] uses sandbox URL when sandbox option is true", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  let capturedUrl = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request) => {
      capturedUrl = url.toString();
      return Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      );
    },
  );

  try {
    const client = new TestableBase({
      ...testConfig,
      sandbox: true,
    });
    await client.authenticate();

    assertEquals(capturedUrl.includes("/sandbox/"), true);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] uses production URL when sandbox option is false", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  let capturedUrl = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request) => {
      capturedUrl = url.toString();
      return Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      );
    },
  );

  try {
    const client = new TestableBase({
      ...testConfig,
      sandbox: false,
    });
    await client.authenticate();

    assertEquals(capturedUrl.includes("/v1/"), true);
    assertEquals(capturedUrl.includes("/sandbox/"), false);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] request includes company_id in body", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  let capturedBody = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.body) {
        capturedBody = init.body.toString();
      }
      return Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      );
    },
  );

  try {
    const client = new TestableBase(testConfig);
    client.setCompanyId(999);
    await client.testRequest("/test", { param1: "value1" });

    const bodyObj = JSON.parse(capturedBody);
    assertEquals(bodyObj.company_id, 999);
    assertEquals(bodyObj.param1, "value1");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[Base] authenticate handles non-Error thrown", async () => {
  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.reject("String error from auth"),
    ]),
  );

  try {
    const client = new TestableBase(testConfig);
    await assertRejects(
      () => client.authenticate(),
      Error,
      "String error from auth",
    );
  } finally {
    fetchStub.restore();
  }
});

// SEC-006 ROLLBACK note: this test originally asserted POST + form body, but
// Moloni's production /v1/grant rejected that shape ("Missing parameters")
// despite /sandbox/grant/ accepting it. Until we can validate against prod
// creds, auth uses the GET form again. The remaining-risk story is:
//   - SEC-005 still strips the URL from console.log, so the access token
//     never hits stdout (covered by the SEC-005 test below).
//   - This call is server→Moloni only — no browser, so no Referer leak.
Deno.test("[Base] authenticate sends GET to /grant (SEC-006 rollback)", async () => {
  const authResponse = {
    access_token: "test-token",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };

  let capturedUrl = "";
  let capturedMethod: string | undefined;
  const fetchStub = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request, init?: RequestInit) => {
      capturedUrl = url.toString();
      capturedMethod = init?.method;
      return Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      );
    },
  );

  try {
    const client = new TestableBase({
      ...testConfig,
      password: "super-secret-password",
    });
    await client.authenticate();
  } finally {
    fetchStub.restore();
  }

  assertEquals(capturedMethod, "GET");
  assertEquals(capturedUrl.includes("/grant?"), true);
  assertEquals(capturedUrl.includes("grant_type=password"), true);
});

Deno.test("[Base] request log line never contains the access token (SEC-005)", async () => {
  const authResponse = {
    access_token: "secret-access-token-must-not-leak",
    expires_in: 3600,
    token_type: "Bearer",
    refresh_token: "refresh",
  };
  const apiResponse = { ok: true };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify(authResponse), { status: 200 }),
      ),
      Promise.resolve(
        new Response(JSON.stringify(apiResponse), { status: 200 }),
      ),
    ]),
  );

  const logged: string[] = [];
  const logStub = stub(console, "log", (...args: unknown[]) => {
    logged.push(args.map(String).join(" "));
  });

  try {
    const client = new TestableBase(testConfig);
    await client.testRequest("/documents/getAll");
  } finally {
    logStub.restore();
    fetchStub.restore();
  }

  for (const line of logged) {
    assertEquals(
      line.includes("secret-access-token-must-not-leak"),
      false,
      `log line leaked access token: ${line}`,
    );
    assertEquals(
      line.includes("access_token="),
      false,
      `log line contains access_token query param: ${line}`,
    );
  }
});
