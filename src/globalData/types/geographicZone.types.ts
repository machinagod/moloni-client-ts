// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type GeographicZoneRequest = {
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
    response: GeographicZone[];
  };
  getOne: {
    params: {
      company_id: number;
      geographic_zone_id: number;
    };
    response: GeographicZone;
  };
  insert: {
    params: {
      name: string;
      short_name: string;
    };
    response: {
      valid: number;
      geographic_zone_id: number;
    };
  };

  delete: {
    params: {
      company_id: number;
      geographic_zone_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface GeographicZone {
  geographic_zone_id: number;
  name: string;
  short_name: string;
  lastmodifiedby: string;
  lastmodified: string;
  destaque_id: number;
  company_id: number;
  notes: string;
}

export type GeographicZoneEndpoint = keyof GeographicZoneRequest;
export type GeographicZoneParams<T extends GeographicZoneEndpoint> =
  GeographicZoneRequest[T]["params"];
export type GeographicZoneResponse<T extends GeographicZoneEndpoint> =
  GeographicZoneRequest[T]["response"];
