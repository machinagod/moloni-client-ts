// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Settings endpoint group for the Moloni API — company-wide configuration such
 * as bank accounts, payment methods, taxes, warehouses, and document sets.
 *
 * @module
 */
import { Base } from "../base.ts";
import {
  DocumentSetEndpoint,
  DocumentSetParams,
  DocumentSetResponse,
} from "./types/documentSets.types.ts";
import {
  MaturityDateEndpoint,
  MaturityDateParams,
  MaturityDateResponse,
} from "./types/maturityDate.types.ts";
import {
  MeasurementUnitEndpoint,
  MeasurementUnitParams,
  MeasurementUnitResponse,
} from "./types/measurementUnit.types.ts";
import {
  PaymentMethodEndpoint,
  PaymentMethodParams,
  PaymentMethodResponse,
} from "./types/paymentMethod.types.ts";
import {
  ProductPropertiesEndpoint,
  ProductPropertiesParams,
  ProductPropertiesResponse,
} from "./types/productProperties.types.ts";
import { TaxEndpoint, TaxParams, TaxResponse } from "./types/tax.types.ts";
import {
  WarehouseEndpoint,
  WarehouseParams,
  WarehouseResponse,
} from "./types/warehouse.types.ts";
import {
  BankAccountEndpoint,
  BankAccountParams,
  BankAccountResponse,
} from "./types/bankAccount.types.ts";
import {
  EconomicActivityClassificationCodeEndpoint,
  EconomicActivityClassificationCodeParams,
  EconomicActivityClassificationCodeResponse,
} from "./types/economicActivityClassificationCode.types.ts";
import {
  DeliveryMethodEndpoint,
  DeliveryMethodParams,
  DeliveryMethodResponse,
} from "./types/deliveryMethod.types.ts";
import {
  VehicleEndpoint,
  VehicleParams,
  VehicleResponse,
} from "./types/vehicle.types.ts";
import {
  DeductionEndpoint,
  DeductionParams,
  DeductionResponse,
} from "./types/deduction.types.ts";
import {
  IdentificationTemplateEndpoint,
  IdentificationTemplateParams,
  IdentificationTemplateResponse,
} from "./types/identificationTemplate.types.ts";

/**
 * Access to the Moloni settings endpoint groups — the company-wide
 * configuration referenced by products and documents.
 *
 * Mixed into the {@linkcode Moloni} client; you normally reach these methods
 * through a `Moloni` instance rather than instantiating this class directly.
 *
 * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
 */
export class Settings extends Base {
  /**
   * Calls the Moloni `/bankAccounts/{request}/` endpoint to manage the
   * company's bank accounts.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  bankAccounts<T extends BankAccountEndpoint>(
    request: T,
    params?: BankAccountParams<T>,
  ): Promise<BankAccountResponse<T>> {
    return this.request(`/bankAccounts/${request}/`, params);
  }

  /**
   * Calls the Moloni `/economicActivityClassificationCodes/{request}/` endpoint
   * to manage CAE economic-activity classification codes.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  economicActivityClassificationCodes<
    T extends EconomicActivityClassificationCodeEndpoint,
  >(
    request: T,
    params?: EconomicActivityClassificationCodeParams<T>,
  ): Promise<EconomicActivityClassificationCodeResponse<T>> {
    return this.request(
      `/economicActivityClassificationCodes/${request}/`,
      params,
    );
  }

  /**
   * Calls the Moloni `/paymentMethods/{request}/` endpoint to manage the
   * payment methods available on documents.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  paymentMethods<T extends PaymentMethodEndpoint>(
    request: T,
    params?: PaymentMethodParams<T>,
  ): Promise<PaymentMethodResponse<T>> {
    return this.request(`/paymentMethods/${request}/`, params);
  }

  /**
   * Calls the Moloni `/maturityDates/{request}/` endpoint to manage payment
   * maturity terms (_Datas de Vencimento_) applied to documents.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  maturityDates<T extends MaturityDateEndpoint>(
    request: T,
    params?: MaturityDateParams<T>,
  ): Promise<MaturityDateResponse<T>> {
    return this.request(`/maturityDates/${request}/`, params);
  }

  /**
   * Calls the Moloni `/deliveryMethods/{request}/` endpoint to manage shipping
   * / delivery methods used on transport documents.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  deliveryMethods<T extends DeliveryMethodEndpoint>(
    request: T,
    params?: DeliveryMethodParams<T>,
  ): Promise<DeliveryMethodResponse<T>> {
    return this.request(`/deliveryMethods/${request}/`, params);
  }

  /**
   * Calls the Moloni `/vehicles/{request}/` endpoint to manage the vehicles
   * referenced as transporters on transport documents.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  vehicles<T extends VehicleEndpoint>(
    request: T,
    params?: VehicleParams<T>,
  ): Promise<VehicleResponse<T>> {
    return this.request(`/vehicles/${request}/`, params);
  }

  /**
   * Calls the Moloni `/deductions/{request}/` endpoint to manage deductions /
   * withholdings applicable to documents.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  deductions<T extends DeductionEndpoint>(
    request: T,
    params?: DeductionParams<T>,
  ): Promise<DeductionResponse<T>> {
    return this.request(`/deductions/${request}/`, params);
  }

  /**
   * Calls the Moloni `/taxes/{request}/` endpoint to manage the tax rates (VAT
   * and others) applied to products and document lines.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  taxes<T extends TaxEndpoint>(
    request: T,
    params?: TaxParams<T>,
  ): Promise<TaxResponse<T>> {
    return this.request(`/taxes/${request}/`, params);
  }

  /**
   * Calls the Moloni `/measurementUnits/{request}/` endpoint to manage the
   * units of measurement (_Unidades de Medida_) assigned to products.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  measurementUnits<T extends MeasurementUnitEndpoint>(
    request: T,
    params?: MeasurementUnitParams<T>,
  ): Promise<MeasurementUnitResponse<T>> {
    return this.request(`/measurementUnits/${request}/`, params);
  }

  /**
   * Calls the Moloni `/identificationTemplates/{request}/` endpoint to manage
   * the document identification/numbering templates.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  identificationTemplates<T extends IdentificationTemplateEndpoint>(
    request: T,
    params?: IdentificationTemplateParams<T>,
  ): Promise<IdentificationTemplateResponse<T>> {
    return this.request(`/identificationTemplates/${request}/`, params);
  }

  /**
   * Calls the Moloni `/documentSets/{request}/` endpoint to manage document
   * sets (_Séries de Documentos_) used to number documents.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  documentSets<T extends DocumentSetEndpoint>(
    request: T,
    params?: DocumentSetParams<T>,
  ): Promise<DocumentSetResponse<T>> {
    return this.request(`/documentSets/${request}/`, params);
  }

  /**
   * Calls the Moloni `/warehouses/{request}/` endpoint to manage the warehouses
   * that hold product stock.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  warehouses<T extends WarehouseEndpoint>(
    request: T,
    params?: WarehouseParams<T>,
  ): Promise<WarehouseResponse<T>> {
    return this.request(`/warehouses/${request}/`, params);
  }

  /**
   * Calls the Moloni `/productProperties/{request}/` endpoint to manage the
   * custom product properties available on the catalog.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`,
   * `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  productProperties<T extends ProductPropertiesEndpoint>(
    request: T,
    params?: ProductPropertiesParams<T>,
  ): Promise<ProductPropertiesResponse<T>> {
    return this.request(`/productProperties/${request}/`, params);
  }
}
