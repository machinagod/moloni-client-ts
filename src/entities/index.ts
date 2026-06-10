// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
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

export class Entities extends Base {
  customers<T extends CustomerEndpoint>(
    request: T,
    params?: CustomerParams<T>,
  ): Promise<CustomerResponse<T>> {
    return this.request(`/customers/${request}/`, params);
  }

  customerAlternateAddresses<T extends AlternateAddressEndpoint>(
    request: T,
    params?: AlternateAddressParams<T>,
  ): Promise<AlternateAddressResponse<T>> {
    return this.request(`/customerAlternateAddresses/${request}/`, params);
  }

  suppliers<T extends SupplierEndpoint>(
    request: T,
    params?: SupplierParams<T>,
  ): Promise<SupplierResponse<T>> {
    return this.request(`/suppliers/${request}/`, params);
  }

  salesmen<T extends SalesmenEndpoint>(
    request: T,
    params?: SalesmenParams<T>,
  ): Promise<SalesmenResponse<T>> {
    return this.request(`/salesmen/${request}/`, params);
  }
}
