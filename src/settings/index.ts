// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
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

export class Settings extends Base {
  bankAccounts<T extends BankAccountEndpoint>(
    request: T,
    params?: BankAccountParams<T>,
  ): Promise<BankAccountResponse<T>> {
    return this.request(`/bankAccounts/${request}/`, params);
  }

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

  paymentMethods<T extends PaymentMethodEndpoint>(
    request: T,
    params?: PaymentMethodParams<T>,
  ): Promise<PaymentMethodResponse<T>> {
    return this.request(`/paymentMethods/${request}/`, params);
  }

  maturityDates<T extends MaturityDateEndpoint>(
    request: T,
    params?: MaturityDateParams<T>,
  ): Promise<MaturityDateResponse<T>> {
    return this.request(`/maturityDates/${request}/`, params);
  }

  deliveryMethods<T extends DeliveryMethodEndpoint>(
    request: T,
    params?: DeliveryMethodParams<T>,
  ): Promise<DeliveryMethodResponse<T>> {
    return this.request(`/deliveryMethods/${request}/`, params);
  }

  vehicles<T extends VehicleEndpoint>(
    request: T,
    params?: VehicleParams<T>,
  ): Promise<VehicleResponse<T>> {
    return this.request(`/vehicles/${request}/`, params);
  }

  deductions<T extends DeductionEndpoint>(
    request: T,
    params?: DeductionParams<T>,
  ): Promise<DeductionResponse<T>> {
    return this.request(`/deductions/${request}/`, params);
  }

  taxes<T extends TaxEndpoint>(
    request: T,
    params?: TaxParams<T>,
  ): Promise<TaxResponse<T>> {
    return this.request(`/taxes/${request}/`, params);
  }

  measurementUnits<T extends MeasurementUnitEndpoint>(
    request: T,
    params?: MeasurementUnitParams<T>,
  ): Promise<MeasurementUnitResponse<T>> {
    return this.request(`/measurementUnits/${request}/`, params);
  }

  identificationTemplates<T extends IdentificationTemplateEndpoint>(
    request: T,
    params?: IdentificationTemplateParams<T>,
  ): Promise<IdentificationTemplateResponse<T>> {
    return this.request(`/identificationTemplates/${request}/`, params);
  }

  documentSets<T extends DocumentSetEndpoint>(
    request: T,
    params?: DocumentSetParams<T>,
  ): Promise<DocumentSetResponse<T>> {
    return this.request(`/documentSets/${request}/`, params);
  }

  warehouses<T extends WarehouseEndpoint>(
    request: T,
    params?: WarehouseParams<T>,
  ): Promise<WarehouseResponse<T>> {
    return this.request(`/warehouses/${request}/`, params);
  }

  productProperties<T extends ProductPropertiesEndpoint>(
    request: T,
    params?: ProductPropertiesParams<T>,
  ): Promise<ProductPropertiesResponse<T>> {
    return this.request(`/productProperties/${request}/`, params);
  }
}
