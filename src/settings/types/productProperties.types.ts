// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type ProductPropertiesRequest = {
  getAll: {
    params: {
      company_id?: number;
    };
    response: ProductProperties[];
  };

  insert: {
    params: {
      company_id?: number;
    } & ProductProperties;
    response: {
      valid: number;
      property_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      property_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface ProductProperties {
  property_id?: number;
  title: string;
  default: number;
}

export type ProductPropertiesEndpoint = keyof ProductPropertiesRequest;
export type ProductPropertiesParams<T extends ProductPropertiesEndpoint> =
  ProductPropertiesRequest[T]["params"];
export type ProductPropertiesResponse<T extends ProductPropertiesEndpoint> =
  ProductPropertiesRequest[T]["response"];
