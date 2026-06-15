// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Company endpoint group for the Moloni API — company data and subscription
 * details.
 *
 * @module
 */
import {
  SubscriptionEndpoint,
  SubscriptionParams,
  SubscriptionResponse,
} from "./types/subscription.types.ts";
import { Base } from "../base.ts";
import {
  CompanyEndpoint,
  CompanyParams,
  CompanyResponse,
} from "./types/company.types.ts";

/**
 * Access to the Moloni company endpoint groups.
 *
 * Mixed into the {@linkcode Moloni} client; you normally reach these methods
 * through a `Moloni` instance rather than instantiating this class directly.
 *
 * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
 */
export class Company extends Base {
  /**
   * Calls the Moloni `/companies/{request}/` endpoint to read the companies the
   * authenticated user has access to and the details of a single company.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  companies<T extends CompanyEndpoint>(
    request: T,
    params?: CompanyParams<T>,
  ): Promise<CompanyResponse<T>> {
    return this.request(`/companies/${request}/`, params);
  }

  /**
   * Calls the Moloni `/subscription/{request}/` endpoint to read the company's
   * Moloni subscription/plan information.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getOne"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  subscription<T extends SubscriptionEndpoint>(
    request: T,
    params?: SubscriptionParams<T>,
  ): Promise<SubscriptionResponse<T>> {
    return this.request(`/subscription/${request}/`, params);
  }
}
