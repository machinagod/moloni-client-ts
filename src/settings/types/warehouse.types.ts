// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type WarehouseRequest = {
  getAll: {
    params: {
      company_id?: number;
      status?: number;
      offset?: number;
    };
    response: Warehouse[];
  };

  insert: {
    params: Partial<Warehouse>;
    response: {
      valid: number;
      warehouse_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      warehouse_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface Warehouse {
  warehouse_id: number;
  title: string;
  is_default: number;
  code: string;
  address: string;
  city: string;
  zip_code: string;
  country_id: number;
  phone?: string;
  contact_name?: string;
  contact_email?: string;
}

export type WarehouseEndpoint = keyof WarehouseRequest;
export type WarehouseParams<T extends WarehouseEndpoint> =
  WarehouseRequest[T]["params"];
export type WarehouseResponse<T extends WarehouseEndpoint> =
  WarehouseRequest[T]["response"];
