// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { Entities } from "./index.ts";
import { AUTH_RESPONSE, loadCannedResponse } from "../../canned/mod.ts";

// Load canned responses at top level
const customersGetAll = await loadCannedResponse<unknown[]>(
  "customers",
  "getAll",
);
const salesmenGetAll = await loadCannedResponse<unknown[]>(
  "salesmen",
  "getAll",
);

// Create a concrete test class extending Entities for testing
class TestEntities extends Entities {
  constructor() {
    super({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      // Provide mock credentials to bypass authenticate() API calls
      credentials: {
        access_token: AUTH_RESPONSE.access_token,
        expires_in: AUTH_RESPONSE.expires_in,
        token_type: AUTH_RESPONSE.token_type,
        scope: null,
        refresh_token: AUTH_RESPONSE.refresh_token,
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

// ============================================================================
// Customers Tests
// ============================================================================

Deno.test("[moloni-client/entities] customers getAll returns customer list", async () => {
  const entities = new TestEntities();
  const mockResponse = customersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("getAll", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers getAll without params", async () => {
  const entities = new TestEntities();
  const mockResponse = customersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("getAll");

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers getOne returns single customer", async () => {
  const entities = new TestEntities();
  const mockResponse = customersGetAll[0];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("getOne", {
      company_id: 240211,
      customer_id: 89407140,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers count returns count", async () => {
  const entities = new TestEntities();
  const mockResponse = { count: 150 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("count", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers getByVat returns customers", async () => {
  const entities = new TestEntities();
  const mockResponse = customersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("getByVat", {
      company_id: 240211,
      vat: "900000139",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/getByVat/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers getByNumber returns customers", async () => {
  const entities = new TestEntities();
  const mockResponse = customersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("getByNumber", {
      number: "05875",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/getByNumber/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers freeSlug checks slug availability", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("freeSlug", {
      slug: "test-slug",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/freeSlug/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers getModifiedSince returns modified customers", async () => {
  const entities = new TestEntities();
  const mockResponse = customersGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("getModifiedSince", {
      lastmodified: "2024-01-01 00:00:00",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/customers/getModifiedSince/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers insert creates new customer", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1, customer_id: 123456 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("insert", {
      vat: "123456789",
      number: "TEST001",
      name: "Test Customer",
      language_id: 1,
      address: "Test Address",
      city: "Test City",
      country_id: 1,
      maturity_date_id: 0,
      copies: [{ document_type_id: 1, copies: 2 }],
      payment_method_id: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers update modifies customer", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1, customer_id: 89407140 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("update", {
      customer_id: 89407140,
      vat: "900000139",
      number: "05875",
      name: "Updated Customer Name",
      language_id: 1,
      address: "Updated Address",
      city: "Updated City",
      country_id: 1,
      maturity_date_id: 0,
      copies: [{ document_type_id: 1, copies: 2 }],
      payment_method_id: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/update/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customers delete removes customer", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customers("delete", {
      customer_id: 89407140,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/customers/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Salesmen Tests
// ============================================================================

Deno.test("[moloni-client/entities] salesmen getAll returns salesmen list", async () => {
  const entities = new TestEntities();
  const mockResponse = salesmenGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("getAll", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/salesmen/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen getAll without params", async () => {
  const entities = new TestEntities();
  const mockResponse = salesmenGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("getAll");

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen getOne returns single salesman", async () => {
  const entities = new TestEntities();
  const mockResponse = salesmenGetAll[0];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("getOne", {
      company_id: 240211,
      salesmen_id: 142703,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/salesmen/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen count returns count", async () => {
  const entities = new TestEntities();
  const mockResponse = { count: 10 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("count", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/salesmen/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen freeSlug checks slug availability", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("freeSlug", {
      slug: "test-salesman-slug",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/salesmen/freeSlug/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen getByNumber returns salesmen", async () => {
  const entities = new TestEntities();
  const mockResponse = salesmenGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("getByNumber", {
      company_id: 240211,
      number: "4",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/salesmen/getByNumber/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen insert creates new salesman", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1, customer_id: 999999 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("insert", {
      vat: "900000151",
      number: "99",
      name: "New Salesman",
      base_commission: 5,
      language_id: 1,
      qty_copies_document: 2,
      address: "Test Address",
      city: "Test City",
      country_id: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/salesmen/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen delete removes salesman", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.salesmen("delete", {
      company_id: 240211,
      document_id: 142703,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/salesmen/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Suppliers Tests
// ============================================================================

Deno.test("[moloni-client/entities] suppliers getAll returns suppliers list", async () => {
  const entities = new TestEntities();
  const mockResponse = [
    {
      supplier_id: 2188486,
      number: "001",
      name: "Test Supplier",
      vat: "123456789",
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("getAll", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers getAll without params", async () => {
  const entities = new TestEntities();
  const mockResponse = [{ supplier_id: 1, name: "Supplier" }];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("getAll");

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers getOne returns single supplier", async () => {
  const entities = new TestEntities();
  const mockResponse = {
    supplier_id: 2188486,
    number: "001",
    name: "Test Supplier",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("getOne", {
      supplier_id: 2188486,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers count returns count", async () => {
  const entities = new TestEntities();
  const mockResponse = { count: 50 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("count", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers freeSlug checks slug availability", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("freeSlug", {
      slug: "test-supplier-slug",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/freeSlug/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers getByNumber returns suppliers", async () => {
  const entities = new TestEntities();
  const mockResponse = [{ supplier_id: 2188486, name: "Test Supplier" }];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("getByNumber", {
      number: "001",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/getByNumber/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers insert creates new supplier", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1, supplier_id: 123456 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("insert", {
      supplier_id: 0,
      number: "NEW001",
      name: "New Supplier",
      vat: "123456789",
      address: "Supplier Address",
      city: "Supplier City",
      zip_code: "1234-567",
      country_id: 1,
      email: "supplier@example.com",
      website: "",
      phone: "123456789",
      fax: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      notes: "",
      discount: 0,
      credit_limit: 0,
      qty_copies_document: 2,
      maturity_date_id: 0,
      field_notes: "",
      language_id: 1,
      payment_method_id: 1,
      delivery_method_id: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers update modifies supplier", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1, supplier_id: 2188486 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("update", {
      supplier_id: 2188486,
      number: "001",
      name: "Updated Supplier Name",
      vat: "123456789",
      address: "Updated Address",
      city: "Updated City",
      zip_code: "1234-567",
      country_id: 1,
      email: "updated@example.com",
      website: "",
      phone: "987654321",
      fax: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      notes: "",
      discount: 0,
      credit_limit: 0,
      qty_copies_document: 2,
      maturity_date_id: 0,
      field_notes: "",
      language_id: 1,
      payment_method_id: 1,
      delivery_method_id: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/update/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers delete removes supplier", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.suppliers("delete", {
      supplier_id: 2188486,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/suppliers/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Customer Alternate Addresses Tests
// ============================================================================

Deno.test("[moloni-client/entities] customerAlternateAddresses getAll returns addresses", async () => {
  const entities = new TestEntities();
  const mockResponse = [
    {
      address_id: 12345,
      customer_id: 89407140,
      designation: "Main Office",
      code: "MAIN",
      address: "Main Street 123",
      city: "Porto",
      zip_code: "4000-001",
      country_id: 1,
      email: "office@example.com",
      phone: "123456789",
      contact_name: "John Doe",
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customerAlternateAddresses("getAll", {
      customer_id: 89407140,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/customerAlternateAddresses/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customerAlternateAddresses insert creates new address", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1, address_id: 12345 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customerAlternateAddresses("insert", {
      address_id: 0,
      customer_id: 89407140,
      designation: "Branch Office",
      code: "BRANCH",
      address: "Branch Street 456",
      city: "Lisbon",
      zip_code: "1000-001",
      country_id: 1,
      email: "branch@example.com",
      phone: "987654321",
      contact_name: "Jane Doe",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/customerAlternateAddresses/insert/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customerAlternateAddresses update modifies address", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1, address_id: 12345 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customerAlternateAddresses("update", {
      address_id: 12345,
      customer_id: 89407140,
      designation: "Updated Office",
      code: "UPDATED",
      address: "Updated Street 789",
      city: "Braga",
      zip_code: "4700-001",
      country_id: 1,
      email: "updated@example.com",
      phone: "111222333",
      contact_name: "Updated Name",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/customerAlternateAddresses/update/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customerAlternateAddresses delete removes address", async () => {
  const entities = new TestEntities();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await entities.customerAlternateAddresses("delete", {
      customer_id: 89407140,
      address_id: 12345,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/customerAlternateAddresses/delete/",
    );
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Error Handling Tests
// ============================================================================

Deno.test("[moloni-client/entities] customers handles API error", async () => {
  const entities = new TestEntities();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({ message: "Customer not found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        ),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await entities.customers("getAll"),
      Error,
      "Customer not found",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen handles API error with error_description", async () => {
  const entities = new TestEntities();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({
            error: "invalid_request",
            error_description: "Missing required parameter",
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
      async () => await entities.salesmen("getAll"),
      Error,
      "Missing required parameter",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] suppliers handles network error", async () => {
  const entities = new TestEntities();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.reject(new Error("Network unavailable")),
    ]),
  );

  try {
    await assertRejects(
      async () => await entities.suppliers("getAll"),
      Error,
      "Network unavailable",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] customerAlternateAddresses handles server error", async () => {
  const entities = new TestEntities();

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
      async () =>
        await entities.customerAlternateAddresses("getAll", {
          customer_id: 123,
        }),
      Error,
      "Request failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Verifying Request Body Tests
// ============================================================================

Deno.test("[moloni-client/entities] customers request includes correct parameters", async () => {
  const entities = new TestEntities();
  entities.setCompanyId(240211);

  let capturedBody = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.body) {
        capturedBody = init.body.toString();
      }
      return Promise.resolve(
        new Response(JSON.stringify(customersGetAll), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    },
  );

  try {
    await entities.customers("getAll", { status: 1, offset: 10 });

    const bodyObj = JSON.parse(capturedBody);
    assertEquals(bodyObj.company_id, 240211);
    assertEquals(bodyObj.status, 1);
    assertEquals(bodyObj.offset, 10);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/entities] salesmen request includes correct parameters", async () => {
  const entities = new TestEntities();
  entities.setCompanyId(240211);

  let capturedBody = "";
  const fetchStub = stub(
    globalThis,
    "fetch",
    (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.body) {
        capturedBody = init.body.toString();
      }
      return Promise.resolve(
        new Response(JSON.stringify(salesmenGetAll), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    },
  );

  try {
    await entities.salesmen("getByNumber", {
      company_id: 240211,
      number: "4",
      exact: 1,
    });

    const bodyObj = JSON.parse(capturedBody);
    assertEquals(bodyObj.company_id, 240211);
    assertEquals(bodyObj.number, "4");
    assertEquals(bodyObj.exact, 1);
  } finally {
    fetchStub.restore();
  }
});

// ============================================================================
// Multiple Calls Tests
// ============================================================================

Deno.test("[moloni-client/entities] multiple entity calls work correctly", async () => {
  const entities = new TestEntities();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(customersGetAll),
      createMockFetchResponse(salesmenGetAll),
      createMockFetchResponse([{ supplier_id: 1, name: "Supplier" }]),
      createMockFetchResponse([{ address_id: 1, designation: "Address" }]),
    ]),
  );

  try {
    const customers = await entities.customers("getAll");
    const salesmen = await entities.salesmen("getAll");
    const suppliers = await entities.suppliers("getAll");
    const addresses = await entities.customerAlternateAddresses("getAll", {
      customer_id: 123,
    });

    assertEquals(customers as unknown, customersGetAll);
    assertEquals(salesmen as unknown, salesmenGetAll);
    assertEquals(suppliers as unknown, [{ supplier_id: 1, name: "Supplier" }]);
    assertEquals(
      addresses as unknown,
      [{ address_id: 1, designation: "Address" }],
    );
    assertEquals(fetchStub.calls.length, 4);

    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/customers/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/salesmen/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/suppliers/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[3].args[0] as string),
      "/v1/customerAlternateAddresses/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});
