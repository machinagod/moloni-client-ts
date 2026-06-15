// Copyright 2026 Higitotal, LDA. MIT License.
type MeasurementUnitRequest = {
  getAll: {
    params: {
      company_id?: number;
    };
    response: MeasurementUnit[];
  };

  insert: {
    params: {
      company_id?: number;
    } & MeasurementUnit;
    response: {
      valid: number;
      unit_id: number;
    };
  };

  delete: {
    params: {
      company_id?: number;
      unit_id: number;
    };
    response: {
      valid: number;
    };
  };
};

export interface MeasurementUnit {
  unit_id?: number;
  name: string;
  short_name: string;
}

export type MeasurementUnitEndpoint = keyof MeasurementUnitRequest;
export type MeasurementUnitParams<T extends MeasurementUnitEndpoint> =
  MeasurementUnitRequest[T]["params"];
export type MeasurementUnitResponse<T extends MeasurementUnitEndpoint> =
  MeasurementUnitRequest[T]["response"];
