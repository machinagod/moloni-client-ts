// Copyright 2026 Higitotal, LDA. MIT License.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { Documents } from "./index.ts";
import { loadCannedResponse } from "../../canned/mod.ts";

// Load canned responses at top level
const documentsGetAll = await loadCannedResponse<unknown[]>(
  "documents",
  "getAll",
);
const invoiceReceiptsGetAll = await loadCannedResponse<unknown[]>(
  "invoiceReceipts",
  "getAll",
);

// Create a concrete test class extending Base for testing
class TestDocuments extends Documents {
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

Deno.test("[moloni-client/documents] documents method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "test-documents-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.documents("getAll", {
      status: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/documents/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] pendingDocuments method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "test-pending-documents-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.pendingDocuments("getAllByDate", {
      start_date: "2023-01-01 00:00:00",
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/SalesPending/getAllByDate/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] settlementNotes method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "test-settlement-notes-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.settlementNotes("getAll", {
      status: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/settlementNotes/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] invoices method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { invoices: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.invoices("getAll", { status: 0 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/invoices/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] receipts method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { receipts: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.receipts("getAll", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/receipts/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] creditNotes method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { credit_notes: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.creditNotes("getOne", { document_id: 456 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/creditNotes/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] migratedBalancesInvoices method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { migrated_invoices: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.migratedBalancesInvoices("getAll", {
      status: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/migratedBalancesInvoices/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] debitNotes method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { debit_notes: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.debitNotes("count", {});

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/debitNotes/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] simplifiedInvoices method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { simplified_invoices: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.simplifiedInvoices("getAll", { offset: 50 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/simplifiedInvoices/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] deliveryNotes method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { delivery_notes: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.deliveryNotes("getAll", { status: 1 });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/deliveryNotes/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] purchaseOrder method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { purchase_orders: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.purchaseOrder("getAll", {
      status: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/purchaseOrder/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] supplierInvoices method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { supplier_invoices: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.supplierInvoices("getAll", {
      status: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/supplierInvoices/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] globalGuides method", async () => {
  const docs = new TestDocuments();
  const mockResponse = { global_guides: [] };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.globalGuides("getAll", {
      status: 1,
    });

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/globalGuides/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] methods without parameters", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "test-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await docs.invoices("getAll");

    assertEquals(result as unknown, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/invoices/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] error handling", async () => {
  const docs = new TestDocuments();

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
      async () => await docs.documents("getAll"),
      Error,
      "API Error",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] all supplier document types", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "supplier-response" };

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
    ]),
  );

  try {
    await docs.supplierPurchaseOrder("getAll", {});
    await docs.supplierSimplifiedInvoices("getAll", {});
    await docs.supplierCreditNotes("getAll", {});
    await docs.supplierDebitNotes("getAll", {});
    await docs.supplierReturnNotes("getAll", {});
    await docs.supplierReceipts("getAll", {});
    await docs.supplierWarrantyRequests("getAll", {});

    assertEquals(fetchStub.calls.length, 7);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/supplierPurchaseOrder/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/supplierSimplifiedInvoices/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/supplierCreditNotes/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[3].args[0] as string),
      "/v1/supplierDebitNotes/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[4].args[0] as string),
      "/v1/supplierReturnNotes/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[5].args[0] as string),
      "/v1/supplierReceipts/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[6].args[0] as string),
      "/v1/supplierWarrantyRequests/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] all migrated balance document types", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "migrated-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
    ]),
  );

  try {
    await docs.migratedBalancesReceipts("getAll", {});
    await docs.migratedBalancesCreditNotes("getAll", {});

    assertEquals(fetchStub.calls.length, 2);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/migratedBalancesReceipts/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/migratedBalancesCreditNotes/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] transport and logistics documents", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "transport-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
    ]),
  );

  try {
    await docs.billsOfLading("getAll", {});
    await docs.ownAssetsMovementGuides("getAll", {});
    await docs.waybills("getAll", {});
    await docs.customerReturnNotes("getAll", {});

    assertEquals(fetchStub.calls.length, 4);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/billsOfLading/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/ownAssetsMovementGuides/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/waybills/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[3].args[0] as string),
      "/v1/customerReturnNotes/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] other document types", async () => {
  const docs = new TestDocuments();
  const mockResponse = { data: "other-response" };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
      createMockFetchResponse(mockResponse),
    ]),
  );

