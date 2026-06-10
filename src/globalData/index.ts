// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { Base } from "../base.ts";
import {
  CountryEndpoint,
  CountryParams,
  CountryResponse,
} from "./types/country.types.ts";
import {
  GeographicZoneEndpoint,
  GeographicZoneParams,
  GeographicZoneResponse,
} from "./types/geographicZone.types.ts";
import {
  FiscalZoneEndpoint,
  FiscalZoneParams,
  FiscalZoneResponse,
} from "./types/fiscalZone.types.ts";
import {
  LanguageEndpoint,
  LanguageParams,
  LanguageResponse,
} from "./types/language.types.ts";
import {
  CurrencyEndpoint,
  CurrencyParams,
  CurrencyResponse,
} from "./types/currency.types.ts";
import {
  DocumentModelEndpoint,
  DocumentModelParams,
  DocumentModelResponse,
} from "./types/documentModel.types.ts";
import {
  TaxExemptionEndpoint,
  TaxExemptionParams,
  TaxExemptionResponse,
} from "./types/taxExemption.types.ts";
import {
  CurrencyExchangeEndpoint,
  CurrencyExchangeParams,
  CurrencyExchangeResponse,
} from "./types/currencyExchange.types.ts";
import {
  MBGatewayEndpoint,
  MBGatewayParams,
  MBGatewayResponse,
} from "./types/mbGateway.types.ts";

export class GlobalData extends Base {
  countries<T extends CountryEndpoint>(
    request: T,
    params?: CountryParams<T>,
  ): Promise<CountryResponse<T>> {
    return this.request(`/countries/${request}/`, params);
  }

  fiscalZones<T extends FiscalZoneEndpoint>(
    request: T,
    params?: FiscalZoneParams<T>,
  ): Promise<FiscalZoneResponse<T>> {
    return this.request(`/fiscalZones/${request}/`, params);
  }

  languages<T extends LanguageEndpoint>(
    request: T,
    params?: LanguageParams<T>,
  ): Promise<LanguageResponse<T>> {
    return this.request(`/languages/${request}/`, params);
  }

  currencies<T extends CurrencyEndpoint>(
    request: T,
    params?: CurrencyParams<T>,
  ): Promise<CurrencyResponse<T>> {
    return this.request(`/currencies/${request}/`, params);
  }

  geographicZones<T extends GeographicZoneEndpoint>(
    request: T,
    params?: GeographicZoneParams<T>,
  ): Promise<GeographicZoneResponse<T>> {
    return this.request(`/geographicZones/${request}/`, params);
  }

  documentModels<T extends DocumentModelEndpoint>(
    request: T,
    params?: DocumentModelParams<T>,
  ): Promise<DocumentModelResponse<T>> {
    return this.request(`/documentModels/${request}/`, params);
  }

  taxExemptions<T extends TaxExemptionEndpoint>(
    request: T,
    params?: TaxExemptionParams<T>,
  ): Promise<TaxExemptionResponse<T>> {
    return this.request(`/taxExemptions/${request}/`, params);
  }

  currencyExchange<T extends CurrencyExchangeEndpoint>(
    request: T,
    params?: CurrencyExchangeParams<T>,
  ): Promise<CurrencyExchangeResponse<T>> {
    return this.request(`/currencyExchange/${request}/`, params);
  }

  mBGateways<T extends MBGatewayEndpoint>(
    request: T,
    params?: MBGatewayParams<T>,
  ): Promise<MBGatewayResponse<T>> {
    return this.request(`/mBGateways/${request}/`, params);
  }
}
