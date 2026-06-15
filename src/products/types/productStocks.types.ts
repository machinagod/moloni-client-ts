// Copyright 2026 Higitotal, LDA. MIT License.

type ProductStocksRequest = {
  getAll: {
    // company_id is injected by the client from setCompanyId(), so it is
    // optional at the call site (mirrors products.getModifiedSince).
    params: {
      company_id?: number;
      product_id?: number;
      movement_date?: string;
      warehouse_id?: number;
      qty?: number;
      offset?: number;
    };
    response: ProductStock[];
  };
  insert: {
    params: ProductStocksInsertParams;
    response: {
      valid: number;
      product_stock_id: number;
    };
  };
  update: {
    params: {
      company_id: number;
      product_stock_id: number;
    } & Partial<ProductStocksInsertParams>;
    response: {
      valid: number;
      product_stock_id: number;
    };
  };
  delete: {
    params: {
      company_id: number;
      product_stock_id: number;
    };
    response: {
      valid: number;
    };
  };
  moveToWarehouse: {
    params: {
      company_id: number;
      product_id: number;
      movement_date: string;
      qty: number;
      from_warehouse_id: number;
      to_warehouse_id: number;
      notes?: string;
    };
    response: {
      valid: number;
    };
  };
};

type ProductStock = {
  product_stock_id: number;
  product_id: number;
  warehouse_id: number;
  movement_date: string;
  document_id: number;
  qty: number;
  unit_price: number;
  accumulated: number;
  notes: string;
  product: {
    product_id: number;
    name: string;
    reference: string;
  };
  document: {
    document_id: number;
    document_type_id: number;
    document_set_id: number;
    document_set_name: string;
    number: number;
    date: string;
    document_type: {
      document_type: number;
      saft_code: string;
    };
  }[];
};

type ProductStocksInsertParams = {
  company_id?: number;
  product_id: number;
  movement_date: string;
  unit_price: number;
  qty: number;
  warehouse_id?: number;
  notes?: string;
};

export type ProductStocksEndpoint = keyof ProductStocksRequest;
export type ProductStocksParams<T extends ProductStocksEndpoint> =
  ProductStocksRequest[T]["params"];
export type ProductStocksResponse<T extends ProductStocksEndpoint> =
  ProductStocksRequest[T]["response"];
