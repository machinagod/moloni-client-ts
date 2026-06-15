// Copyright 2026 Higitotal, LDA. MIT License.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { Settings } from "./index.ts";
import { loadCannedResponse } from "../../canned/mod.ts";

// Type definitions for canned responses
interface TaxFixture {
  tax_id: number;
  name: string;
  value: number;
  fiscal_zone: string;
  vat_type: string;
  active_by_default: number;
}

interface PaymentMethodFixture {
  payment_method_id: number;
  name: string;
  is_numerary: number;
  is_mb: number;
  is_credit: number;
  is_tpa: number;
}

interface MeasurementUnitFixture {
  unit_id: number;
  name: string;
  short_name: string;
}

interface DocumentSetFixture {
  document_set_id: number;
  name: string;
  active_by_default: number;
  eac?: { eac_id: number };
}

interface WarehouseFixture {
  warehouse_id: number;
  title: string;
  code: string;
  is_default: number;
  city: string;
  zip_code: string;
  country_id: number;
  country?: { name: string };
}

// Load canned responses at top level
const taxesGetAll = await loadCannedResponse<TaxFixture[]>("taxes", "getAll");
const paymentMethodsGetAll = await loadCannedResponse<PaymentMethodFixture[]>(
  "paymentMethods",
  "getAll",
);
const measurementUnitsGetAll = await loadCannedResponse<
  MeasurementUnitFixture[]
>(
  "measurementUnits",
  "getAll",
);
const documentSetsGetAll = await loadCannedResponse<DocumentSetFixture[]>(
  "documentSets",
  "getAll",
);
const warehousesGetAll = await loadCannedResponse<WarehouseFixture[]>(
  "warehouses",
  "getAll",
);

// Create a concrete test class extending Settings for testing
class TestSettings extends Settings {
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

// Mock responses for endpoints not in fixtures
const MOCK_BANK_ACCOUNTS = [
  {
    bank_account_id: 123456,
    company_id: 240211,
    name: "Conta Principal",
    iban: "PT50000201231234567890154",
    swift: "BESCPTPL",
    bank_name: "Novo Banco",
    account_number: "1234567890154",
    lastmodifiedby: "Test User",
    lastmodified: "2025-01-01T00:00:00+0000",
  },
];

const MOCK_EAC_CODES = [
  {
    cae_id: 701219,
    code: "46900",
    description: "Outro comércio por grosso de bens de consumo, n.e.",
    lastmodifiedby: "System",
    lastmodified: "2023-01-01T00:00:00+0000",
  },
];

const MOCK_MATURITY_DATES = [
  {
    maturity_date_id: 123,
    name: "30 dias",
    days: 30,
    associated_discount: 0,
  },
  {
    maturity_date_id: 124,
    name: "60 dias",
    days: 60,
    associated_discount: 2,
  },
];

const MOCK_DELIVERY_METHODS = [
  {
    delivery_method_id: 1777458,
    name: "Empresa 2",
    description: "Entrega por viatura própria",
    lastmodifiedby: "System",
    lastmodified: "2023-01-01T00:00:00+0000",
  },
  {
    delivery_method_id: 1777459,
    name: "CTT",
    description: "Envio por correio",
    lastmodifiedby: "System",
    lastmodified: "2023-01-01T00:00:00+0000",
  },
];

const MOCK_VEHICLES = [
  {
    vehicle_id: 12345,
    registration: "AA-00-AA",
    brand: "Ford",
    model: "Transit",
    lastmodifiedby: "System",
    lastmodified: "2023-01-01T00:00:00+0000",
  },
];

const MOCK_DEDUCTIONS = [
  {
    deduction_id: 111,
    name: "IRS",
    percentage: 21,
    lastmodifiedby: "System",
    lastmodified: "2023-01-01T00:00:00+0000",
  },
];

const MOCK_IDENTIFICATION_TEMPLATES = [
  {
    identification_template_id: 1,
    name: "Template 1",
    template: "{{ field }}",
    lastmodifiedby: "System",
    lastmodified: "2023-01-01T00:00:00+0000",
  },
];

const MOCK_PRODUCT_PROPERTIES = [
  {
    property_id: 34454,
    title: "Peso",
    default: 0,
  },
  {
    property_id: 34455,
    title: "Cor",
    default: 0,
  },
];

// ==================== Bank Accounts Tests ====================

Deno.test("[moloni-client/settings] bankAccounts getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_BANK_ACCOUNTS)]),
  );

