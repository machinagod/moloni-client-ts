// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { Document } from "./document.types.ts";

type PendingDocumentRequest = {
  getAllByDate: {
    params: {
      company_id?: number;
      clients?: number[];
      document_types?: number[];
      start_date?: string; // 'Y-m-d H:i:s'
      end_date?: string; // 'Y-m-d H:i:s'
      order_by?: "date" | "reference" | "client_reference";
      order_dir?: "ASC" | "DESC";
    };
    response: PendingDocs;
  };

  getAllByClient: {
    params: {
      company_id?: number;
      clients?: number[];
      document_types?: number[];
      start_date?: string; // 'Y-m-d H:i:s'
      end_date?: string; // 'Y-m-d H:i:s'
      order_by?: "date" | "reference" | "client_reference";
      order_dir?: "ASC" | "DESC";
    };
    response: PendingDocs;
  };
};

export interface PendingDocs {
  summary: PendingSummary;
  total: number;
  documents: Document[];
}

export interface PendingSummary {
  num_docs?: number;
  num_documents?: number;
  delayed: number;
  net_value: number;
  reconciled: number;
  delay: number;
  total_delay: number;
  total: number;
  pending: number;
  missing: number;
  start_date?: string;
  end_date?: string;
}

export interface PendingClientDocs {
  summary: PendingSummary;
  customers: PendingSummary | {
    customer_id: number;
    customer: {
      number: string;
      name: string;
      vat: string;
      address: string;
      city: string;
      zip_code: string;
      country_id: 1;
    };
    documents: Document[];
  }[];
}

export type PendingDocumentEndpoint = keyof PendingDocumentRequest;
export type PendingDocumentParams<T extends PendingDocumentEndpoint> =
  PendingDocumentRequest[T]["params"];
export type PendingDocumentResponse<T extends PendingDocumentEndpoint> =
  PendingDocumentRequest[T]["response"];
