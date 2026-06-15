// Copyright 2026 Higitotal, LDA. MIT License.
type DocumentModelRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: DocumentModel[];
  };
};

export interface DocumentModel {
  document_model_id: number;
  name: string;
  description: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type DocumentModelEndpoint = keyof DocumentModelRequest;
export type DocumentModelParams<T extends DocumentModelEndpoint> =
  DocumentModelRequest[T]["params"];
export type DocumentModelResponse<T extends DocumentModelEndpoint> =
  DocumentModelRequest[T]["response"];
