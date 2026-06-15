// Copyright 2026 Higitotal, LDA. MIT License.
import { Salesmen } from "../../entities/types/salesmen.types.ts";
import { Product } from "../../products/types/products.types.ts";

export type DocumentType = {
  titulo: string;
  document_type_id: number;
  saft_code: string;
  category_id: string;
};

type DocumentRequest = {
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
  getAll: {
    params: {
      status?: number;
      offset?: number;
    };
    response: Document[];
  };
  getAllDocumentTypes: {
    params: {
      language_id?: number;
    };
    response: DocumentType[];
  };
  countModifiedSince: {
    params: {
      lastmodified: string;
      document_type_id?: number[];
      status?: number;
      offset?: number;
    };
    response: {
      count: number;
    };
  };
  getModifiedSince: {
    params: {
      lastmodified: string;
      document_type_id?: number[];
      status?: number;
      offset?: number;
    };
    response: Document[];
  };
  getOne: {
    params: {
      company_id?: number;
      document_id?: number;
      customer_id?: number;
      supplier_id?: number;
      salesman_id?: number;
      document_set_id?: number;
      number?: number;
      date?: number;
      expiration_date?: number;
      year?: number;
      your_reference?: string;
      our_reference?: string;
      exact?: number;
    };
    response: DocumentDetailed;
  };

  insert: {
    params: DocumentDetailed;
    response: {
      valid: number;
      document_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      document_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export type AssociatedDocument = {
  associated_id: number;
  associated_document: {
    document_type_id: number;
  };
  value: number;
};

export interface Document {
  company_id: number;
  our_reference: string;
  comercial_discount_value: number;
  customer_id: number;
  date: string;
  deduction_value: number;
  document_id: number;
  document_set_id: number;
  document_set_name: string;
  document_type_id: number;
  entity_address: string;
  entity_city: string;
  entity_country: string;
  entity_country_id: number;
  entity_name: string;
  entity_number: string;
  entity_vat: string;
  entity_zip_code: string;
  exchange_currency_id: number;
  exchange_rate: number;
  exchange_total_value: number;
  expiration_date: string;
  financial_discount: number;
  financial_discount_value: number;
  global_guide: number;
  gross_value: number;
  lastmodified: string;
  lastmodifiedby: string;
  maturity_date_days: number;
  maturity_date_id: number;
  maturity_date_name: string;
  net_value: number;
  number: number;
  reconciled_value: number;
  salesman_id: number;
  status: number;
  supplier_id: number;
  taxes_value: number;
  terminal_id: number;
  transport_code: string;
  transport_code_set_by: number;
  your_reference: string;
  document_type: {
    document_type_id: number;
    saft_code: string;
  };
  document_set: {
    document_set_id: number;
    name: string;
  };
  associated_documents: AssociatedDocument[];
  reverse_associated_documents: number[];
  document_calc_method: {
    document_id: number;
    calc_method_id: number;
  };
}

export interface DocumentDetailed extends Document {
  alternate_address_id: number;
  atcud: string;
  attached_file: string;
  cash_vat_scheme_entity: number;
  cash_vat_scheme_indicator: number;
  deduction_id: number;
  deduction_name: null;
  deduction_percentage: null;
  delivery_datetime: null;
  delivery_departure_address: string;
  delivery_departure_city: string;
  delivery_departure_country: number;
  delivery_departure_zip_code: string;
  delivery_destination_address: string;
  delivery_destination_city: string;
  delivery_destination_country: number;
  delivery_destination_zip_code: string;
  delivery_method_id: number;
  delivery_method_name: null;
  doc_unico: null;
  eac_code: string;
  eac_id: number;
  generate_mb_reference: number;
  hash_control: number;
  lastmodifiedby_id: number;
  notes: string;
  paperless: null;
  plugin_id: number;
  related_documents_notes: string;
  rsa_hash: string;
  salesman: Salesmen;
  salesman_commission: null;
  set_from_api: number;
  special_discount: number;
  timezone_id: number;
  vehicle_id: number;
  vehicle_name: null;
  vehicle_number_plate: null;
  year: number;
  products: (Omit<Product, "taxes"> & {
    qty: number;
    discount: number;
    deduction: number;
    taxes: LineProductTax[];
  })[];
  mb_references: [];
  payments: [];
}

export interface LineProductTax {
  value: number;
  incidence_value: number;
  total_value: number;
}

export type DocumentEndpoint = keyof DocumentRequest;
export type DocumentParams<T extends DocumentEndpoint> =
  DocumentRequest[T]["params"];
export type DocumentResponse<T extends DocumentEndpoint> =
  DocumentRequest[T]["response"];
