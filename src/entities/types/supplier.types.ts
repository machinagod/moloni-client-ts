// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type SupplierRequest = {
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
    params: Partial<Supplier>;
    response: {
      valid: number;
      supplier_id: number;
    };
  };
  getAll: {
    params: {
      status?: number;
      offset?: number;
    };
    response: Supplier[];
  };
  getOne: {
    params: {
      company_id?: number;
      supplier_id: number;
    };
    response: Supplier;
  };
  getByNumber: {
    params: {
      company_id?: number;
      number: string;

      exact?: number;
      qty?: number;
      offset?: number;
    };
    response: Supplier[];
  };
  update: {
    params: Supplier;
    response: {
      valid: number;
      supplier_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      supplier_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface Supplier {
  supplier_id: number;
  number: string;
  name: string;
  vat: string;
  address: string;
  city: string;
  zip_code: string;
  country_id: number;
  email: string;
  website: string;
  phone: string;
  fax: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  notes: string;
  discount: number;
  credit_limit: number;
  qty_copies_document: number;
  maturity_date_id: number;
  field_notes: string;
  language_id: number;
  payment_method_id: number;
  delivery_method_id: number;
}

export type SupplierEndpoint = keyof SupplierRequest;
export type SupplierParams<T extends SupplierEndpoint> =
  SupplierRequest[T]["params"];
export type SupplierResponse<T extends SupplierEndpoint> =
  SupplierRequest[T]["response"];
