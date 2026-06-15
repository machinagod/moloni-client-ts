// Copyright 2026 Higitotal, LDA. MIT License.
import { Base } from "../base.ts";
import {
  UsersEndpoint,
  UsersParams,
  UsersResponse,
} from "./types/users.types.ts";

export class Users extends Base {
  users<T extends UsersEndpoint>(
    request: T,
    params?: UsersParams<T>,
  ): Promise<UsersResponse<T>> {
    return this.request(`/users/${request}/`, params);
  }
}
