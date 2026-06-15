// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Global data endpoint group for the Moloni API — shared reference data such as
 * countries, currencies, languages, fiscal/geographic zones, and tax
 * exemptions.
 *
 * @module
 */
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

/**
 * Access to the Moloni global-data endpoint groups — read-mostly reference data
 * shared across every company.
 *
 * Mixed into the {@linkcode Moloni} client; you normally reach these methods
 * through a `Moloni` instance rather than instantiating this class directly.
 *
 * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
 */
export class GlobalData extends Base {
  /**
   * Calls the Moloni `/countries/{request}/` endpoint to list the countries
   * recognized by Moloni.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  countries<T extends CountryEndpoint>(
    request: T,
    params?: CountryParams<T>,
  ): Promise<CountryResponse<T>> {
    return this.request(`/countries/${request}/`, params);
  }

  /**
   * Calls the Moloni `/fiscalZones/{request}/` endpoint to list the fiscal
   * zones (tax regimes) available per country.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  fiscalZones<T extends FiscalZoneEndpoint>(
    request: T,
    params?: FiscalZoneParams<T>,
  ): Promise<FiscalZoneResponse<T>> {
    return this.request(`/fiscalZones/${request}/`, params);
  }

  /**
   * Calls the Moloni `/languages/{request}/` endpoint to list the languages
   * supported for documents.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  languages<T extends LanguageEndpoint>(
    request: T,
    params?: LanguageParams<T>,
  ): Promise<LanguageResponse<T>> {
    return this.request(`/languages/${request}/`, params);
  }

  /**
   * Calls the Moloni `/currencies/{request}/` endpoint to list the currencies
   * recognized by Moloni.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  currencies<T extends CurrencyEndpoint>(
    request: T,
    params?: CurrencyParams<T>,
  ): Promise<CurrencyResponse<T>> {
    return this.request(`/currencies/${request}/`, params);
  }

  /**
   * Calls the Moloni `/geographicZones/{request}/` endpoint to list the
   * geographic zones (districts/regions) used for addresses.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  geographicZones<T extends GeographicZoneEndpoint>(
    request: T,
    params?: GeographicZoneParams<T>,
  ): Promise<GeographicZoneResponse<T>> {
    return this.request(`/geographicZones/${request}/`, params);
  }

  /**
   * Calls the Moloni `/documentModels/{request}/` endpoint to list the document
   * models/templates available for printing.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  documentModels<T extends DocumentModelEndpoint>(
    request: T,
    params?: DocumentModelParams<T>,
  ): Promise<DocumentModelResponse<T>> {
    return this.request(`/documentModels/${request}/`, params);
  }

  /**
   * Calls the Moloni `/taxExemptions/{request}/` endpoint to list the legal tax
   * exemption reasons that can be set on tax-exempt lines.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  taxExemptions<T extends TaxExemptionEndpoint>(
    request: T,
    params?: TaxExemptionParams<T>,
  ): Promise<TaxExemptionResponse<T>> {
    return this.request(`/taxExemptions/${request}/`, params);
  }

  /**
   * Calls the Moloni `/currencyExchange/{request}/` endpoint to read currency
   * exchange rates.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  currencyExchange<T extends CurrencyExchangeEndpoint>(
    request: T,
    params?: CurrencyExchangeParams<T>,
  ): Promise<CurrencyExchangeResponse<T>> {
    return this.request(`/currencyExchange/${request}/`, params);
  }

  /**
   * Calls the Moloni `/mBGateways/{request}/` endpoint to read the available
   * Multibanco payment gateways.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  mBGateways<T extends MBGatewayEndpoint>(
    request: T,
    params?: MBGatewayParams<T>,
  ): Promise<MBGatewayResponse<T>> {
    return this.request(`/mBGateways/${request}/`, params);
  }
}