  try {
    const result = await settings.bankAccounts("getAll", {});

    assertEquals(result as unknown, MOCK_BANK_ACCOUNTS);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/bankAccounts/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] bankAccounts getAll without params", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_BANK_ACCOUNTS)]),
  );

  try {
    const result = await settings.bankAccounts("getAll");

    assertEquals(result as unknown, MOCK_BANK_ACCOUNTS);
    assertEquals(fetchStub.calls.length, 1);
  } finally {
    fetchStub.restore();
  }
});

// ==================== Economic Activity Classification Codes Tests ====================

Deno.test("[moloni-client/settings] economicActivityClassificationCodes getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_EAC_CODES)]),
  );

  try {
    const result = await settings.economicActivityClassificationCodes(
      "getAll",
      {},
    );

    assertEquals(result as unknown, MOCK_EAC_CODES);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/economicActivityClassificationCodes/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] economicActivityClassificationCodes getAll without params", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_EAC_CODES)]),
  );

  try {
    const result = await settings.economicActivityClassificationCodes("getAll");

    assertEquals(result as unknown, MOCK_EAC_CODES);
  } finally {
    fetchStub.restore();
  }
});

// ==================== Payment Methods Tests ====================

Deno.test("[moloni-client/settings] paymentMethods getAll method with fixtures", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(paymentMethodsGetAll)]),
  );

  try {
    const result = await settings.paymentMethods("getAll", {});

    assertEquals(result as unknown, paymentMethodsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/paymentMethods/getAll/");

    // Verify fixture data structure
    const payments = result as typeof paymentMethodsGetAll;
    assertEquals(payments.length, 3);
    assertEquals(payments[0].name, "Cheque");
    assertEquals(payments[1].name, "Multibanco");
    assertEquals(payments[2].name, "Numerário");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] paymentMethods count method", async () => {
  const settings = new TestSettings();
  const mockResponse = { count: 3 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.paymentMethods("count", {});

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/paymentMethods/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] paymentMethods getOne method", async () => {
  const settings = new TestSettings();
  const mockResponse = paymentMethodsGetAll[0];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.paymentMethods("getOne", {
      company_id: 240211,
      payment_method_id: 1753483,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/paymentMethods/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] paymentMethods insert method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1, payment_method_id: 1753499 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.paymentMethods("insert", {
      name: "PIX",
      is_credit: 0,
      is_mb: 0,
      is_numerary: 0,
      is_tpa: 0,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/paymentMethods/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] paymentMethods delete method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.paymentMethods("delete", {
      company_id: 240211,
      payment_method_id: 1753483,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/paymentMethods/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ==================== Maturity Dates Tests ====================

Deno.test("[moloni-client/settings] maturityDates getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_MATURITY_DATES)]),
  );

  try {
    const result = await settings.maturityDates("getAll", {});

    assertEquals(result as unknown, MOCK_MATURITY_DATES);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/maturityDates/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] maturityDates insert method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1, maturity_date_id: 125 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.maturityDates("insert", {
      name: "90 dias",
      days: 90,
      associated_discount: 0,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/maturityDates/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] maturityDates delete method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.maturityDates("delete", {
      maturity_date_id: 123,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/maturityDates/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ==================== Delivery Methods Tests ====================

Deno.test("[moloni-client/settings] deliveryMethods getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_DELIVERY_METHODS)]),
  );

  try {
    const result = await settings.deliveryMethods("getAll", {});

    assertEquals(result as unknown, MOCK_DELIVERY_METHODS);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/deliveryMethods/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] deliveryMethods getAll without params", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_DELIVERY_METHODS)]),
  );

  try {
    const result = await settings.deliveryMethods("getAll");

    assertEquals(result as unknown, MOCK_DELIVERY_METHODS);
  } finally {
    fetchStub.restore();
  }
});

// ==================== Vehicles Tests ====================

Deno.test("[moloni-client/settings] vehicles getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_VEHICLES)]),
  );

  try {
    const result = await settings.vehicles("getAll", {});

    assertEquals(result as unknown, MOCK_VEHICLES);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/vehicles/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] vehicles getAll without params", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_VEHICLES)]),
  );

  try {
    const result = await settings.vehicles("getAll");

    assertEquals(result as unknown, MOCK_VEHICLES);
  } finally {
    fetchStub.restore();
  }
});

// ==================== Deductions Tests ====================

Deno.test("[moloni-client/settings] deductions getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_DEDUCTIONS)]),
  );

  try {
    const result = await settings.deductions("getAll", {});

    assertEquals(result as unknown, MOCK_DEDUCTIONS);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/deductions/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] deductions getAll without params", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_DEDUCTIONS)]),
  );

  try {
    const result = await settings.deductions("getAll");

    assertEquals(result as unknown, MOCK_DEDUCTIONS);
  } finally {
    fetchStub.restore();
  }
});

