// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Tests for the resource-class facades in `utils/moloni-client/src/*`. Lives
 * outside the `utils/moloni-client/` subtree because the test runner --ignores
 * that directory (the underlying `Base.request()` hits `api.moloni.pt`, so the
 * subtree is integration-only). The facades themselves are thin generic-typed
 * wrappers — each method composes a relative URL and forwards to
 * `Base.request()`. With a stubbed global `fetch` and pre-seeded credentials,
 * we can verify every facade method points at the documented endpoint without
 * any network I/O.
 */

import { assert, assertEquals } from "std/assert/mod.ts";
import { describe, it } from "std/testing/bdd.ts";
import { stub } from "std/testing/mock.ts";
import { Documents } from "./src/documents/index.ts";
import { Entities } from "./src/entities/index.ts";
import { GlobalData } from "./src/globalData/index.ts";
import { Products } from "./src/products/index.ts";
import { Settings } from "./src/settings/index.ts";
import { Users } from "./src/users/index.ts";
import { applyMixins } from "./src/utils.ts";

const FAKE_CREDS = {
  access_token: "TOKEN",
  refresh_token: "REFRESH",
  expires_in: 3600,
  token_type: "bearer",
  scope: null,
} as const;

function makeClient<T>(
  Cls: new (config: ConstructorParameters<typeof Documents>[0]) => T,
): T {
  return new Cls({
    clientId: "id",
    clientSecret: "secret",
    credentials: FAKE_CREDS,
  });
}

/**
 * Stub global fetch to return an empty JSON object so any request resolves
 * cleanly. Returns the captured request URLs so per-method assertions can
 * confirm the right endpoint was hit.
 */
