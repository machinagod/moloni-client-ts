// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type MaturityDateRequest = {
  getAll: {
    params: {
      company_id?: number;
      status?: number;
      offset?: number;
    };
    response: MaturityDate[];
  };

  insert: {
    params: Partial<MaturityDate>;
    response: {
      valid: number;
      maturity_date_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      maturity_date_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface MaturityDate {
  maturity_date_id: number;
  name: string;
  days: number;
  associated_discount: number;
}

export type MaturityDateEndpoint = keyof MaturityDateRequest;
export type MaturityDateParams<T extends MaturityDateEndpoint> =
  MaturityDateRequest[T]["params"];
export type MaturityDateResponse<T extends MaturityDateEndpoint> =
  MaturityDateRequest[T]["response"];
