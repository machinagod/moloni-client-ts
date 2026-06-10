// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type FiscalZoneRequest = {
  getAll: {
    params: {
      country_id?: number;
    };
    response: FiscalZone[];
  };
};

export interface FiscalZone {
  fiscal_zone_id: number;
  name: string;
  code: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type FiscalZoneEndpoint = keyof FiscalZoneRequest;
export type FiscalZoneParams<T extends FiscalZoneEndpoint> =
  FiscalZoneRequest[T]["params"];
export type FiscalZoneResponse<T extends FiscalZoneEndpoint> =
  FiscalZoneRequest[T]["response"];
