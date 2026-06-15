// Copyright 2026 Higitotal, LDA. MIT License.
type LanguageRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: Language[];
  };
};

export interface Language {
  language_id: number;
  name: string;
  symbol: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type LanguageEndpoint = keyof LanguageRequest;
export type LanguageParams<T extends LanguageEndpoint> =
  LanguageRequest[T]["params"];
export type LanguageResponse<T extends LanguageEndpoint> =
  LanguageRequest[T]["response"];
