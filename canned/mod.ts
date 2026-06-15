// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Canned Moloni API responses for testing.
 *
 * Fixtures are imported statically (JSON modules) rather than read from
 * disk, so the test suite stays hermetic — no `--allow-read`, no runtime
 * filesystem access. Each fixture lives at `./v1/{endpoint}/{method}/
 * response.json` and is registered in {@link CANNED} keyed by `endpoint/method`.
 */

import billsOfLading_getAll from "./v1/billsOfLading/getAll/response.json" with {
  type: "json",
};
import companies_getAll from "./v1/companies/getAll/response.json" with {
  type: "json",
};
import countries_getAll from "./v1/countries/getAll/response.json" with {
  type: "json",
};
import creditNotes_getAll from "./v1/creditNotes/getAll/response.json" with {
  type: "json",
};
import currencies_getAll from "./v1/currencies/getAll/response.json" with {
  type: "json",
};
import customers_getAll from "./v1/customers/getAll/response.json" with {
  type: "json",
};
import documentSets_getAll from "./v1/documentSets/getAll/response.json" with {
  type: "json",
};
import documents_count from "./v1/documents/count/response.json" with {
  type: "json",
};
import documents_getAll from "./v1/documents/getAll/response.json" with {
  type: "json",
};
import fiscalZones_getAll from "./v1/fiscalZones/getAll/response.json" with {
  type: "json",
};
import geographicZones_getAll from "./v1/geographicZones/getAll/response.json" with {
  type: "json",
};
import invoiceReceipts_getAll from "./v1/invoiceReceipts/getAll/response.json" with {
  type: "json",
};
import invoices_getAll from "./v1/invoices/getAll/response.json" with {
  type: "json",
};
import languages_getAll from "./v1/languages/getAll/response.json" with {
  type: "json",
};
import measurementUnits_getAll from "./v1/measurementUnits/getAll/response.json" with {
  type: "json",
};
import paymentMethods_getAll from "./v1/paymentMethods/getAll/response.json" with {
  type: "json",
};
import productCategories_getAll from "./v1/productCategories/getAll/response.json" with {
  type: "json",
};
import products_getAll from "./v1/products/getAll/response.json" with {
  type: "json",
};
import purchaseOrder_getAll from "./v1/purchaseOrder/getAll/response.json" with {
  type: "json",
};
import receipts_getAll from "./v1/receipts/getAll/response.json" with {
  type: "json",
};
import salesmen_getAll from "./v1/salesmen/getAll/response.json" with {
  type: "json",
};
import subscription_getOne from "./v1/subscription/getOne/response.json" with {
  type: "json",
};
import supplierInvoices_getAll from "./v1/supplierInvoices/getAll/response.json" with {
  type: "json",
};
import supplierPurchaseOrder_getAll from "./v1/supplierPurchaseOrder/getAll/response.json" with {
  type: "json",
};
import taxes_getAll from "./v1/taxes/getAll/response.json" with {
  type: "json",
};
import users_getAll from "./v1/users/getAll/response.json" with {
  type: "json",
};
import warehouses_getAll from "./v1/warehouses/getAll/response.json" with {
  type: "json",
};

/** All canned responses, keyed by `"{endpoint}/{method}"`. */
const CANNED: Record<string, unknown> = {
  "billsOfLading/getAll": billsOfLading_getAll,
  "companies/getAll": companies_getAll,
  "countries/getAll": countries_getAll,
  "creditNotes/getAll": creditNotes_getAll,
  "currencies/getAll": currencies_getAll,
  "customers/getAll": customers_getAll,
  "documentSets/getAll": documentSets_getAll,
  "documents/count": documents_count,
  "documents/getAll": documents_getAll,
  "fiscalZones/getAll": fiscalZones_getAll,
  "geographicZones/getAll": geographicZones_getAll,
  "invoiceReceipts/getAll": invoiceReceipts_getAll,
  "invoices/getAll": invoices_getAll,
  "languages/getAll": languages_getAll,
  "measurementUnits/getAll": measurementUnits_getAll,
  "paymentMethods/getAll": paymentMethods_getAll,
  "productCategories/getAll": productCategories_getAll,
  "products/getAll": products_getAll,
  "purchaseOrder/getAll": purchaseOrder_getAll,
  "receipts/getAll": receipts_getAll,
  "salesmen/getAll": salesmen_getAll,
  "subscription/getOne": subscription_getOne,
  "supplierInvoices/getAll": supplierInvoices_getAll,
  "supplierPurchaseOrder/getAll": supplierPurchaseOrder_getAll,
  "taxes/getAll": taxes_getAll,
  "users/getAll": users_getAll,
  "warehouses/getAll": warehouses_getAll,
};

/**
 * Load a canned response for a given endpoint and method.
 * @param endpoint The API endpoint (e.g., "companies", "users")
 * @param method The API method (e.g., "getAll", "getOne")
 * @returns The parsed JSON response
 */
export function loadCannedResponse<T>(
  endpoint: string,
  method: string,
): Promise<T> {
  const data = CANNED[`${endpoint}/${method}`];
  if (data === undefined) {
    throw new Error(`No canned response for ${endpoint}/${method}`);
  }
  return Promise.resolve(data as T);
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
