// Copyright 2026 Higitotal, LDA. MIT License.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { GlobalData } from "./index.ts";
import { AUTH_RESPONSE, loadCannedResponse } from "../../canned/mod.ts";

// Load canned responses at top level
const countriesGetAll = await loadCannedResponse<unknown[]>(
  "countries",
  "getAll",
);
const languagesGetAll = await loadCannedResponse<unknown[]>(
  "languages",
  "getAll",
);
const currenciesGetAll = await loadCannedResponse<unknown[]>(
  "currencies",
  "getAll",
);
const fiscalZonesGetAll = await loadCannedResponse<unknown[]>(
  "fiscalZones",
  "getAll",
);
const geographicZonesGetAll = await loadCannedResponse<
  Array<{
    geographic_zone_id: number;
    name: string;
    short_name: string;
    company_id: number;
  }>
>("geographicZones", "getAll");

// AUTH_RESPONSE is exported but may not be used in this file
void AUTH_RESPONSE;

// Create a concrete test class extending GlobalData for testing
class TestGlobalData extends GlobalData {
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

// Type for fixture data with extended properties
// The fixtures have more properties than the typed responses
interface FixtureCountry {
  country_id: number;
  iso_3166_1: string;
  name: string;
  order: number;
  image: string;
  vies_vat_check_available: number;
  languages: { country_id: number; language_id: number; name: string }[];
  fiscal_zones: {
    fiscal_zone_id: number;
    country_id: number;
    name: string;
    code: string;
  }[];
}

interface FixtureLanguage {
  language_id: number;
  code: string;
  title: string;
}

interface FixtureCurrency {
  iso4217: string;
  currency_id: number;
  symbol: string;
  languages: { currency_id: number; language_id: number; name: string }[];
}

// ========== countries() tests ==========

Deno.test("[moloni-client/globalData] countries getAll returns fixture data", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countriesGetAll)]),
  );

  try {
    const result = await globalData.countries("getAll");

    assertEquals(result as unknown, countriesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/countries/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] countries getAll validates response structure", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countriesGetAll)]),
  );

  try {
    const result = await globalData.countries("getAll");

    // Validate structure of first country
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length > 0, true);
    assertEquals(typeof result[0].country_id, "number");
    assertEquals(typeof result[0].iso_3166_1, "string");
    assertEquals(result[0].iso_3166_1, "pt");
    assertEquals(result[0].country_id, 1);
  } finally {
    fetchStub.restore();
  }
});

// ========== fiscalZones() tests ==========

Deno.test("[moloni-client/globalData] fiscalZones getAll returns fixture data", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(fiscalZonesGetAll)]),
  );

  try {
    const result = await globalData.fiscalZones("getAll");

    assertEquals(result as unknown, fiscalZonesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/fiscalZones/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] fiscalZones getAll validates response structure", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(fiscalZonesGetAll)]),
  );

  try {
    const result = await globalData.fiscalZones("getAll");

    // Validate structure
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 2);
    // Check Acores
    assertEquals(result[0].fiscal_zone_id, 2);
    assertEquals(result[0].name, "Açores");
    assertEquals(result[0].code, "PT-AC");
    // Check Madeira
    assertEquals(result[1].fiscal_zone_id, 1);
    assertEquals(result[1].name, "Madeira");
    assertEquals(result[1].code, "PT-MA");
  } finally {
    fetchStub.restore();
  }
});

// ========== languages() tests ==========

Deno.test("[moloni-client/globalData] languages getAll returns fixture data", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(languagesGetAll)]),
  );

  try {
    const result = await globalData.languages("getAll");

    assertEquals(result as unknown, languagesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/languages/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] languages getAll validates response structure", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(languagesGetAll)]),
  );

  try {
    const result =
      (await globalData.languages("getAll")) as unknown as FixtureLanguage[];

    // Validate structure
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 3);
    // Check Portuguese
    const ptLang = result.find((l) => l.code === "PT");
    assertEquals(ptLang?.language_id, 1);
    assertEquals(ptLang?.title, "Português");
    // Check English
    const enLang = result.find((l) => l.code === "EN");
    assertEquals(enLang?.language_id, 2);
    assertEquals(enLang?.title, "English");
    // Check Spanish
    const esLang = result.find((l) => l.code === "ES");
    assertEquals(esLang?.language_id, 3);
    assertEquals(esLang?.title, "Español");
  } finally {
    fetchStub.restore();
  }
});

// ========== currencies() tests ==========

