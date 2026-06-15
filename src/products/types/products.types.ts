// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Goods: 'M';
 * RawMaterials = 'P';
 * Finished = 'A';
 * Waste = 'S';
 * InProgress = 'T'
 */
type AtProductCategory = "M" | "P" | "A" | "S" | "T";

export type Product = {
  product_id: number;
  document_product_id: number;
  category_id: number;
  type: number;
  name: string;
  summary: string;
  reference: string;
  ean: string;
  price: number;
  unit_id: number;
  has_stock: 0 | 1;
  stock: number;
  image: string;
  exemption_reason: string;
  at_product_category?: AtProductCategory;
  composition_type: number;
  warehouse_id: number;
  pos_favorite: number;
  minimum_stock: number;
  notes: string;
  company_id: number;
  visibility_id: number;
  created: string;

  category: Category;
  measurement_unit: MeasurementUnit;
  suppliers: Supplier[];
  taxes: {
    product_id: number;
    tax_id: number;
    value: number;
    order: number;
    cumulative: number;
    tax: Tax;
  }[];
  properties: {
    property_id: number;
    value: string;
    property: Property;
  }[];
  price_classes: PriceClass[];
  warehouses: Warehouse[];
};

type Category = {
  category_id: number;
  parent_id: number;
  name: string;
  description: string;
  image: string;
};

type MeasurementUnit = {
  unit_id: number;
  name: string;
  short_name: string;
};

type Supplier = {
  product_id: number;
  supplier_id: number;
  cost_price: number;
  comercial_discount: number;
  financial_discount: number;
  cost_price_discounted: number;
  reference: string;
};

type Tax = {
  tax_id: number;
  type: number;
  saft_type: number;
  vat_type: string;
  stamp_tax: string;
  name: string;
  value: number;
  fiscal_zone: string;
  active_by_default: number;
  exemption_reason: string;
};

type Property = {
  property_id: number;
  title: string;
};

type PriceClass = {
  product_price_class_id: number;
  price_class_id: number;
  value: number;
  price_class: {
    price_class_id: number;
    title: string;
    lastmodifiedby: string;
    lastmodified: string;
  };
};

type Warehouse = {
  product_id: number;
  warehouse_id: number;
  stock: number;
  minimum_stock: number;
};

type ProductsRequest = {
  count: {
    params: {
      company_id: number;
      category_id?: number;
    };
    response: {
      count: number;
    };
  };
  getAll: {
    params: {
      company_id?: number;
      category_id?: number;
      qty?: number;
      offset?: number;
      with_invisible?: number;
    };
    response: Product[];
  };
  getOne: {
    params: {
      company_id?: number;
      product_id: number;
      with_invisible?: number;
    };
    response: Product;
  };
  countBySearch: {
    params: {
      company_id: number;
      search: string;
    };
    response: {
      count: number;
    };
  };
  getBySearch: {
    params: {
      company_id: number;
      search: string;
      qty?: number;
      offset?: number;
    };
    response: Product[];
  };
  countByName: {
    params: {
      company_id: number;
      name: string;
    };
    response: {
      count: number;
    };
  };
  getByName: {
    params: {
      company_id: number;
      name: string;
      qty?: number;
      offset?: number;
    };
    response: Product[];
  };
  countByReference: {
    params: {
      company_id: number;
      reference: string;
    };
    response: {
      count: number;
    };
  };
  getByReference: {
    params: {
      company_id?: number;
      reference: string;
      exact?: number;
      qty?: number;
      offset?: number;
    };
    response: Product[];
  };
  countByEAN: {
    params: {
      company_id: number;
      ean: string;
    };
    response: {
      count: number;
    };
  };
  getByEAN: {
    params: {
      company_id?: number;
      ean: string;
      qty?: number;
      offset?: number;
    };
    response: Product[];
  };
  countModifiedSince: {
    params: {
      company_id?: number;
      lastmodified: string;
    };
    response: {
      count: number;
    };
  };
  getModifiedSince: {
    params: {
      company_id?: number;
      lastmodified: string;
      qty?: number;
      offset?: number;
    };
    response: Product[];
  };
  getLastCostPrice: {
    params: {
      company_id: number;
      product_id: number;
      supplier_id?: number;
    };
    response: {
      cost_price: number;
      product: {
        name: string;
        reference: string;
        price: number;
      }[];
      supplier: {
        name: string;
        vat: number;
        address: string;
        city: string;
        phone: string;
      }[];
    };
  };
  insert: {
    params: ProductInsertParams;
    response: {
      valid: number;
      product_id: number;
    };
  };
  update: {
    params: ProductInsertParams;
    response: {
      valid: number;
      product_id: number;
    };
  };
  delete: {
    params: {
      company_id?: number;
      product_id: number;
    };
    response: {
      valid: 1;
    };
  };
};

export type ProductsEndpoint = keyof ProductsRequest;
export type ProductsParams<T extends ProductsEndpoint> =
  ProductsRequest[T]["params"];
export type ProductsResponse<T extends ProductsEndpoint> =
  ProductsRequest[T]["response"];

export type ProductInsertParams = {
  company_id: number;
  product_id?: number;
  category_id: number;
  type: 1 | 2 | 3;
  name: string;
  summary?: string;
  reference: string;
  ean?: string;
  price: number;
  unit_id: number;
  has_stock: number;
  stock?: number;
  minimum_stock?: number;
  pos_favorite?: number;
  at_product_category?: AtProductCategory;
  exemption_reason?: string;
  taxes?: {
    tax_id: number;
    value: number;
    order: number;
    cumulative: number;
  }[];
  suppliers?: {
    supplier_id: number;
    cost_price: number;
    reference?: number;
  }[];
  properties?: {
    property_id: number;
    value: string;
  }[];
  warehouses?: {
    warehouse_id: number;
    stock: number;
  }[];
  price_classes?: {
    price_class_id: number;
    value: number;
  }[];
};
