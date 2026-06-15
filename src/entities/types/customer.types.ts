// Copyright 2026 Higitotal, LDA. MIT License.
type CustomerRequest = {
  countModifiedSince: {
    params: {
      lastmodified: string;
    };
    response: {
      count: string;
    };
  };
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
    params: {
      company_id?: number;
    } & CustomerInsert;
    response: {
      valid: number;
      customer_id: number;
    };
  };
  update: {
    params: {
      company_id?: number;
      customer_id: number;
    } & CustomerInsert;
    response: {
      valid: number;
      customer_id: number;
    };
  };
  getModifiedSince: {
    params: {
      lastmodified: string;
      status?: number;
      offset?: number;
    };
    response: Customer[];
  };
  getAll: {
    params: {
      status?: number;
      offset?: number;
    };
    response: Customer[];
  };
  getOne: {
    params: {
      company_id: number;
      customer_id: number;
    };
    response: Customer;
  };
  getByVat: {
    params: {
      company_id: number;
      vat: string;
      qty?: number;
      offset?: number;
    };
    response: Customer[];
  };
  getByNumber: {
    params: {
      company_id?: number;
      number: string;
      qty?: number;
      offset?: number;
    };
    response: Customer[];
  };

  delete: {
    params: {
      company_id?: number;
      customer_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface CustomerInsert {
  vat: string;
  number: string;
  name: string;
  language_id: number;
  address: string;
  zip_code?: string;
  city: string;
  country_id: number;
  email?: string;
  website?: string;
  phone?: string;
  fax?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  notes?: string;
  salesman_id?: number;
  price_class_id?: number;
  maturity_date_id: number;
  payment_day?: number;
  discount?: number;
  credit_limit?: number;
  copies: [
    {
      document_type_id?: number;
      copies?: number;
    },
  ];
  payment_method_id: number;
  delivery_method_id?: number;
  field_notes?: string;
}

export interface Customer extends CustomerInsert {
  customer_id: number;
  language_id: number;
  country: {
    country_id: number;
    country: string;
    iso_3166_1: string;
  };
  language: {
    language_id: number;
    code: string;
    name: string;
  };
  maturity_date: {
    maturity_date_id: number;
    name: string;
    days: number;
    associated_discount: number;
  };
  payment_method: {
    payment_method_id: number;
    name: string;
  };
  delivery_method: {
    delivery_method_id: number;
    name: string;
  };
  salesman: {
    salesman_id: number;
    number: string;
    name: string;
    base_commission: number;
  };
  alternate_addresses: [
    {
      address_id: number;
      designation: string;
      code: string;
      address: string;
      city: string;
      zip_code: string;
      country_id: number;
      email: string;
      phone: string;
      fax: string;
      contact_name: string;
    },
  ];
  associated_taxes: [
    {
      tax_id: number;
    },
  ];
  price_class: {
    price_class_id: number;
    title: string;
  };
}

export type CustomerEndpoint = keyof CustomerRequest;
export type CustomerParams<T extends CustomerEndpoint> =
  CustomerRequest[T]["params"];
export type CustomerResponse<T extends CustomerEndpoint> =
  CustomerRequest[T]["response"];
