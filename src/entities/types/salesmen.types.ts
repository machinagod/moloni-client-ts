// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type SalesmenRequest = {
  freeSlug: {
    params: {
      slug: string;
    };
    response: {
      valid: number;
    };
  };
  count: {
    params: {
      status?: number;
    };
    response: {
      count: number;
    };
  };
  insert: {
    params: SalesmenInsert;
    response: {
      valid: number;
      customer_id: number;
    };
  };
  getAll: {
    params: {
      status?: number;
      offset?: number;
    };
    response: Salesmen[];
  };
  getOne: {
    params: {
      company_id: number;
      salesmen_id: number;
    };
    response: Salesmen;
  };
  getByNumber: {
    params: {
      company_id: number;
      number: string;

      exact?: number;
      qty?: number;
      offset?: number;
    };
    response: Salesmen[];
  };

  delete: {
    params: {
      company_id: number;
      document_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface SalesmenInsert {
  vat: string;
  number: string;
  name: string;
  base_commission: number;
  language_id: number;
  qty_copies_document: number;
  notes?: string;
  address: string;
  zip_code?: string;
  city: string;
  country_id: number;
  email?: string;
  website?: string;
  phone?: string;
  fax?: string;
}

export interface Salesmen extends SalesmenInsert {
  salesman_id: number;
}

export type SalesmenEndpoint = keyof SalesmenRequest;
export type SalesmenParams<T extends SalesmenEndpoint> =
  SalesmenRequest[T]["params"];
export type SalesmenResponse<T extends SalesmenEndpoint> =
  SalesmenRequest[T]["response"];
