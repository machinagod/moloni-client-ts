// Copyright 2026 Higitotal, LDA. MIT License.
type MBGatewayRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: MBGateway[];
  };
};

export interface MBGateway {
  gateway_id: number;
  name: string;
  description: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type MBGatewayEndpoint = keyof MBGatewayRequest;
export type MBGatewayParams<T extends MBGatewayEndpoint> =
  MBGatewayRequest[T]["params"];
export type MBGatewayResponse<T extends MBGatewayEndpoint> =
  MBGatewayRequest[T]["response"];