Deno.test("[moloni-client/globalData] currencies getAll returns fixture data", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(currenciesGetAll)]),
  );

  try {
    const result = await globalData.currencies("getAll");

    assertEquals(result as unknown, currenciesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/currencies/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] currencies getAll validates response structure", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(currenciesGetAll)]),
  );

  try {
    const result =
      (await globalData.currencies("getAll")) as unknown as FixtureCurrency[];

    // Validate structure
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 3);
    // Check Euro
    const eur = result.find((c) => c.iso4217 === "EUR");
    assertEquals(eur?.currency_id, 1);
    assertEquals(eur?.symbol, "€");
    // Check US Dollar
    const usd = result.find((c) => c.iso4217 === "USD");
    assertEquals(usd?.currency_id, 2);
    assertEquals(usd?.symbol, "$");
    // Check British Pound
    const gbp = result.find((c) => c.iso4217 === "GBP");
    assertEquals(gbp?.currency_id, 3);
    assertEquals(gbp?.symbol, "£");
  } finally {
    fetchStub.restore();
  }
});

// ========== geographicZones() tests ==========

Deno.test("[moloni-client/globalData] geographicZones getAll returns fixture data", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(geographicZonesGetAll)]),
  );

  try {
    const result = await globalData.geographicZones("getAll");

    assertEquals(result as unknown, geographicZonesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/geographicZones/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] geographicZones getAll validates response structure", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(geographicZonesGetAll)]),
  );

  try {
    const result = await globalData.geographicZones("getAll");

    // Validate structure
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 3);
    // Check first zone
    assertEquals(result[0].geographic_zone_id, 18238);
    assertEquals(result[0].name, "Sem Zona");
    assertEquals(result[0].short_name, "0");
    assertEquals(result[0].company_id, 240211);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] geographicZones count endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = { count: 5 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.geographicZones("count");

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/geographicZones/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] geographicZones getOne endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = geographicZonesGetAll[0];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.geographicZones("getOne", {
      company_id: 240211,
      geographic_zone_id: 18238,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/geographicZones/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] geographicZones insert endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = { valid: 1, geographic_zone_id: 12345 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.geographicZones("insert", {
      name: "New Zone",
      short_name: "NZ",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/geographicZones/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] geographicZones delete endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.geographicZones("delete", {
      company_id: 240211,
      geographic_zone_id: 18238,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/geographicZones/delete/");
  } finally {
    fetchStub.restore();
  }
});

// ========== documentModels() tests ==========

Deno.test("[moloni-client/globalData] documentModels getAll endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = [
    {
      document_model_id: 1,
      name: "Model 1",
      description: "Test model",
      lastmodifiedby: "test",
      lastmodified: "2026-01-01",
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.documentModels("getAll");

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/documentModels/getAll/");
  } finally {
    fetchStub.restore();
  }
});

// ========== taxExemptions() tests ==========

Deno.test("[moloni-client/globalData] taxExemptions getAll endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = [
    {
      tax_exemption_id: 1,
      name: "M01",
      code: "M01",
      lastmodifiedby: "test",
      lastmodified: "2026-01-01",
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.taxExemptions("getAll");

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/taxExemptions/getAll/");
  } finally {
    fetchStub.restore();
  }
});

// ========== currencyExchange() tests ==========

Deno.test("[moloni-client/globalData] currencyExchange getAll endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = [
    {
      exchange_id: 1,
      from_currency_id: 1,
      to_currency_id: 2,
      rate: 1.08,
      lastmodifiedby: "test",
      lastmodified: "2026-01-01",
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.currencyExchange("getAll");

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/currencyExchange/getAll/");
  } finally {
    fetchStub.restore();
  }
});

// ========== mBGateways() tests ==========

Deno.test("[moloni-client/globalData] mBGateways getAll endpoint", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = [
    {
      gateway_id: 1,
      name: "MB Gateway",
      description: "Multibanco gateway",
      lastmodifiedby: "test",
      lastmodified: "2026-01-01",
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await globalData.mBGateways("getAll");

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/mBGateways/getAll/");
  } finally {
    fetchStub.restore();
  }
});

// ========== Error handling tests ==========

Deno.test("[moloni-client/globalData] handles API error response", async () => {
  const globalData = new TestGlobalData();

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
      async () => await globalData.countries("getAll"),
      Error,
      "API Error",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] handles error_description in response", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({ error_description: "Invalid access token" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        ),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await globalData.languages("getAll"),
      Error,
      "Invalid access token",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] handles empty error response", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response("not json", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await globalData.currencies("getAll"),
      Error,
      "Request failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

// ========== Multiple methods in sequence tests ==========

