// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type TaxExemptionRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: TaxExemption[];
  };
};

export interface TaxExemption {
  tax_exemption_id: number;
  name: string;
  code: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type TaxExemptionEndpoint = keyof TaxExemptionRequest;
export type TaxExemptionParams<T extends TaxExemptionEndpoint> =
  TaxExemptionRequest[T]["params"];
export type TaxExemptionResponse<T extends TaxExemptionEndpoint> =
  TaxExemptionRequest[T]["response"];