// ==================== Taxes Tests ====================

Deno.test("[moloni-client/settings] taxes getAll method with fixtures", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(taxesGetAll)]),
  );

  try {
    const result = await settings.taxes("getAll", {});

    assertEquals(result as unknown, taxesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/taxes/getAll/");

    // Verify fixture data structure
    const taxes = result as typeof taxesGetAll;
    assertEquals(taxes.length, 3);
    assertEquals(taxes[0].name, "IVA Normal");
    assertEquals(taxes[0].value, 23);
    assertEquals(taxes[1].name, "IVA Reduzido");
    assertEquals(taxes[1].value, 6);
    assertEquals(taxes[2].name, "IVA Intermédio");
    assertEquals(taxes[2].value, 13);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] taxes insert method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1, tax_id: 2564360 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.taxes("insert", {
      name: "IVA Teste",
      value: 10,
      type: 1,
      saft_type: 1,
      fiscal_zone: "PT",
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/taxes/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] taxes delete method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.taxes("delete", {
      tax_id: 2564343,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/taxes/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ==================== Measurement Units Tests ====================

Deno.test("[moloni-client/settings] measurementUnits getAll method with fixtures", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(measurementUnitsGetAll)]),
  );

  try {
    const result = await settings.measurementUnits("getAll", {});

    assertEquals(result as unknown, measurementUnitsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/measurementUnits/getAll/");

    // Verify fixture data structure
    const units = result as typeof measurementUnitsGetAll;
    assertEquals(units.length, 3);
    assertEquals(units[0].name, "Caixa");
    assertEquals(units[0].short_name, "CX");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] measurementUnits insert method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1, unit_id: 2669856 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.measurementUnits("insert", {
      name: "Litro",
      short_name: "L",
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/measurementUnits/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] measurementUnits delete method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.measurementUnits("delete", {
      unit_id: 2669855,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/measurementUnits/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ==================== Identification Templates Tests ====================

Deno.test("[moloni-client/settings] identificationTemplates getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_IDENTIFICATION_TEMPLATES)]),
  );

  try {
    const result = await settings.identificationTemplates("getAll", {});

    assertEquals(result as unknown, MOCK_IDENTIFICATION_TEMPLATES);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/identificationTemplates/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] identificationTemplates getAll without params", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_IDENTIFICATION_TEMPLATES)]),
  );

  try {
    const result = await settings.identificationTemplates("getAll");

    assertEquals(result as unknown, MOCK_IDENTIFICATION_TEMPLATES);
  } finally {
    fetchStub.restore();
  }
});

// ==================== Document Sets Tests ====================

Deno.test("[moloni-client/settings] documentSets getAll method with fixtures", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(documentSetsGetAll)]),
  );

  try {
    const result = await settings.documentSets("getAll", {});

    assertEquals(result as unknown, documentSetsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/documentSets/getAll/");

    // Verify fixture data structure
    const sets = result as typeof documentSetsGetAll;
    assertEquals(sets.length, 2);
    assertEquals(sets[0].name, "2026");
    assertEquals(sets[0].document_set_id, 884384);
    assertEquals(sets[1].name, "2025");
    assertEquals(sets[1].document_set_id, 774364);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] documentSets insert method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1, document_set_id: 884385 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.documentSets("insert", {
      name: "2027",
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/documentSets/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] documentSets delete method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.documentSets("delete", {
      document_set_id: 884384,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/documentSets/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ==================== Warehouses Tests ====================

Deno.test("[moloni-client/settings] warehouses getAll method with fixtures", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(warehousesGetAll)]),
  );

  try {
    const result = await settings.warehouses("getAll", {});

    assertEquals(result as unknown, warehousesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/warehouses/getAll/");

    // Verify fixture data structure
    const warehouses = result as typeof warehousesGetAll;
    assertEquals(warehouses.length, 1);
    assertEquals(warehouses[0].title, "Global");
    assertEquals(warehouses[0].warehouse_id, 334988);
    assertEquals(warehouses[0].is_default, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] warehouses insert method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1, warehouse_id: 334989 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.warehouses("insert", {
      title: "Armazém Secundário",
      code: "S",
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/warehouses/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] warehouses delete method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.warehouses("delete", {
      warehouse_id: 334988,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/warehouses/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ==================== Product Properties Tests ====================

Deno.test("[moloni-client/settings] productProperties getAll method", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_PRODUCT_PROPERTIES)]),
  );

  try {
    const result = await settings.productProperties("getAll", {});

    assertEquals(result as unknown, MOCK_PRODUCT_PROPERTIES);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productProperties/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] productProperties insert method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1, property_id: 34456 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.productProperties("insert", {
      title: "Material",
      default: 0,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productProperties/insert/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] productProperties delete method", async () => {
  const settings = new TestSettings();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.productProperties("delete", {
      property_id: 34454,
    });

    assertEquals(result as unknown, mockResponse);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productProperties/delete/",
    );
  } finally {
    fetchStub.restore();
  }
});

// ==================== Error Handling Tests ====================

Deno.test("[moloni-client/settings] error handling with API error message", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify({ message: "API Error" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await settings.taxes("getAll"),
      Error,
      "API Error",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] error handling with error_description", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({ error_description: "Invalid company_id" }),
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
      async () => await settings.warehouses("getAll"),
      Error,
      "Invalid company_id",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] error handling with generic status error", async () => {
  const settings = new TestSettings();

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
      async () => await settings.documentSets("getAll"),
      Error,
      "Request failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

// ==================== Methods Without Parameters Tests ====================

Deno.test("[moloni-client/settings] paymentMethods without parameters", async () => {
  const settings = new TestSettings();
  const mockResponse = { data: "test-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await settings.paymentMethods("getAll");

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/paymentMethods/getAll/");
  } finally {
    fetchStub.restore();
  }
});

// ==================== Multiple Methods Combined Tests ====================

Deno.test("[moloni-client/settings] all settings methods getAll endpoints", async () => {
  const settings = new TestSettings();
  const mockResponse = { data: "test-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
    ]),
  );

  try {
    await settings.bankAccounts("getAll", {});
    await settings.economicActivityClassificationCodes("getAll", {});
    await settings.paymentMethods("getAll", {});
    await settings.maturityDates("getAll", {});
    await settings.deliveryMethods("getAll", {});
    await settings.vehicles("getAll", {});
    await settings.deductions("getAll", {});
    await settings.taxes("getAll", {});
    await settings.measurementUnits("getAll", {});
    await settings.identificationTemplates("getAll", {});
    await settings.documentSets("getAll", {});
    await settings.warehouses("getAll", {});

    assertEquals(fetchStub.calls.length, 12);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/bankAccounts/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/economicActivityClassificationCodes/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/paymentMethods/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[3].args[0] as string),
      "/v1/maturityDates/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[4].args[0] as string),
      "/v1/deliveryMethods/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[5].args[0] as string),
      "/v1/vehicles/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[6].args[0] as string),
      "/v1/deductions/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[7].args[0] as string),
      "/v1/taxes/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[8].args[0] as string),
      "/v1/measurementUnits/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[9].args[0] as string),
      "/v1/identificationTemplates/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[10].args[0] as string),
      "/v1/documentSets/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[11].args[0] as string),
      "/v1/warehouses/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] productProperties getAll method verifies endpoint", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(MOCK_PRODUCT_PROPERTIES)]),
  );

  try {
    await settings.productProperties("getAll", {});

    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productProperties/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

// ==================== Fixture Data Validation Tests ====================

Deno.test("[moloni-client/settings] taxes fixture data validation", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(taxesGetAll)]),
  );

  try {
    const result = await settings.taxes("getAll", {});

    const taxes = result as typeof taxesGetAll;

    // Validate first tax (IVA Normal)
    assertEquals(taxes[0].tax_id, 2564343);
    assertEquals(taxes[0].name, "IVA Normal");
    assertEquals(taxes[0].value, 23);
    assertEquals(taxes[0].fiscal_zone, "PT");
    assertEquals(taxes[0].vat_type, "NOR");
    assertEquals(taxes[0].active_by_default, 1);

    // Validate second tax (IVA Reduzido)
    assertEquals(taxes[1].tax_id, 2564348);
    assertEquals(taxes[1].name, "IVA Reduzido");
    assertEquals(taxes[1].value, 6);
    assertEquals(taxes[1].vat_type, "RED");

    // Validate third tax (IVA Intermédio)
    assertEquals(taxes[2].tax_id, 2564353);
    assertEquals(taxes[2].name, "IVA Intermédio");
    assertEquals(taxes[2].value, 13);
    assertEquals(taxes[2].vat_type, "INT");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] documentSets fixture data validation", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(documentSetsGetAll)]),
  );

  try {
    const result = await settings.documentSets("getAll", {});

    const sets = result as typeof documentSetsGetAll;

    // Validate 2026 document set
    assertEquals(sets[0].document_set_id, 884384);
    assertEquals(sets[0].name, "2026");
    assertEquals(sets[0].active_by_default, 1);
    assertEquals(sets[0].eac?.eac_id, 701219);

    // Validate 2025 document set
    assertEquals(sets[1].document_set_id, 774364);
    assertEquals(sets[1].name, "2025");
    assertEquals(sets[1].active_by_default, 0);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] warehouses fixture data validation", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(warehousesGetAll)]),
  );

  try {
    const result = await settings.warehouses("getAll", {});

    const warehouses = result as typeof warehousesGetAll;

    // Validate Global warehouse
    assertEquals(warehouses[0].warehouse_id, 334988);
    assertEquals(warehouses[0].title, "Global");
    assertEquals(warehouses[0].code, "G");
    assertEquals(warehouses[0].is_default, 1);
    assertEquals(warehouses[0].city, "Mirandela");
    assertEquals(warehouses[0].zip_code, "5370-565");
    assertEquals(warehouses[0].country_id, 1);
    assertEquals(warehouses[0].country?.name, "Portugal");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] paymentMethods fixture data validation", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(paymentMethodsGetAll)]),
  );

  try {
    const result = await settings.paymentMethods("getAll", {});

    const methods = result as typeof paymentMethodsGetAll;

    // Validate Cheque
    assertEquals(methods[0].payment_method_id, 1753483);
    assertEquals(methods[0].name, "Cheque");
    assertEquals(methods[0].is_numerary, 0);
    assertEquals(methods[0].is_mb, 0);

    // Validate Multibanco
    assertEquals(methods[1].payment_method_id, 1753493);
    assertEquals(methods[1].name, "Multibanco");
    assertEquals(methods[1].is_mb, 1);

    // Validate Numerário
    assertEquals(methods[2].payment_method_id, 1753478);
    assertEquals(methods[2].name, "Numerário");
    assertEquals(methods[2].is_numerary, 1);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/settings] measurementUnits fixture data validation", async () => {
  const settings = new TestSettings();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(measurementUnitsGetAll)]),
  );

  try {
    const result = await settings.measurementUnits("getAll", {});

    const units = result as typeof measurementUnitsGetAll;

    // Validate Caixa (CX)
    assertEquals(units[0].unit_id, 2669855);
    assertEquals(units[0].name, "Caixa");
    assertEquals(units[0].short_name, "CX");

    // Validate Caixa (Cx.)
    assertEquals(units[1].unit_id, 2612406);
    assertEquals(units[1].name, "Caixa");
    assertEquals(units[1].short_name, "Cx.");

    // Validate Embalagem
    assertEquals(units[2].unit_id, 2612411);
    assertEquals(units[2].name, "Embalagem");
    assertEquals(units[2].short_name, "Emb.");
  } finally {
    fetchStub.restore();
  }
});
