// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type SettlementNoteRequest = {
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
    response: SettlementNote[];
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
      your_reference?: number;
      our_reference?: string;
      exact?: number;
    };
    response: SettlementNote;
  };

  update: {
    params: Partial<SettlementNote>;
    response: {
      valid: number;
      document_id: number;
    };
  };

  insert: {
    params: Partial<SettlementNote>;
    response: {
      valid: number;
      document_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      settlement_note_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface SettlementNote {
  document_id: number;
  date: string;
  number: number;
  customer_id: number;
  document_set_id: number;
  document_set_name?: string;
  expiration_date: string;
  maturity_date_id: number;
  your_reference: string;
  our_reference: string;
  financial_discount: number;
  gross_value: number;
  comercial_discount_value: number;
  financial_discount_value: number;
  taxes_value: number;
  deduction_value: number;
  net_value: number;
  reconciled_value: number;
  status: number;
  transport_code: number;
  transport_code_set_by: number;
  global_guide: number;
  exchange_currency_id: number;
  exchange_total_value: number;
  exchange_rate: number;
  document_type: {
    document_type_id: number;
    saft_code: string;
  };
  associated_documents: {
    associated_id: number;
    associated_document: {
      document_type_id: number;
    };
    value: number;
  }[];
  payments: {
    payment_method_id: number;
    date: string;
    value: number;
  }[];
  notes?: string;
}

export type SettlementNoteEndpoint = keyof SettlementNoteRequest;
export type SettlementNoteParams<T extends SettlementNoteEndpoint> =
  SettlementNoteRequest[T]["params"];
export type SettlementNoteResponse<T extends SettlementNoteEndpoint> =
  SettlementNoteRequest[T]["response"];
