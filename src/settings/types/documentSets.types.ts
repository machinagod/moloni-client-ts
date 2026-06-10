// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type DocumentSetRequest = {
  getAll: {
    params: {
      company_id?: number;
      status?: number;
      offset?: number;
    };
    response: DocumentSet[];
  };

  insert: {
    params: Partial<DocumentSet>;
    response: {
      valid: number;
      document_set_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      document_set_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface DocumentSet {
  document_set_id: number;
  name: string;
  cash_vat_scheme_indicator: number;
  active_by_default: number;
  template_id: number;
}

export type DocumentSetEndpoint = keyof DocumentSetRequest;
export type DocumentSetParams<T extends DocumentSetEndpoint> =
  DocumentSetRequest[T]["params"];
export type DocumentSetResponse<T extends DocumentSetEndpoint> =
  DocumentSetRequest[T]["response"];
