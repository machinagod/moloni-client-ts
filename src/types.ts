// Copyright 2026 Higitotal, LDA. MIT License.
export type AuthErrorResponse = {
  error:
    | "invalid_client"
    | "invalid_uri"
    | "redirect_uri_mismatch"
    | "invalid_request"
    | "unsupported_grant_type"
    | "unauthorized_client"
    | "invalid_grant"
    | "invalid_scope";
  error_description: string;
};

export type AuthResponse = {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
  scope: null;
  refresh_token: string;
};

export type MoloniError = string[];
