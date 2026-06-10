// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { returnsNext, stub } from "std/testing/mock.ts";
import { Products } from "./index.ts";
import { loadCannedResponse } from "../../canned/mod.ts";

// Load canned responses at top level
const productsGetAll = await loadCannedResponse<unknown[]>(
  "products",
  "getAll",
);
const productCategoriesGetAll = await loadCannedResponse<unknown[]>(
  "productCategories",
  "getAll",
);

// Create a concrete test class extending Products for testing
class TestProducts extends Products {
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

// =============================================================================
// Products method tests
// =============================================================================

Deno.test("[moloni-client/products] products getAll method returns fixture data", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productsGetAll)]),
  );

  try {
    const result = await products.products("getAll", {
      category_id: 7584835,
    });

    assertEquals(result as unknown, productsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products getOne method", async () => {
  const products = new TestProducts();
  const mockProduct = productsGetAll[0];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockProduct)]),
  );

  try {
    const result = await products.products("getOne", {
      product_id: 159975925,
    });

    assertEquals(result as unknown, mockProduct);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/getOne/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products count method", async () => {
  const products = new TestProducts();
  const mockResponse = { count: 150 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("count", {
      company_id: 240211,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/count/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products getBySearch method", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productsGetAll)]),
  );

  try {
    const result = await products.products("getBySearch", {
      company_id: 240211,
      search: "Tigela",
      qty: 10,
      offset: 0,
    });

    assertEquals(result as unknown, productsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/getBySearch/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products countBySearch method", async () => {
  const products = new TestProducts();
  const mockResponse = { count: 5 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("countBySearch", {
      company_id: 240211,
      search: "Tigela",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/countBySearch/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products getByName method", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productsGetAll)]),
  );

  try {
    const result = await products.products("getByName", {
      company_id: 240211,
      name: "Tigela de Policarbonato 450cc",
    });

    assertEquals(result as unknown, productsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/getByName/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products countByName method", async () => {
  const products = new TestProducts();
  const mockResponse = { count: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("countByName", {
      company_id: 240211,
      name: "Tigela",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/countByName/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products getByReference method", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productsGetAll)]),
  );

  try {
    const result = await products.products("getByReference", {
      reference: "00110",
      exact: 1,
    });

    assertEquals(result as unknown, productsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/getByReference/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products countByReference method", async () => {
  const products = new TestProducts();
  const mockResponse = { count: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("countByReference", {
      company_id: 240211,
      reference: "00110",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/products/countByReference/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products getByEAN method", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productsGetAll)]),
  );

  try {
    const result = await products.products("getByEAN", {
      ean: "1234567890123",
    });

    assertEquals(result as unknown, productsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/getByEAN/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products countByEAN method", async () => {
  const products = new TestProducts();
  const mockResponse = { count: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("countByEAN", {
      company_id: 240211,
      ean: "1234567890123",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/countByEAN/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products getModifiedSince method", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productsGetAll)]),
  );

  try {
    const result = await products.products("getModifiedSince", {
      lastmodified: "2023-11-16 00:00:00",
    });

    assertEquals(result as unknown, productsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/products/getModifiedSince/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products countModifiedSince method", async () => {
  const products = new TestProducts();
  const mockResponse = { count: 50 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("countModifiedSince", {
      lastmodified: "2023-11-16 00:00:00",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/products/countModifiedSince/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products getLastCostPrice method", async () => {
  const products = new TestProducts();
  const mockResponse = {
    cost_price: 2.58,
    product: [{ name: "Test Product", reference: "00110", price: 2.58 }],
    supplier: [
      {
        name: "Test Supplier",
        vat: 123456789,
        address: "Test",
        city: "Test",
        phone: "123",
      },
    ],
  };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("getLastCostPrice", {
      company_id: 240211,
      product_id: 159975925,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/products/getLastCostPrice/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products insert method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, product_id: 123456789 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("insert", {
      company_id: 240211,
      category_id: 7584835,
      type: 1,
      name: "New Product",
      reference: "NEW001",
      price: 10.00,
      unit_id: 2156443,
      has_stock: 1,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products update method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, product_id: 159975925 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("update", {
      company_id: 240211,
      product_id: 159975925,
      category_id: 7584835,
      type: 1,
      name: "Updated Product",
      reference: "00110",
      price: 12.00,
      unit_id: 2156443,
      has_stock: 1,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/update/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] products delete method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.products("delete", {
      product_id: 159975925,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/delete/");
  } finally {
    fetchStub.restore();
  }
});

// =============================================================================
// ProductCategories method tests
// =============================================================================

Deno.test("[moloni-client/products] productCategories getAll method returns fixture data", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productCategoriesGetAll)]),
  );

  try {
    const result = await products.productCategories("getAll", {
      parent_id: 0,
    });

    assertEquals(result, productCategoriesGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productCategories/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productCategories insert method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, category_id: 7584836 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productCategories("insert", {
      parent_id: 0,
      name: "New Category",
      description: "Test category description",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productCategories/insert/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productCategories update method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, category_id: 7584835 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productCategories("update", {
      category_id: 7584835,
      name: "Updated Category Name",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productCategories/update/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productCategories delete method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productCategories("delete", {
      company_id: 240211,
      category_id: 7584835,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productCategories/delete/",
    );
  } finally {
    fetchStub.restore();
  }
});

// =============================================================================
// ProductStocks method tests
// =============================================================================

Deno.test("[moloni-client/products] productStocks getAll method", async () => {
  const products = new TestProducts();
  const mockStockResponse = [
    {
      product_stock_id: 12345,
      product_id: 159975925,
      warehouse_id: 334988,
      movement_date: "2024-01-15 10:30:00",
      document_id: 0,
      qty: 100,
      unit_price: 2.58,
      accumulated: 100,
      notes: "Initial stock",
      product: {
        product_id: 159975925,
        name: "Tigela de Policarbonato 450cc",
        reference: "00110",
      },
      document: [],
    },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockStockResponse)]),
  );

  try {
    const result = await products.productStocks("getAll", {
      company_id: 240211,
      product_id: 159975925,
    });

    assertEquals(result, mockStockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/productStocks/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productStocks insert method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, product_stock_id: 12346 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productStocks("insert", {
      product_id: 159975925,
      movement_date: "2024-01-20 14:00:00",
      unit_price: 2.58,
      qty: 50,
      warehouse_id: 334988,
      notes: "Stock replenishment",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/productStocks/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productStocks update method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, product_stock_id: 12345 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productStocks("update", {
      company_id: 240211,
      product_stock_id: 12345,
      qty: 75,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/productStocks/update/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productStocks delete method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productStocks("delete", {
      company_id: 240211,
      product_stock_id: 12345,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/productStocks/delete/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productStocks moveToWarehouse method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productStocks("moveToWarehouse", {
      company_id: 240211,
      product_id: 159975925,
      movement_date: "2024-01-25 09:00:00",
      qty: 25,
      from_warehouse_id: 334988,
      to_warehouse_id: 334989,
      notes: "Transfer between warehouses",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(
      getEndpointFromUrl(calledUrl),
      "/v1/productStocks/moveToWarehouse/",
    );
  } finally {
    fetchStub.restore();
  }
});

// =============================================================================
// PriceClasses method tests
// =============================================================================

Deno.test("[moloni-client/products] priceClasses getAll method", async () => {
  const products = new TestProducts();
  const mockPriceClasses = [
    { price_class_id: 132790, title: "PVP1" },
    { price_class_id: 133221, title: "PVP1 2023" },
    { price_class_id: 133275, title: "PVP1 Primavera 2023" },
  ];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockPriceClasses)]),
  );

  try {
    const result = await products.priceClasses("getAll", {
      company_id: 240211,
    });

    assertEquals(result, mockPriceClasses);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/PriceClasses/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] priceClasses insert method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, price_class_id: 133276 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.priceClasses("insert", {
      title: "PVP2 2024",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/PriceClasses/insert/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] priceClasses update method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1, product_stock_id: 132790 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.priceClasses("update", {
      company_id: 240211,
      price_class_id: 132790,
      title: "PVP1 Updated",
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/PriceClasses/update/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] priceClasses delete method", async () => {
  const products = new TestProducts();
  const mockResponse = { valid: 1 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.priceClasses("delete", {
      company_id: 240211,
      price_class_id: 133275,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/PriceClasses/delete/");
  } finally {
    fetchStub.restore();
  }
});

// =============================================================================
// Error handling tests
// =============================================================================

Deno.test("[moloni-client/products] products method handles API errors", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify({ message: "Product not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () => await products.products("getOne", { product_id: 999999 }),
      Error,
      "Product not found",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productCategories method handles API errors", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({ error_description: "Invalid category" }),
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
      async () => await products.productCategories("getAll", { parent_id: -1 }),
      Error,
      "Invalid category",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productStocks method handles API errors", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(JSON.stringify({ message: "Stock not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    ]),
  );

  try {
    await assertRejects(
      async () =>
        await products.productStocks("delete", {
          company_id: 240211,
          product_stock_id: 999999,
        }),
      Error,
      "Stock not found",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] priceClasses method handles API errors", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      Promise.resolve(
        new Response(
          JSON.stringify({ error_description: "Price class not found" }),
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
      async () =>
        await products.priceClasses("delete", {
          company_id: 240211,
          price_class_id: 999999,
        }),
      Error,
      "Price class not found",
    );
  } finally {
    fetchStub.restore();
  }
});

// =============================================================================
// Methods without parameters tests
// =============================================================================

Deno.test("[moloni-client/products] products method without optional parameters", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(productsGetAll)]),
  );

  try {
    const result = await products.products("getAll");

    assertEquals(result as unknown, productsGetAll);
    assertEquals(fetchStub.calls.length, 1);
    const calledUrl = fetchStub.calls[0].args[0] as string;
    assertEquals(getEndpointFromUrl(calledUrl), "/v1/products/getAll/");
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] productStocks getAll with all params", async () => {
  const products = new TestProducts();
  const mockResponse: unknown[] = [];

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([createMockFetchResponse(mockResponse)]),
  );

  try {
    const result = await products.productStocks("getAll", {
      company_id: 240211,
      product_id: 159975925,
      movement_date: "2024-01-01",
      warehouse_id: 334988,
      qty: 10,
      offset: 0,
    });

    assertEquals(result, mockResponse);
    assertEquals(fetchStub.calls.length, 1);
  } finally {
    fetchStub.restore();
  }
});

// =============================================================================
// Multiple method calls in sequence tests
// =============================================================================

Deno.test("[moloni-client/products] multiple products methods in sequence", async () => {
  const products = new TestProducts();
  const countResponse = { count: 100 };

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(countResponse),
      createMockFetchResponse(productsGetAll),
      createMockFetchResponse(productsGetAll[0]),
    ]),
  );

  try {
    // First call: count
    const count = await products.products("count", { company_id: 240211 });
    assertEquals(count, countResponse);

    // Second call: getAll
    const allProducts = await products.products("getAll", { qty: 10 });
    assertEquals(allProducts as unknown, productsGetAll);

    // Third call: getOne
    const singleProduct = await products.products("getOne", {
      product_id: 159975925,
    });
    assertEquals(singleProduct as unknown, productsGetAll[0]);

    assertEquals(fetchStub.calls.length, 3);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/products/count/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/products/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/products/getOne/",
    );
  } finally {
    fetchStub.restore();
  }
});

Deno.test("[moloni-client/products] all product management methods in sequence", async () => {
  const products = new TestProducts();

  const fetchStub = stub(
    globalThis,
    "fetch",
    returnsNext([
      createMockFetchResponse(productsGetAll),
      createMockFetchResponse(productCategoriesGetAll),
      createMockFetchResponse([]),
      createMockFetchResponse([{ price_class_id: 1, title: "PVP1" }]),
    ]),
  );

  try {
    await products.products("getAll");
    await products.productCategories("getAll", { parent_id: 0 });
    await products.productStocks("getAll", { company_id: 240211 });
    await products.priceClasses("getAll", { company_id: 240211 });

    assertEquals(fetchStub.calls.length, 4);
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[0].args[0] as string),
      "/v1/products/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[1].args[0] as string),
      "/v1/productCategories/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[2].args[0] as string),
      "/v1/productStocks/getAll/",
    );
    assertEquals(
      getEndpointFromUrl(fetchStub.calls[3].args[0] as string),
      "/v1/PriceClasses/getAll/",
    );
  } finally {
    fetchStub.restore();
  }
});
