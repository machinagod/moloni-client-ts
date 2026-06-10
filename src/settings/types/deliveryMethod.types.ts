// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type DeliveryMethodRequest = {
  getAll: {
    params: {
      company_id?: number;
    };
    response: DeliveryMethod[];
  };
};

export interface DeliveryMethod {
  delivery_method_id: number;
  name: string;
  description: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type DeliveryMethodEndpoint = keyof DeliveryMethodRequest;
export type DeliveryMethodParams<T extends DeliveryMethodEndpoint> =
  DeliveryMethodRequest[T]["params"];
export type DeliveryMethodResponse<T extends DeliveryMethodEndpoint> =
  DeliveryMethodRequest[T]["response"];
