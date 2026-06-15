// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Entities endpoint group for the Moloni API — customers, suppliers, salesmen,
 * and customer alternate addresses.
 *
 * @module
 */
import { Base } from "../base.ts";
import {
  AlternateAddressEndpoint,
  AlternateAddressParams,
  AlternateAddressResponse,
} from "./types/alternateAddresses.types.ts";
import {
  CustomerEndpoint,
  CustomerParams,
  CustomerResponse,
} from "./types/customer.types.ts";
import {
  SupplierEndpoint,
  SupplierParams,
  SupplierResponse,
} from "./types/supplier.types.ts";
import {
  SalesmenEndpoint,
  SalesmenParams,
  SalesmenResponse,
} from "./types/salesmen.types.ts";

/**
 * Access to the Moloni entity endpoint groups — the business relationships
 * (customers, suppliers, salesmen) attached to documents.
 *
 * Mixed into the {@linkcode Moloni} client; you normally reach these methods
 * through a `Moloni` instance rather than instantiating this class directly.
 *
 * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
 */
export class Entities extends Base {
  /**
   * Calls the Moloni `/customers/{request}/` endpoint to manage customers —
   * listing, searching (by name, number, VAT, or e-mail), reading, counting,
   * and creating, updating, or deleting them.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  customers<T extends CustomerEndpoint>(
    request: T,
    params?: CustomerParams<T>,
  ): Promise<CustomerResponse<T>> {
    return this.request(`/customers/${request}/`, params);
  }

  /**
   * Calls the Moloni `/customerAlternateAddresses/{request}/` endpoint to
   * manage the secondary shipping/billing addresses of a customer.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  customerAlternateAddresses<T extends AlternateAddressEndpoint>(
    request: T,
    params?: AlternateAddressParams<T>,
  ): Promise<AlternateAddressResponse<T>> {
    return this.request(`/customerAlternateAddresses/${request}/`, params);
  }

  /**
   * Calls the Moloni `/suppliers/{request}/` endpoint to manage suppliers —
   * listing, searching, reading, counting, and creating, updating, or
   * deleting them.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  suppliers<T extends SupplierEndpoint>(
    request: T,
    params?: SupplierParams<T>,
  ): Promise<SupplierResponse<T>> {
    return this.request(`/suppliers/${request}/`, params);
  }

  /**
   * Calls the Moloni `/salesmen/{request}/` endpoint to manage salesmen who can
   * be associated with documents for commission tracking.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  salesmen<T extends SalesmenEndpoint>(
    request: T,
    params?: SalesmenParams<T>,
  ): Promise<SalesmenResponse<T>> {
    return this.request(`/salesmen/${request}/`, params);
  }
}
