// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type TaxRequest = {
  getAll: {
    params: {
      company_id?: number;
    };
    response: Tax[];
  };

  insert: {
    params: {
      company_id?: number;
    } & Partial<Tax>;
    response: {
      valid: number;
      tax_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      tax_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface Tax {
  tax_id: number;
  name: string;
  value: number;
  type: number;
  saft_type: number;
  vat_type: string;
  stamp_tax: string;
  exemption_reason: string;
  fiscal_zone: string;
  active_by_default: number;
}

export type TaxEndpoint = keyof TaxRequest;
export type TaxParams<T extends TaxEndpoint> = TaxRequest[T]["params"];
export type TaxResponse<T extends TaxEndpoint> = TaxRequest[T]["response"];
