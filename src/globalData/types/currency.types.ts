// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type CurrencyRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: Currency[];
  };
};

export interface Currency {
  currency_id: number;
  symbol: string;
  name: string;
  exchange: number;
  lastmodifiedby: string;
  lastmodified: string;
}

export type CurrencyEndpoint = keyof CurrencyRequest;
export type CurrencyParams<T extends CurrencyEndpoint> =
  CurrencyRequest[T]["params"];
export type CurrencyResponse<T extends CurrencyEndpoint> =
  CurrencyRequest[T]["response"];
