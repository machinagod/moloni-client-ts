// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Users endpoint group for the Moloni API.
 *
 * @module
 */
import { Base } from "../base.ts";
import {
  UsersEndpoint,
  UsersParams,
  UsersResponse,
} from "./types/users.types.ts";

/**
 * Access to the Moloni `/users/` endpoint group.
 *
 * Mixed into the {@linkcode Moloni} client; you normally reach these methods
 * through a `Moloni` instance rather than instantiating this class directly.
 *
 * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
 */
export class Users extends Base {
  /**
   * Calls the Moloni `/users/{request}/` endpoint, returning the users
   * associated with the authenticated account and company.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  users<T extends UsersEndpoint>(
    request: T,
    params?: UsersParams<T>,
  ): Promise<UsersResponse<T>> {
    return this.request(`/users/${request}/`, params);
  }
}
