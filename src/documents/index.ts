// Copyright 2026 Higitotal, LDA. MIT License.
import { Base } from "../base.ts";
import {
  DocumentEndpoint,
  DocumentParams,
  DocumentResponse,
} from "./types/document.types.ts";
import {
  PendingDocumentEndpoint,
  PendingDocumentParams,
  PendingDocumentResponse,
} from "./types/pending_document.types.ts";
import {
  SettlementNoteEndpoint,
  SettlementNoteParams,
  SettlementNoteResponse,
} from "./types/settlementNote.types.ts";

export class Documents extends Base {
  documents<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/documents/${request}/`, params);
  }

  pendingDocuments<T extends PendingDocumentEndpoint>(
    request: T,
    params?: PendingDocumentParams<T>,
  ): Promise<PendingDocumentResponse<T>> {
    return this.request(`/SalesPending/${request}/`, params);
  }

  invoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/invoices/${request}/`, params);
  }

  settlementNotes<T extends SettlementNoteEndpoint>(
    request: T,
    params?: SettlementNoteParams<T>,
  ): Promise<SettlementNoteResponse<T>> {
    return this.request(`/settlementNotes/${request}/`, params);
  }

  migratedBalancesInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/migratedBalancesInvoices/${request}/`, params);
  }

  receipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/receipts/${request}/`, params);
  }

  migratedBalancesReceipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/migratedBalancesReceipts/${request}/`, params);
  }

  creditNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/creditNotes/${request}/`, params);
  }

  migratedBalancesCreditNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/migratedBalancesCreditNotes/${request}/`, params);
  }

  debitNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/debitNotes/${request}/`, params);
  }

  simplifiedInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/simplifiedInvoices/${request}/`, params);
  }

  deliveryNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/deliveryNotes/${request}/`, params);
  }

  billsOfLading<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/billsOfLading/${request}/`, params);
  }

  ownAssetsMovementGuides<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/ownAssetsMovementGuides/${request}/`, params);
  }

  waybills<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/waybills/${request}/`, params);
  }

  customerReturnNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/customerReturnNotes/${request}/`, params);
  }

  estimates<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/estimates/${request}/`, params);
  }

  internalDocuments<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/internalDocuments/${request}/`, params);
  }

  invoiceReceipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/invoiceReceipts/${request}/`, params);
  }

  paymentReturns<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/paymentReturns/${request}/`, params);
  }

  purchaseOrder<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/purchaseOrder/${request}/`, params);
  }

  supplierPurchaseOrder<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierPurchaseOrder/${request}/`, params);
  }

  supplierInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierInvoices/${request}/`, params);
  }

  supplierSimplifiedInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierSimplifiedInvoices/${request}/`, params);
  }

  supplierCreditNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierCreditNotes/${request}/`, params);
  }

  supplierDebitNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierDebitNotes/${request}/`, params);
  }

  supplierReturnNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierReturnNotes/${request}/`, params);
  }

  supplierReceipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierReceipts/${request}/`, params);
  }

  supplierWarrantyRequests<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierWarrantyRequests/${request}/`, params);
  }

  globalGuides<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/globalGuides/${request}/`, params);
  }
}
