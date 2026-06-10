// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type AlternateAddressRequest = {
  insert: {
    params: {
      company_id?: number;
    } & AlternateAddress;
    response: {
      valid: number;
      address_id: number;
    };
  };

  update: {
    params: {
      company_id?: number;
      address_id: number;
    } & AlternateAddress;
    response: {
      valid: number;
      address_id: number;
    };
  };

  getAll: {
    params: {
      company_id?: number;
      customer_id: number;
    };
    response: AlternateAddress[];
  };

  delete: {
    params: {
      company_id?: number;
      customer_id: number;
      address_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface AlternateAddress {
  address_id: number;
  customer_id: number;
  designation: string;
  code: string;
  address: string;
  city: string;
  zip_code: string;
  country_id: number;
  email: string;
  phone: string;
  contact_name: string;
}

export type AlternateAddressEndpoint = keyof AlternateAddressRequest;
export type AlternateAddressParams<T extends AlternateAddressEndpoint> =
  AlternateAddressRequest[T]["params"];
export type AlternateAddressResponse<T extends AlternateAddressEndpoint> =
  AlternateAddressRequest[T]["response"];
