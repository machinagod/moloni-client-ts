// Copyright 2026 Higitotal, LDA. MIT License.
type VehicleRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: Vehicle[];
  };
};

// Shape returned by Moloni's /vehicles/getAll endpoint. Note the API uses
// `number_plate` and `description` (NOT `registration`/`brand`/`model`).
export interface Vehicle {
  vehicle_id: number;
  number_plate: string;
  description: string;
}

export type VehicleEndpoint = keyof VehicleRequest;
export type VehicleParams<T extends VehicleEndpoint> =
  VehicleRequest[T]["params"];
export type VehicleResponse<T extends VehicleEndpoint> =
  VehicleRequest[T]["response"];