Deno.test("[moloni-client/globalData] multiple sequential API calls", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(countriesGetAll),
      createMockFetchResponse(languagesGetAll),
      createMockFetchResponse(currenciesGetAll),
    ]),
  );

  try {
    const countries = await globalData.countries("getAll");
    const languages = await globalData.languages("getAll");
    const currencies = await globalData.currencies("getAll");

    assertEquals(countries as unknown, countriesGetAll);
    assertEquals(languages as unknown, languagesGetAll);
    assertEquals(currencies as unknown, currenciesGetAll);
    assertEquals(fetchStub.calls.length, 3);

    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/countries/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/languages/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/currencies/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] all globalData methods can be called", async () => {
  const globalData = new TestGlobalData();
  const mockResponse = { data: "response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(countriesGetAll),
      createMockFetchResponse(fiscalZonesGetAll),
      createMockFetchResponse(languagesGetAll),
      createMockFetchResponse(currenciesGetAll),
      createMockFetchResponse(geographicZonesGetAll),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
    ]),
  );

  try {
    await globalData.countries("getAll");
    await globalData.fiscalZones("getAll");
    await globalData.languages("getAll");
    await globalData.currencies("getAll");
    await globalData.geographicZones("getAll");
    await globalData.documentModels("getAll");
    await globalData.taxExemptions("getAll");
    await globalData.currencyExchange("getAll");
    await globalData.mBGateways("getAll");

    assertEquals(fetchStub.calls.length, 9);

    // Verify each endpoint was called correctly
    const endpoints = [
      "/v1/countries/getAll/",
      "/v1/fiscalZones/getAll/",
      "/v1/languages/getAll/",
      "/v1/currencies/getAll/",
      "/v1/geographicZones/getAll/",
      "/v1/documentModels/getAll/",
      "/v1/taxExemptions/getAll/",
      "/v1/currencyExchange/getAll/",
      "/v1/mBGateways/getAll/",
    ];

    endpoints.forEach((endpoint, index) => {
      assertEquals(
        getEndpointFromUrl(fetchStub.calls[index].args[0] as string),
        endpoint,
      );
    });
  } finally {
    fetchStub.restore();
  }
});

// ========== Fixture data validation tests ==========

Deno.test("[moloni-client/globalData] countries fixture contains expected countries", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countriesGetAll)]),
  );

  try {
    const result =
      (await globalData.countries("getAll")) as unknown as FixtureCountry[];

    // Validate Portugal
    const portugal = result.find((c) => c.iso_3166_1 === "pt");
    assertEquals(portugal?.country_id, 1);
    assertEquals(portugal?.name, "Portugal");
    assertEquals(portugal?.vies_vat_check_available, 1);

    // Validate Brazil
    const brazil = result.find((c) => c.iso_3166_1 === "br");
    assertEquals(brazil?.country_id, 33);
    assertEquals(brazil?.name, "Brasil");
    assertEquals(brazil?.vies_vat_check_available, 0);

    // Validate Angola
    const angola = result.find((c) => c.iso_3166_1 === "ao");
    assertEquals(angola?.country_id, 8);
    assertEquals(angola?.name, "Angola");
    assertEquals(angola?.vies_vat_check_available, 0);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] countries fixture contains fiscal zones for Portugal", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countriesGetAll)]),
  );

  try {
    const result =
      (await globalData.countries("getAll")) as unknown as FixtureCountry[];

    const portugal = result.find((c) => c.iso_3166_1 === "pt");
    assertEquals(portugal?.fiscal_zones?.length, 2);

    const madeira = portugal?.fiscal_zones?.find((fz) => fz.code === "PT-MA");
    assertEquals(madeira?.name, "Madeira");
    assertEquals(madeira?.fiscal_zone_id, 1);

    const acores = portugal?.fiscal_zones?.find((fz) => fz.code === "PT-AC");
    assertEquals(acores?.name, "Açores");
    assertEquals(acores?.fiscal_zone_id, 2);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] geographicZones with offset parameter", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(geographicZonesGetAll)]),
  );

  try {
    const result = await globalData.geographicZones("getAll", { offset: 10 });

    assertEquals(result as unknown, geographicZonesGetAll);
    assertEquals(fetchStub.calls.length, 1);

    // Verify POST body contains offset parameter
    const options = fetchStub.calls[0].args[1] as RequestInit;
    const body = JSON.parse(options.body as string);
    assertEquals(body.offset, 10);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/globalData] geographicZones with status parameter", async () => {
  const globalData = new TestGlobalData();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(geographicZonesGetAll)]),
  );

  try {
    const result = await globalData.geographicZones("getAll", { status: 1 });

    assertEquals(result as unknown, geographicZonesGetAll);
    assertEquals(fetchStub.calls.length, 1);

    // Verify POST body contains status parameter
    const options = fetchStub.calls[0].args[1] as RequestInit;
    const body = JSON.parse(options.body as string);
    assertEquals(body.status, 1);
  } finally {
    fetchStub.restore();
  }
});
