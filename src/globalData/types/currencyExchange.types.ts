// Copyright 2026 Higitotal, LDA. MIT License.
type CurrencyExchangeRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: CurrencyExchange[];
  };
};

export interface CurrencyExchange {
  exchange_id: number;
  from_currency_id: number;
  to_currency_id: number;
  rate: number;
  lastmodifiedby: string;
  lastmodified: string;
}

export type CurrencyExchangeEndpoint = keyof CurrencyExchangeRequest;
export type CurrencyExchangeParams<T extends CurrencyExchangeEndpoint> =
  CurrencyExchangeRequest[T]["params"];
export type CurrencyExchangeResponse<T extends CurrencyExchangeEndpoint> =
  CurrencyExchangeRequest[T]["response"];
