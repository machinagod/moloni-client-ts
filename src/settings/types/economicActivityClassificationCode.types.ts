// Copyright 2026 Higitotal, LDA. MIT License.
type EconomicActivityClassificationCodeRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: EconomicActivityClassificationCode[];
  };
};

export interface EconomicActivityClassificationCode {
  cae_id: number;
  code: string;
  description: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type EconomicActivityClassificationCodeEndpoint =
  keyof EconomicActivityClassificationCodeRequest;
export type EconomicActivityClassificationCodeParams<
  T extends EconomicActivityClassificationCodeEndpoint,
> = EconomicActivityClassificationCodeRequest[T]["params"];
export type EconomicActivityClassificationCodeResponse<
  T extends EconomicActivityClassificationCodeEndpoint,
> = EconomicActivityClassificationCodeRequest[T]["response"];
