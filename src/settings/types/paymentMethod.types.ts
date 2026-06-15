// Copyright 2026 Higitotal, LDA. MIT License.
type PaymentMethodRequest = {
  count: {
    params: {
      company_id?: number;
      status?: number;
    };
    response: {
      count: number;
    };
  };
  getAll: {
    params: {
      company_id?: number;
      status?: number;
      offset?: number;
    };
    response: PaymentMethod[];
  };
  getOne: {
    params: {
      company_id: number;
      payment_method_id: number;
    };
    response: PaymentMethod;
  };
  insert: {
    params: PaymentMethod;
    response: {
      valid: number;
      payment_method_id: number;
    };
  };

  delete: {
    params: {
      company_id: number;
      payment_method_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface PaymentMethod {
  payment_method_id?: number;
  name: string;
  is_credit: number;
  is_mb: number;
  is_numerary: number;
  is_tpa: number;
}

export type PaymentMethodEndpoint = keyof PaymentMethodRequest;
export type PaymentMethodParams<T extends PaymentMethodEndpoint> =
  PaymentMethodRequest[T]["params"];
export type PaymentMethodResponse<T extends PaymentMethodEndpoint> =
  PaymentMethodRequest[T]["response"];
