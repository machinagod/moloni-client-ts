// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { Company } from "./index.ts";
import { AUTH_RESPONSE, loadCannedResponse } from "../../canned/mod.ts";
import { AuthResponse } from "../types.ts";

// Load canned responses
const companiesGetAll = await loadCannedResponse<unknown[]>(
  "companies",
  "getAll",
);
const subscriptionGetOne = await loadCannedResponse<unknown>(
  "subscription",
  "getOne",
);

/**
 * Mock auth response matching the AuthResponse type
 */
const MOCK_AUTH_RESPONSE: AuthResponse = AUTH_RESPONSE;

/**
 * Test class extending Company to use mock credentials
 * and bypass real authentication
 */
class TestCompany extends Company {
  constructor() {
    super({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      credentials: MOCK_AUTH_RESPONSE,
    });
  }
}

/**
 * Helper to create a mock fetch response
 */
function createMockFetchResponse(data: unknown) {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

/**
 * Helper to extract endpoint from fetch URL
 */
function getEndpointFromUrl(url: string): string {
  const urlObj = new URL(url);
  return urlObj.pathname;
}

// ============================================================================
// companies() method tests
// ============================================================================

Deno.test("[moloni-client/company] companies getAll returns list of companies", async () => {
  const company = new TestCompany();
  const expectedResponse = companiesGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(expectedResponse)]),
  );

  try {
    const result = await company.companies("getAll");

    assertEquals(result, expectedResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/companies/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] companies getAll with company_id set", async () => {
  const company = new TestCompany();
  company.setCompanyId(240211);
  const expectedResponse = companiesGetAll;

  let capturedBody = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.body) {
        capturedBody = init.body.toString();
      }
      return createMockFetchResponse(expectedResponse);
    },
  );

  try {
    const result = await company.companies("getAll");

    assertEquals(result, expectedResponse);
    const bodyObj = JSON.parse(capturedBody);
    assertEquals(bodyObj.company_id, 240211);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] companies getOne returns company details", async () => {
  const company = new TestCompany();
  company.setCompanyId(240211);

  // Mock a detailed company response
  const detailedCompany = {
    company_id: 240211,
    name: "Pessoa 3",
    vat: "900000079",
    email: "contacto1@example.com",
    address: "Rua de Exemplo 182",
    city: "Mirandela",
    zip_code: "5370-565",
    country_id: 1,
    slug: "higitotal",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(detailedCompany)]),
  );

  try {
    const result = await company.companies("getOne", { company_id: "240211" });

    assertEquals(result.company_id, 240211);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/companies/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] companies freeSlug checks slug availability", async () => {
  const company = new TestCompany();
  const slugResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(slugResponse)]),
  );

  try {
    const result = await company.companies("freeSlug", { slug: "test-slug" });

    assertEquals(result.valid, 1);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/companies/freeSlug/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] companies freeSlug with invalid slug", async () => {
  const company = new TestCompany();
  const slugResponse = { valid: 0 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(slugResponse)]),
  );

  try {
    const result = await company.companies("freeSlug", { slug: "taken-slug" });

    assertEquals(result.valid, 0);
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// subscription() method tests
// ============================================================================

Deno.test("[moloni-client/company] subscription getOne returns subscription info", async () => {
  const company = new TestCompany();
  company.setCompanyId(240211);
  const expectedResponse = subscriptionGetOne;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(expectedResponse)]),
  );

  try {
    const result = await company.subscription("getOne", {
      company_id: "240211",
    });

    assertEquals(result.subscription_id, 219638);
    assertEquals(result.company_id, 240211);
    assertEquals(result.plan_id, 4);
    assertEquals(result.payment_mode, "preco_anual");
    assertEquals(result.last_price, 190.8);
    assertEquals(result.paid, 1);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/subscription/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] subscription getOne validates response structure", async () => {
  const company = new TestCompany();
  const expectedResponse = subscriptionGetOne;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(expectedResponse)]),
  );

  try {
    const result = await company.subscription("getOne", {
      company_id: "240211",
    });

    // Verify all expected fields are present
    assertEquals(typeof result.subscription_id, "number");
    assertEquals(typeof result.company_id, "number");
    assertEquals(typeof result.plan_id, "number");
    assertEquals(typeof result.payment_mode, "string");
    assertEquals(typeof result.last_price, "number");
    assertEquals(typeof result.subscription_date, "string");
    assertEquals(typeof result.expire_date, "string");
    assertEquals(typeof result.paid, "number");
    assertEquals(typeof result.last_payment_date, "string");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] subscription includes company_id from setCompanyId in request body", async () => {
  const company = new TestCompany();
  company.setCompanyId(240211);
  const expectedResponse = subscriptionGetOne;

  let capturedBody = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.body) {
        capturedBody = init.body.toString();
      }
      return createMockFetchResponse(expectedResponse);
    },
  );

  try {
    // Note: subscription getOne requires company_id in params per the type definition
    // The setCompanyId value is used as default, but params can override it
    await company.subscription("getOne", { company_id: "240211" });

    const bodyObj = JSON.parse(capturedBody);
    // The params company_id (string) overrides the setCompanyId value in the body
    assertEquals(bodyObj.company_id, "240211");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] setCompanyId provides default company_id when params omit it", async () => {
  const company = new TestCompany();
  company.setCompanyId(999999);
  const expectedResponse = companiesGetAll;

  let capturedBody = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.body) {
        capturedBody = init.body.toString();
      }
      return createMockFetchResponse(expectedResponse);
    },
  );

  try {
    // getAll doesn't require company_id in params, so setCompanyId value is used
    await company.companies("getAll");

    const bodyObj = JSON.parse(capturedBody);
    assertEquals(bodyObj.company_id, 999999);
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Error handling tests
// ============================================================================

Deno.test("[moloni-client/company] companies handles API error with message", async () => {
  const company = new TestCompany();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify({ message: "Company not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await company.companies("getOne", { company_id: "999999" }),
      Error,
      "Company not found",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] subscription handles API error with error_description", async () => {
  const company = new TestCompany();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({
            error: "invalid_request",
            error_description: "Invalid company_id parameter",
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
      async () =>
        await company.subscription("getOne", { company_id: "invalid" }),
      Error,
      "Invalid company_id parameter",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] handles network error", async () => {
  const company = new TestCompany();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([Promise.reject(new Error("Network connection failed"))]),
  );

  try {
    await assertRejects(
      async () => await company.companies("getAll"),
      Error,
      "Network connection failed",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] handles generic server error", async () => {
  const company = new TestCompany();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response("{}", {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await company.companies("getAll"),
      Error,
      "Request failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Method chaining and configuration tests
// ============================================================================

Deno.test("[moloni-client/company] setCompanyId allows method chaining", () => {
  const company = new TestCompany();
  const result = company.setCompanyId(123);
  assertEquals(result, company);
});

Deno.test("[moloni-client/company] can call methods without parameters", async () => {
  const company = new TestCompany();
  const expectedResponse = companiesGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(expectedResponse)]),
  );

  try {
    // getAll doesn't require params (empty Record)
    const result = await company.companies("getAll");
    assertEquals(result, expectedResponse);
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Fixture data validation tests
// ============================================================================

Deno.test("[moloni-client/company] companies fixture contains expected data", async () => {
  const company = new TestCompany();
  const expectedResponse = companiesGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(expectedResponse)]),
  );

  try {
    const result = await company.companies("getAll");

    // Verify fixture structure
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 1);

    const firstCompany = result[0];
    assertEquals(firstCompany.company_id, 240211);
    assertEquals(
      firstCompany.name,
      "Pessoa 3",
    );
    assertEquals(firstCompany.email, "contacto1@example.com");
    assertEquals(firstCompany.vat, "900000079");
    assertEquals(firstCompany.city, "Mirandela");
    assertEquals(firstCompany.zip_code, "5370-565");
    assertEquals(firstCompany.country_id, 1);
    assertEquals(firstCompany.confirmed, 1);
    assertEquals(firstCompany.currency_id, 1);
    assertEquals(firstCompany.gdpr_acceptance, 1);

    // Verify nested country object
    assertEquals(firstCompany.country.country_id, 1);
    assertEquals(firstCompany.country.name, "Portugal");
    assertEquals(firstCompany.country.iso_3166_1, "pt");

    // Verify nested currency object
    assertEquals(firstCompany.currency.currency_id, 1);
    assertEquals(firstCompany.currency.symbol, "\u20AC");
    assertEquals(firstCompany.currency.symbol_right, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] subscription fixture contains expected data", async () => {
  const company = new TestCompany();
  const expectedResponse = subscriptionGetOne;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(expectedResponse)]),
  );

  try {
    const result = await company.subscription("getOne", {
      company_id: "240211",
    });

    // Verify fixture structure
    assertEquals(result.subscription_id, 219638);
    assertEquals(result.company_id, 240211);
    assertEquals(result.plan_id, 4);
    assertEquals(result.payment_mode, "preco_anual");
    assertEquals(result.last_price, 190.8);
    assertEquals(result.subscription_date, "2023-06-17T09:35:00+0100");
    assertEquals(result.expire_date, "2026-06-17T09:06:00+0100");
    assertEquals(result.paid, 1);
    assertEquals(result.last_payment_date, "2025-06-15T17:49:07+0100");
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// URL construction tests
// ============================================================================

Deno.test("[moloni-client/company] uses correct API base URL", async () => {
  const company = new TestCompany();
  const expectedResponse = companiesGetAll;

  let capturedUrl = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request) => {
      capturedUrl = url.toString();
      return createMockFetchResponse(expectedResponse);
    },
  );

  try {
    await company.companies("getAll");

    assertEquals(capturedUrl.startsWith("https://api.moloni.pt/v1/"), true);
    assertEquals(capturedUrl.includes("access_token="), true);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/company] includes access token in query string", async () => {
  const company = new TestCompany();
  const expectedResponse = companiesGetAll;

  let capturedUrl = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request) => {
      capturedUrl = url.toString();
      return createMockFetchResponse(expectedResponse);
    },
  );

  try {
    await company.companies("getAll");

    const urlObj = new URL(capturedUrl);
    assertEquals(
      urlObj.searchParams.get("access_token"),
      MOCK_AUTH_RESPONSE.access_token,
    );
  } finally {
    fetchStub.restore();
  }
});
