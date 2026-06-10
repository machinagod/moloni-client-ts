// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type IdentificationTemplateRequest = {
  getAll: {
    params: Record<PropertyKey, never>;
    response: IdentificationTemplate[];
  };
};

export interface IdentificationTemplate {
  identification_template_id: number;
  name: string;
  template: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type IdentificationTemplateEndpoint =
  keyof IdentificationTemplateRequest;
export type IdentificationTemplateParams<
  T extends IdentificationTemplateEndpoint,
> = IdentificationTemplateRequest[T]["params"];
export type IdentificationTemplateResponse<
  T extends IdentificationTemplateEndpoint,
> = IdentificationTemplateRequest[T]["response"];
