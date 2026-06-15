// Copyright 2026 Higitotal, LDA. MIT License.
type CompanyRequest = {
  freeSlug: {
    params: {
      slug: string;
    };
    response: {
      valid: number;
    };
  };
  getAll: {
    params: Record<PropertyKey, never>;
    response: Company[];
  };
  getOne: {
    params: {
      company_id: string | number;
    };
    response: CompanyDetailed;
  };
};

type Company = {
  company_id: number;
  name: string;
  email: string;
  vat: string;
  address: string;
  city: string;
  zip_code: string;
  country_id: number;
  image: string;
  confirmed: number;
  currency_id: number;
  gdpr_acceptance: number;
  country: {
    country_id: number;
    name: string;
    iso_3166_1: string;
  };
  currency: {
    currency_id: number;
    symbol: string;
    symbol_right: number;
  };
};

type CompanyDetailed = {
  slug: string;
  email: string;
  fax: string;
  website: string;
  cash_vat_scheme_indicator: number;
  cash_vat_scheme_status_change: string | null;
  wsat_status_change: string | null;
  wsatt_status_change: string | null;
  gateway_id: number;
  timezone_id: number;
  company_id: number;
  subscription_date: string;
  name: string;
  vat: string;
  address: string;
  city: string;
  zip_code: string;
  country_id: number;
  fiscal_country_id: number;
  capital: string;
  commercial_registration_number: string;
  registry_office: string;
  phone: string;
  image: string;
  is_retailer_or_tsp: number;
  decimal_separator: string;
  thousands_separator: string;
  decimal_places: number;
  currency_id: number;
  docs_copies: number;
  maturity_date_id: number;
  maturity_on_week_day: number;
  payment_method_id: number;
  delivery_method_id: number;
  notes: string;
  docs_footer: string;
  docs_commercial_info_on_footer: number;
  docs_company_info_position: number;
  docs_qr_code_position: number;
  docs_pdf_model_id: number;
  mails_sender_name: string;
  mails_sender_address: string;
  show_home_charts: number;
  docs_show_related: number;
  docs_show_client_phone: number;
  docs_show_values_on_movement_docs: number;
  docs_show_values_on_orders_docs: number;
  docs_show_values_on_service_sheets: number;
  docs_show_values_on_return_docs: number;
  docs_show_values_with_taxes: number;
  docs_show_salesman: number;
  docs_show_client_vat_prefix: number;
  docs_show_company_notes: number;
  docs_show_unit_price_with_taxes: number;
  docs_show_products_summary: number;
  transport_docs_move_stock: number;
  show_inactive_customers: number;
  show_inactive_products: number;
  customer_series: number;
  numeric_code_ordering: number;
  detached_series_doc_number: number;
  docs_qty_products_page: number;
  notify_late_documents: number;
  wsat_auto_transmit: number;
  wsatt_auto_transmit: number;
  gdpr_acceptance: number;
  mb_entity: number;
  mb_sub_entity: number;
  mb_initial_reference: number;
  mb_email: string;
  mb_alert_language_id: number;
  mb_easypay_cin: number;
  mb_easypay_user: string;
  mb_easypay_code: string;
  calc_method_id: number;
  country: { iso_3166_1: string; country_id: number; name: string };
  copies: { company_id: number; document_type_id: number; copies: number }[];
  subscription: {
    subscription_id: number;
    company_id: number;
    plan_id: number;
    payment_mode: string;
    last_price: number;
    subscription_date: string;
    expire_date: string;
    paid: number;
    last_payment_date: string;
    plan: {
      plan_id: number;
      languages: { language_id: number; code: string }[];
    };
  };
  bank_accounts: { bank_account_id: number; name: string }[];
  eac_codes: { eac_code_id: number; code: string }[];
  mb_documents_document_sets: { document_set_id: number }[];
  document_sets_defaults: {
    document_set_id: number;
    document_type_id: number;
  }[];
  currency: {
    iso4217: string;
    currency_id: number;
    symbol: string;
    symbol_right: number;
  };
  bank_accounts_templates: { template_id: number; name: string }[];
};

export type CompanyEndpoint = keyof CompanyRequest;
export type CompanyParams<T extends CompanyEndpoint> =
  CompanyRequest[T]["params"];
export type CompanyResponse<T extends CompanyEndpoint> =
  CompanyRequest[T]["response"];