function withFetchStub<T>(
  fn: (urls: string[]) => Promise<T>,
): Promise<T> {
  const urls: string[] = [];
  const fetchStub = stub(
    globalThis,
    "fetch",
    (input: URL | RequestInfo, _init?: RequestInit) => {
      urls.push(typeof input === "string" ? input : (input as URL).toString());
      return Promise.resolve(
        new Response("{}", {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      );
    },
  );
  return fn(urls).finally(() => fetchStub.restore());
}

describe("Documents facade", () => {
  const cases: Array<
    [name: keyof Documents, fragment: string]
  > = [
    ["documents", "/documents/getOne/"],
    ["pendingDocuments", "/SalesPending/insert/"],
    ["invoices", "/invoices/getAll/"],
    ["settlementNotes", "/settlementNotes/getOne/"],
    ["migratedBalancesInvoices", "/migratedBalancesInvoices/getOne/"],
    ["receipts", "/receipts/getOne/"],
    ["migratedBalancesReceipts", "/migratedBalancesReceipts/getOne/"],
    ["creditNotes", "/creditNotes/getOne/"],
    ["migratedBalancesCreditNotes", "/migratedBalancesCreditNotes/getOne/"],
    ["debitNotes", "/debitNotes/getOne/"],
    ["simplifiedInvoices", "/simplifiedInvoices/getOne/"],
    ["deliveryNotes", "/deliveryNotes/getOne/"],
    ["billsOfLading", "/billsOfLading/getOne/"],
    ["ownAssetsMovementGuides", "/ownAssetsMovementGuides/getOne/"],
    ["waybills", "/waybills/getOne/"],
    ["customerReturnNotes", "/customerReturnNotes/getOne/"],
    ["estimates", "/estimates/getOne/"],
    ["internalDocuments", "/internalDocuments/getOne/"],
    ["invoiceReceipts", "/invoiceReceipts/getOne/"],
    ["paymentReturns", "/paymentReturns/getOne/"],
    ["purchaseOrder", "/purchaseOrder/getOne/"],
    ["supplierPurchaseOrder", "/supplierPurchaseOrder/getOne/"],
    ["supplierInvoices", "/supplierInvoices/getOne/"],
    ["supplierSimplifiedInvoices", "/supplierSimplifiedInvoices/getOne/"],
    ["supplierCreditNotes", "/supplierCreditNotes/getOne/"],
    ["supplierDebitNotes", "/supplierDebitNotes/getOne/"],
    ["supplierReturnNotes", "/supplierReturnNotes/getOne/"],
    ["supplierReceipts", "/supplierReceipts/getOne/"],
    ["supplierWarrantyRequests", "/supplierWarrantyRequests/getOne/"],
    ["globalGuides", "/globalGuides/getOne/"],
  ];
  for (const [method, fragment] of cases) {
    it(`${String(method)} → ${fragment}`, async () => {
      await withFetchStub(async (urls) => {
        const client = makeClient(Documents);
        // deno-lint-ignore no-explicit-any
        const fn = (client as any)[method].bind(client) as (
          op: string,
        ) => Promise<unknown>;
        const op = fragment.split("/").filter(Boolean).pop()!;
        await fn(op);
        assert(
          urls.some((u) => u.includes(fragment)),
          `expected one URL to include ${fragment}, got ${urls.join(", ")}`,
        );
      });
    });
  }
});

describe("Entities facade", () => {
  const cases: Array<[keyof Entities, string]> = [
    ["customers", "/customers/getOne/"],
    ["customerAlternateAddresses", "/customerAlternateAddresses/getOne/"],
    ["suppliers", "/suppliers/getOne/"],
    ["salesmen", "/salesmen/getOne/"],
  ];
  for (const [method, fragment] of cases) {
    it(`${String(method)} → ${fragment}`, async () => {
      await withFetchStub(async (urls) => {
        const client = makeClient(Entities);
        // deno-lint-ignore no-explicit-any
        const fn = (client as any)[method].bind(client);
        await fn(fragment.split("/").filter(Boolean).pop()!);
        assert(urls.some((u) => u.includes(fragment)));
      });
    });
  }
});

describe("Products facade", () => {
  const cases: Array<[keyof Products, string]> = [
    ["products", "/products/getOne/"],
    ["productCategories", "/productCategories/getOne/"],
    ["productStocks", "/productStocks/getOne/"],
    ["priceClasses", "/PriceClasses/getOne/"],
  ];
  for (const [method, fragment] of cases) {
    it(`${String(method)} → ${fragment}`, async () => {
      await withFetchStub(async (urls) => {
        const client = makeClient(Products);
        // deno-lint-ignore no-explicit-any
        await (client as any)[method].call(
          client,
          fragment.split("/").filter(Boolean).pop()!,
        );
        assert(urls.some((u) => u.includes(fragment)));
      });
    });
  }
});

describe("Settings facade", () => {
  const cases: Array<[keyof Settings, string]> = [
    ["bankAccounts", "/bankAccounts/getOne/"],
    [
      "economicActivityClassificationCodes",
      "/economicActivityClassificationCodes/getOne/",
    ],
    ["paymentMethods", "/paymentMethods/getOne/"],
    ["maturityDates", "/maturityDates/getOne/"],
    ["deliveryMethods", "/deliveryMethods/getOne/"],
    ["vehicles", "/vehicles/getOne/"],
    ["deductions", "/deductions/getOne/"],
    ["taxes", "/taxes/getOne/"],
    ["measurementUnits", "/measurementUnits/getOne/"],
    ["identificationTemplates", "/identificationTemplates/getOne/"],
    ["documentSets", "/documentSets/getOne/"],
    ["warehouses", "/warehouses/getOne/"],
    ["productProperties", "/productProperties/getOne/"],
  ];
  for (const [method, fragment] of cases) {
    it(`${String(method)} → ${fragment}`, async () => {
      await withFetchStub(async (urls) => {
        const client = makeClient(Settings);
        // deno-lint-ignore no-explicit-any
        await (client as any)[method].call(
          client,
          fragment.split("/").filter(Boolean).pop()!,
        );
        assert(urls.some((u) => u.includes(fragment)));
      });
    });
  }
});

describe("GlobalData facade", () => {
  const cases: Array<[keyof GlobalData, string]> = [
    ["countries", "/countries/getOne/"],
    ["fiscalZones", "/fiscalZones/getOne/"],
    ["languages", "/languages/getOne/"],
    ["currencies", "/currencies/getOne/"],
    ["geographicZones", "/geographicZones/getOne/"],
    ["documentModels", "/documentModels/getOne/"],
    ["taxExemptions", "/taxExemptions/getOne/"],
    ["currencyExchange", "/currencyExchange/getOne/"],
    ["mBGateways", "/mBGateways/getOne/"],
  ];
  for (const [method, fragment] of cases) {
    it(`${String(method)} → ${fragment}`, async () => {
      await withFetchStub(async (urls) => {
        const client = makeClient(GlobalData);
        // deno-lint-ignore no-explicit-any
        await (client as any)[method].call(
          client,
          fragment.split("/").filter(Boolean).pop()!,
        );
        assert(urls.some((u) => u.includes(fragment)));
      });
    });
  }
});

describe("Users facade", () => {
  it("delegates users() to /users/", async () => {
    await withFetchStub(async (urls) => {
      const client = makeClient(Users);
      // deno-lint-ignore no-explicit-any
      await (client as any).users("getMe");
      assert(urls.some((u) => u.includes("/users/getMe/")));
    });
  });
});

describe("Base.request error paths", () => {
  it("rejects write operations with status != 0", async () => {
    await withFetchStub(async () => {
      const client = makeClient(Documents);
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).documents("insert", { status: 1 });
      } catch (e) {
        err = e;
      }
      assert(err instanceof Error);
      assert(err.message.includes("Publishing documents is not allowed"));
    });
  });

  it("wraps non-OK responses into an Error", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () =>
        Promise.resolve(
          new Response(
            JSON.stringify({ error_description: "auth failed" }),
            {
              status: 401,
              headers: { "content-type": "application/json" },
            },
          ),
        ),
    );
    try {
      const client = makeClient(Documents);
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).documents("getAll");
      } catch (e) {
        err = e;
      }
      assert(err instanceof Error);
      assertEquals(err.message, "auth failed");
    } finally {
      fetchStub.restore();
    }
  });
});

