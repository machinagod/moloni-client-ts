// Copyright 2026 Higitotal, LDA. MIT License.
type DeductionRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: Deduction[];
  };
};

export interface Deduction {
  deduction_id: number;
  name: string;
  percentage: number;
  lastmodifiedby: string;
  lastmodified: string;
}

export type DeductionEndpoint = keyof DeductionRequest;
export type DeductionParams<T extends DeductionEndpoint> =
  DeductionRequest[T]["params"];
export type DeductionResponse<T extends DeductionEndpoint> =
  DeductionRequest[T]["response"];