  try {
    await docs.estimates("getAll", {});
    await docs.internalDocuments("getAll", {});
    await docs.invoiceReceipts("getAll", {});
    await docs.paymentReturns("getAll", {});

    assertEquals(fetchStub.calls.length, 4);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/estimates/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/internalDocuments/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/invoiceReceipts/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[3].args[0] as string),
      "/v1/paymentReturns/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

// ===== Tests using canned fixture data =====

Deno.test("[moloni-client/documents] documents getAll returns fixture data", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(documentsGetAll)]),
  );

  try {
    const result = await docs.documents("getAll", { status: 0 });

    assertEquals(result as unknown, documentsGetAll);
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 1);
    assertEquals(result[0].document_id, 904208253);
    assertEquals(result[0].document_type_id, 14);
    assertEquals(
      result[0].entity_name,
      "Entidade 11",
    );
    assertEquals(result[0].net_value, 930.1);
    assertEquals(result[0].document_set_name, "2025");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] invoiceReceipts getAll returns fixture data", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(invoiceReceiptsGetAll)]),
  );

  try {
    const result = await docs.invoiceReceipts("getAll", { status: 1 });

    assertEquals(result as unknown, invoiceReceiptsGetAll);
    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 1);
    assertEquals(result[0].document_id, 933574298);
    assertEquals(result[0].document_type_id, 27);
    assertEquals(result[0].entity_name, "Entidade 108");
    assertEquals(result[0].net_value, 26.35);
    assertEquals(result[0].status, 1);
    assertEquals(result[0].document_set_name, "2026");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] documents getOne with fixture data", async () => {
  const docs = new TestDocuments();
  const singleDocument = documentsGetAll[0];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(singleDocument)]),
  );

  try {
    const result = await docs.documents("getOne", { document_id: 904208253 });

    assertEquals(result.document_id, 904208253);
    assertEquals(result.company_id, 240211);
    assertEquals(result.salesman_id, 142686);
    assertEquals(result.customer_id, 89400286);
    assertEquals(result.gross_value, 756.19);
    assertEquals(result.taxes_value, 173.91);
    assertEquals(result.document_type.saft_code, "OR");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] invoiceReceipts getOne with fixture data", async () => {
  const docs = new TestDocuments();
  const singleInvoiceReceipt = invoiceReceiptsGetAll[0];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(singleInvoiceReceipt)]),
  );

  try {
    const result = await docs.invoiceReceipts("getOne", {
      document_id: 933574298,
    });

    assertEquals(result.document_id, 933574298);
    assertEquals(result.company_id, 240211);
    assertEquals(result.salesman_id, 142711);
    assertEquals(result.customer_id, 120003193);
    assertEquals(result.number, 35);
    assertEquals(result.gross_value, 25.2);
    assertEquals(result.comercial_discount_value, 3.78);
    assertEquals(result.reconciled_value, 26.35);
    assertEquals(result.document_type.saft_code, "FR");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] documents count returns count object", async () => {
  const docs = new TestDocuments();
  const countResponse = { count: 150 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countResponse)]),
  );

  try {
    const result = await docs.documents("count", { status: 1 });

    assertEquals(result.count, 150);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/documents/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] invoices count returns count object", async () => {
  const docs = new TestDocuments();
  const countResponse = { count: 75 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countResponse)]),
  );

  try {
    const result = await docs.invoices("count", { status: 0 });

    assertEquals(result.count, 75);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/invoices/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] receipts count returns count object", async () => {
  const docs = new TestDocuments();
  const countResponse = { count: 200 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countResponse)]),
  );

  try {
    const result = await docs.receipts("count", { status: 1 });

    assertEquals(result.count, 200);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/receipts/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] creditNotes count returns count object", async () => {
  const docs = new TestDocuments();
  const countResponse = { count: 30 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countResponse)]),
  );

  try {
    const result = await docs.creditNotes("count", {});

    assertEquals(result.count, 30);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/creditNotes/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] pendingDocuments getAllByClient", async () => {
  const docs = new TestDocuments();
  const pendingResponse = {
    summary: {
      num_docs: 5,
      delayed: 2,
      net_value: 1500.0,
      reconciled: 500.0,
      delay: 30,
      total_delay: 150,
      total: 1500.0,
      pending: 1000.0,
      missing: 500.0,
    },
    total: 5,
    documents: documentsGetAll,
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(pendingResponse)]),
  );

  try {
    const result = await docs.pendingDocuments("getAllByClient", {
      clients: [89400286],
      start_date: "2026-01-01 00:00:00",
      end_date: "2026-01-31 23:59:59",
    });

    assertEquals(result.total, 5);
    assertEquals(result.summary.num_docs, 5);
    assertEquals(result.summary.pending, 1000.0);
    assertEquals(result.documents.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/SalesPending/getAllByClient/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] settlementNotes count", async () => {
  const docs = new TestDocuments();
  const countResponse = { count: 45 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countResponse)]),
  );

  try {
    const result = await docs.settlementNotes("count", { status: 1 });

    assertEquals(result.count, 45);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/settlementNotes/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] settlementNotes getOne", async () => {
  const docs = new TestDocuments();
  const settlementNote = {
    document_id: 12345,
    date: "2026-01-29T00:00:00+0000",
    number: 10,
    customer_id: 89407140,
    document_set_id: 884384,
    expiration_date: "2026-02-28T00:00:00+0000",
    maturity_date_id: 0,
    your_reference: "",
    our_reference: "",
    financial_discount: 0,
    gross_value: 500.0,
    comercial_discount_value: 0,
    financial_discount_value: 0,
    taxes_value: 115.0,
    deduction_value: 0,
    net_value: 615.0,
    reconciled_value: 615.0,
    status: 1,
    transport_code: 0,
    transport_code_set_by: 0,
    global_guide: 0,
    exchange_currency_id: 0,
    exchange_total_value: 0,
    exchange_rate: 0,
    document_type: {
      document_type_id: 6,
      saft_code: "NC",
    },
    associated_documents: [],
    payments: [
      {
        payment_method_id: 1753488,
        date: "2026-01-29T00:00:00+0000",
        value: 615.0,
      },
    ],
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(settlementNote)]),
  );

  try {
    const result = await docs.settlementNotes("getOne", { document_id: 12345 });

    assertEquals(result.document_id, 12345);
    assertEquals(result.net_value, 615.0);
    assertEquals(result.payments.length, 1);
    assertEquals(result.payments[0].value, 615.0);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/settlementNotes/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] documents getAllDocumentTypes", async () => {
  const docs = new TestDocuments();
  const documentTypes = [
    {
      titulo: "Fatura",
      document_type_id: 1,
      saft_code: "FT",
      category_id: "1",
    },
    {
      titulo: "Recibo",
      document_type_id: 2,
      saft_code: "RC",
      category_id: "1",
    },
    {
      titulo: "Fatura-Recibo",
      document_type_id: 27,
      saft_code: "FR",
      category_id: "1",
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(documentTypes)]),
  );

  try {
    const result = await docs.documents("getAllDocumentTypes", {
      language_id: 1,
    });

    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 3);
    assertEquals(result[0].titulo, "Fatura");
    assertEquals(result[1].saft_code, "RC");
    assertEquals(result[2].document_type_id, 27);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/documents/getAllDocumentTypes/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] documents getModifiedSince", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(documentsGetAll)]),
  );

  try {
    const result = await docs.documents("getModifiedSince", {
      lastmodified: "2026-01-01T00:00:00+0000",
      document_type_id: [14, 27],
      status: 1,
    });

    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 1);
    assertEquals(result[0].lastmodified, "2026-01-26T15:42:01+0000");
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/documents/getModifiedSince/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] documents countModifiedSince", async () => {
  const docs = new TestDocuments();
  const countResponse = { count: 25 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(countResponse)]),
  );

  try {
    const result = await docs.documents("countModifiedSince", {
      lastmodified: "2026-01-01T00:00:00+0000",
      status: 0,
    });

    assertEquals(result.count, 25);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/documents/countModifiedSince/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] documents freeSlug", async () => {
  const docs = new TestDocuments();
  const slugResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(slugResponse)]),
  );

  try {
    const result = await docs.documents("freeSlug", { slug: "test-slug-123" });

    assertEquals(result.valid, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/documents/freeSlug/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] invoiceReceipts getAll with status and offset", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(invoiceReceiptsGetAll)]),
  );

  try {
    const result = await docs.invoiceReceipts("getAll", {
      status: 1,
      offset: 50,
    });

    assertEquals(result as unknown, invoiceReceiptsGetAll);
    assertEquals(result[0].status, 1);
    assertEquals(fetchStub.calls.length, 1);

    // Verify the request body contains the parameters
    const requestInit = fetchStub.calls[0].args[1] as RequestInit;
    const body = JSON.parse(requestInit.body as string);
    assertEquals(body.status, 1);
    assertEquals(body.offset, 50);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] invoices getModifiedSince with fixture data", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(documentsGetAll)]),
  );

  try {
    const result = await docs.invoices("getModifiedSince", {
      lastmodified: "2026-01-20T00:00:00+0000",
    });

    assertEquals(Array.isArray(result), true);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/invoices/getModifiedSince/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] receipts getModifiedSince", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(invoiceReceiptsGetAll)]),
  );

  try {
    const result = await docs.receipts("getModifiedSince", {
      lastmodified: "2026-01-25T00:00:00+0000",
      status: 1,
    });

    assertEquals(Array.isArray(result), true);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/receipts/getModifiedSince/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] verifies document structure from fixture", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(documentsGetAll)]),
  );

  try {
    const result = await docs.documents("getAll");

    // Verify the structure matches expected Document interface
    const doc = result[0];
    assertEquals(typeof doc.document_id, "number");
    assertEquals(typeof doc.company_id, "number");
    assertEquals(typeof doc.document_type_id, "number");
    assertEquals(typeof doc.customer_id, "number");
    assertEquals(typeof doc.date, "string");
    assertEquals(typeof doc.net_value, "number");
    assertEquals(typeof doc.gross_value, "number");
    assertEquals(typeof doc.status, "number");
    assertEquals(typeof doc.entity_name, "string");
    assertEquals(typeof doc.entity_vat, "string");
    assertEquals(typeof doc.document_type, "object");
    assertEquals(typeof doc.document_set, "object");
    assertEquals(Array.isArray(doc.associated_documents), true);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] verifies invoiceReceipt structure from fixture", async () => {
  const docs = new TestDocuments();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(invoiceReceiptsGetAll)]),
  );

  try {
    const result = await docs.invoiceReceipts("getAll");

    // Verify the structure matches expected Document interface
    const doc = result[0];
    assertEquals(typeof doc.document_id, "number");
    assertEquals(typeof doc.company_id, "number");
    assertEquals(typeof doc.salesman_id, "number");
    assertEquals(typeof doc.number, "number");
    assertEquals(typeof doc.date, "string");
    assertEquals(typeof doc.net_value, "number");
    assertEquals(typeof doc.reconciled_value, "number");
    assertEquals(typeof doc.comercial_discount_value, "number");
    assertEquals(doc.document_type.document_type_id, 27);
    assertEquals(doc.document_type.saft_code, "FR");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] handles empty response array", async () => {
  const docs = new TestDocuments();
  const emptyResponse: unknown[] = [];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(emptyResponse)]),
  );

  try {
    const result = await docs.documents("getAll", { status: 0 });

    assertEquals(Array.isArray(result), true);
    assertEquals(result.length, 0);
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] error handling with detailed error", async () => {
  const docs = new TestDocuments();
  const errorResponse = {
    error: "invalid_request",
    error_description: "company_id is required",
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify(errorResponse), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await docs.documents("getAll"),
      Error,
      "company_id is required",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] error handling with generic status error", async () => {
  const docs = new TestDocuments();

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
      async () => await docs.invoiceReceipts("getAll"),
      Error,
      "Request failed with status 500",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/documents] multiple sequential requests maintain correct endpoints", async () => {
  const docs = new TestDocuments();
  const mockDoc = documentsGetAll;
  const mockInvoiceReceipt = invoiceReceiptsGetAll;

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(mockDoc),
      createMockFetchResponse(mockInvoiceReceipt),
      createMockFetchResponse({ count: 10 }),
    ]),
  );

  try {
    await docs.documents("getAll");
    await docs.invoiceReceipts("getAll");
    await docs.receipts("count");

    assertEquals(fetchStub.calls.length, 3);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/documents/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/invoiceReceipts/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/receipts/count/",
    );
  } finally {
    fetchStub.restore();
  }
});