describe("Base.authenticate", () => {
  it("uses pre-supplied credentials directly", async () => {
    await withFetchStub(async (urls) => {
      const client = makeClient(Documents);
      // No /grant should be reached because credentials are pre-supplied.
      // deno-lint-ignore no-explicit-any
      const auth = await (client as any).authenticate();
      assertEquals(auth.access_token, "TOKEN");
      assert(!urls.some((u) => u.includes("/grant")));
    });
  });

  it("fetches /grant when no credentials supplied and parses response", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () =>
        Promise.resolve(
          new Response(
            JSON.stringify({
              access_token: "got-it",
              refresh_token: "r",
              expires_in: 3600,
              token_type: "bearer",
              scope: null,
            }),
            { status: 200, headers: { "content-type": "application/json" } },
          ),
        ),
    );
    try {
      const client = new Documents({
        clientId: "id",
        clientSecret: "secret",
        username: "u",
        password: "p",
      });
      // deno-lint-ignore no-explicit-any
      const auth = await (client as any).authenticate();
      assertEquals(auth.access_token, "got-it");
    } finally {
      fetchStub.restore();
    }
  });

  it("falls back to status text when auth error JSON is empty", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () =>
        Promise.resolve(
          new Response("not json", {
            status: 503,
            headers: { "content-type": "text/plain" },
          }),
        ),
    );
    try {
      const client = new Documents({
        clientId: "id",
        clientSecret: "secret",
        username: "u",
        password: "p",
      });
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).authenticate();
      } catch (e) {
        err = e;
      }
      assert(err.message.includes("503"));
    } finally {
      fetchStub.restore();
    }
  });

  it("wraps non-Error rejections during authenticate()", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      // deno-lint-ignore no-explicit-any
      (() => Promise.reject("plain string")) as any,
    );
    try {
      const client = new Documents({
        clientId: "id",
        clientSecret: "secret",
        username: "u",
        password: "p",
      });
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).authenticate();
      } catch (e) {
        err = e;
      }
      assertEquals(err.message, "plain string");
    } finally {
      fetchStub.restore();
    }
  });

  it("throws when /grant returns a non-OK status", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () =>
        Promise.resolve(
          new Response(
            JSON.stringify({ error_description: "invalid_grant" }),
            {
              status: 401,
              headers: { "content-type": "application/json" },
            },
          ),
        ),
    );
    try {
      const client = new Documents({
        clientId: "id",
        clientSecret: "secret",
        username: "u",
        password: "p",
      });
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).authenticate();
      } catch (e) {
        err = e;
      }
      assert(err instanceof Error);
      assertEquals(err.message, "invalid_grant");
    } finally {
      fetchStub.restore();
    }
  });
});

