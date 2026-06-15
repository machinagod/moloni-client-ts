// Copyright 2026 Higitotal, LDA. MIT License.
type CountryRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: Country[];
  };
};

export interface Country {
  country_id: number;
  iso_3166_1: string;
  image: string;
  vies_vat_check_available: number;
}

export type CountryEndpoint = keyof CountryRequest;
export type CountryParams<T extends CountryEndpoint> =
  CountryRequest[T]["params"];
export type CountryResponse<T extends CountryEndpoint> =
  CountryRequest[T]["response"];
