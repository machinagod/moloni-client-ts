// Copyright 2026 Higitotal, LDA. MIT License.
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

export class Company extends Base {
  companies<T extends CompanyEndpoint>(
    request: T,
    params?: CompanyParams<T>,
  ): Promise<CompanyResponse<T>> {
    return this.request(`/companies/${request}/`, params);
  }

  subscription<T extends SubscriptionEndpoint>(
    request: T,
    params?: SubscriptionParams<T>,
  ): Promise<SubscriptionResponse<T>> {
    return this.request(`/subscription/${request}/`, params);
  }
}
