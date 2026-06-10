// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type PriceClassesRequest = {
  getAll: {
    params: {
      company_id: number;
    };
    response: PriceClass[];
  };
  insert: {
    params: Partial<PriceClass>;
    response: {
      valid: number;
      price_class_id: number;
    };
  };
  update: {
    params: {
      company_id: number;
      price_class_id: number;
    } & Partial<PriceClass>;
    response: {
      valid: number;
      product_stock_id: number;
    };
  };
  delete: {
    params: {
      company_id: number;
      price_class_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export type PriceClass = {
  price_class_id: number;
  title: string;
};

export type PriceClassesEndpoint = keyof PriceClassesRequest;
export type PriceClassesParams<T extends PriceClassesEndpoint> =
  PriceClassesRequest[T]["params"];
export type PriceClassesResponse<T extends PriceClassesEndpoint> =
  PriceClassesRequest[T]["response"];