describe("Base.request error fallbacks", () => {
  it("uses errorData.message when error_description is missing", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () =>
        Promise.resolve(
          new Response(
            JSON.stringify({ message: "fallback msg" }),
            {
              status: 400,
              headers: { "content-type": "application/json" },
            },
          ),
        ),
    );
    try {
      const client = makeClient(Documents);
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).documents("getOne");
      } catch (e) {
        err = e;
      }
      assertEquals(err.message, "fallback msg");
    } finally {
      fetchStub.restore();
    }
  });

  it("falls back to status text when error JSON is empty", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () =>
        Promise.resolve(
          new Response("not json", {
            status: 502,
            headers: { "content-type": "text/plain" },
          }),
        ),
    );
    try {
      const client = makeClient(Documents);
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).documents("getOne");
      } catch (e) {
        err = e;
      }
      assert(err.message.includes("502"));
    } finally {
      fetchStub.restore();
    }
  });

  it("wraps non-Error rejections from fetch", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      // deno-lint-ignore no-explicit-any
      (() => Promise.reject("plain string")) as any,
    );
    try {
      const client = makeClient(Documents);
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).documents("getOne");
      } catch (e) {
        err = e;
      }
      assertEquals(err.message, "plain string");
    } finally {
      fetchStub.restore();
    }
  });

  it("wraps a thrown fetch error", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () => Promise.reject(new Error("network down")),
    );
    try {
      const client = makeClient(Documents);
      // deno-lint-ignore no-explicit-any
      let err: any;
      try {
        // deno-lint-ignore no-explicit-any
        await (client as any).documents("getOne");
      } catch (e) {
        err = e;
      }
      assertEquals(err.message, "network down");
    } finally {
      fetchStub.restore();
    }
  });
});

describe("Base sandbox mode", () => {
  it("routes requests through the sandbox URL when sandbox=true", async () => {
    await withFetchStub(async (urls) => {
      const client = new Documents({
        clientId: "id",
        clientSecret: "secret",
        credentials: FAKE_CREDS,
        sandbox: true,
      });
      // deno-lint-ignore no-explicit-any
      await (client as any).documents("getOne");
      assert(urls.some((u) => u.includes("/sandbox/")));
    });
  });
});

describe("Base.request triggers ensureAuthenticated when no credentials", () => {
  it("calls /grant first, then the endpoint", async () => {
    const urls: string[] = [];
    const fetchStub = stub(
      globalThis,
      "fetch",
      (input: URL | RequestInfo) => {
        const url = typeof input === "string"
          ? input
          : (input as URL).toString();
        urls.push(url);
        if (url.includes("/grant")) {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                access_token: "x",
                refresh_token: "r",
                expires_in: 3600,
                token_type: "bearer",
                scope: null,
              }),
              { status: 200, headers: { "content-type": "application/json" } },
            ),
          );
        }
        return Promise.resolve(
          new Response("{}", {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        );
      },
    );
    try {
      const client = new Documents({
        clientId: "id",
        clientSecret: "secret",
        username: "u",
        password: "p",
      });
      // deno-lint-ignore no-explicit-any
      await (client as any).documents("getOne");
      assert(urls.some((u) => u.includes("/grant")));
      assert(urls.some((u) => u.includes("/documents/getOne/")));
    } finally {
      fetchStub.restore();
    }
  });
});

describe("Base.setCompanyId", () => {
  it("is chainable", () => {
    const client = makeClient(Documents);
    const result = client.setCompanyId(123);
    assertEquals(result, client);
  });
});

describe("applyMixins", () => {
  it("copies prototype methods from base ctors onto the derived ctor", () => {
    class A {
      foo() {
        return "a-foo";
      }
    }
    class B {
      bar() {
        return "b-bar";
      }
    }
    class Derived {}
    applyMixins(Derived, [A, B]);
    // deno-lint-ignore no-explicit-any
    const inst = new (Derived as any)();
    assertEquals(inst.foo(), "a-foo");
    assertEquals(inst.bar(), "b-bar");
  });
});
