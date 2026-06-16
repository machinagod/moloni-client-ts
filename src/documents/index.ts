// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Documents endpoint group for the Moloni API — every commercial document type
 * (invoices, receipts, credit/debit notes, guides, orders, and the
 * supplier-side equivalents).
 *
 * Each method targets one document type but shares the same action surface:
 * `count`, `getAll`, `getOne`, `insert`, `update`, and `delete`. Note that the
 * underlying client refuses to publish documents — `insert`/`update` calls must
 * use `status: 0` (draft).
 *
 * @module
 */
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

/**
 * Access to the Moloni document endpoint groups.
 *
 * Mixed into the {@linkcode Moloni} client; you normally reach these methods
 * through a `Moloni` instance rather than instantiating this class directly.
 * Every method maps to one Moloni document type and accepts the same set of
 * actions (`count`, `getAll`, `getOne`, `insert`, `update`, `delete`).
 *
 * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
 */
export class Documents extends Base {
  /**
   * Calls the Moloni `/documents/{request}/` endpoint — the cross-type document
   * group used to read, count, and act on documents regardless of their
   * specific type.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"count"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  documents<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/documents/${request}/`, params);
  }

  /**
   * Calls the Moloni `/SalesPending/{request}/` endpoint to manage pending
   * sales documents (drafts awaiting conversion into a final document).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  pendingDocuments<T extends PendingDocumentEndpoint>(
    request: T,
    params?: PendingDocumentParams<T>,
  ): Promise<PendingDocumentResponse<T>> {
    return this.request(`/SalesPending/${request}/`, params);
  }

  /**
   * Calls the Moloni `/invoices/{request}/` endpoint to manage invoices
   * (_Faturas_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  invoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/invoices/${request}/`, params);
  }

  /**
   * Calls the Moloni `/settlementNotes/{request}/` endpoint to manage
   * settlement notes (_Notas de Acerto_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  settlementNotes<T extends SettlementNoteEndpoint>(
    request: T,
    params?: SettlementNoteParams<T>,
  ): Promise<SettlementNoteResponse<T>> {
    return this.request(`/settlementNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/migratedBalancesInvoices/{request}/` endpoint to manage
   * opening-balance invoices imported when migrating from another system.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  migratedBalancesInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/migratedBalancesInvoices/${request}/`, params);
  }

  /**
   * Calls the Moloni `/receipts/{request}/` endpoint to manage receipts
   * (_Recibos_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  receipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/receipts/${request}/`, params);
  }

  /**
   * Calls the Moloni `/migratedBalancesReceipts/{request}/` endpoint to manage
   * opening-balance receipts imported when migrating from another system.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  migratedBalancesReceipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/migratedBalancesReceipts/${request}/`, params);
  }

  /**
   * Calls the Moloni `/creditNotes/{request}/` endpoint to manage credit notes
   * (_Notas de Crédito_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  creditNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/creditNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/migratedBalancesCreditNotes/{request}/` endpoint to
   * manage opening-balance credit notes imported when migrating from another
   * system.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  migratedBalancesCreditNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/migratedBalancesCreditNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/debitNotes/{request}/` endpoint to manage debit notes
   * (_Notas de Débito_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  debitNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/debitNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/simplifiedInvoices/{request}/` endpoint to manage
   * simplified invoices (_Faturas Simplificadas_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  simplifiedInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/simplifiedInvoices/${request}/`, params);
  }

  /**
   * Calls the Moloni `/deliveryNotes/{request}/` endpoint to manage delivery
   * notes (_Guias de Remessa_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  deliveryNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/deliveryNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/billsOfLading/{request}/` endpoint to manage bills of
   * lading / transport guides (_Guias de Transporte_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  billsOfLading<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/billsOfLading/${request}/`, params);
  }

  /**
   * Calls the Moloni `/ownAssetsMovementGuides/{request}/` endpoint to manage
   * own-assets movement guides (_Guias de Movimentação de Ativos Próprios_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  ownAssetsMovementGuides<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/ownAssetsMovementGuides/${request}/`, params);
  }

  /**
   * Calls the Moloni `/waybills/{request}/` endpoint to manage waybills
   * (transport documents).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  waybills<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/waybills/${request}/`, params);
  }

  /**
   * Calls the Moloni `/customerReturnNotes/{request}/` endpoint to manage
   * customer return notes (_Guias de Devolução_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  customerReturnNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/customerReturnNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/estimates/{request}/` endpoint to manage estimates /
   * quotes (_Orçamentos_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  estimates<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/estimates/${request}/`, params);
  }

  /**
   * Calls the Moloni `/internalDocuments/{request}/` endpoint to manage
   * internal documents (_Documentos Internos_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  internalDocuments<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/internalDocuments/${request}/`, params);
  }

  /**
   * Calls the Moloni `/invoiceReceipts/{request}/` endpoint to manage
   * invoice-receipts (_Faturas-Recibo_), a combined invoice and receipt.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  invoiceReceipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/invoiceReceipts/${request}/`, params);
  }

  /**
   * Calls the Moloni `/paymentReturns/{request}/` endpoint to manage payment
   * returns / refunds.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  paymentReturns<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/paymentReturns/${request}/`, params);
  }

  /**
   * Calls the Moloni `/purchaseOrder/{request}/` endpoint to manage purchase
   * orders (_Notas de Encomenda_).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  purchaseOrder<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/purchaseOrder/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierPurchaseOrder/{request}/` endpoint to manage
   * purchase orders issued to suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierPurchaseOrder<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierPurchaseOrder/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierInvoices/{request}/` endpoint to manage invoices
   * received from suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierInvoices/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierSimplifiedInvoices/{request}/` endpoint to
   * manage simplified invoices received from suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierSimplifiedInvoices<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierSimplifiedInvoices/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierCreditNotes/{request}/` endpoint to manage
   * credit notes received from suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierCreditNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierCreditNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierDebitNotes/{request}/` endpoint to manage debit
   * notes received from suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierDebitNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierDebitNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierReturnNotes/{request}/` endpoint to manage
   * return notes issued to suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierReturnNotes<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierReturnNotes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierReceipts/{request}/` endpoint to manage receipts
   * received from suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierReceipts<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierReceipts/${request}/`, params);
  }

  /**
   * Calls the Moloni `/supplierWarrantyRequests/{request}/` endpoint to manage
   * warranty requests submitted to suppliers.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  supplierWarrantyRequests<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/supplierWarrantyRequests/${request}/`, params);
  }

  /**
   * Calls the Moloni `/globalGuides/{request}/` endpoint to manage global
   * transport guides that span multiple guide types.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  globalGuides<T extends DocumentEndpoint>(
    request: T,
    params?: DocumentParams<T>,
  ): Promise<DocumentResponse<T>> {
    return this.request(`/globalGuides/${request}/`, params);
  }
}
