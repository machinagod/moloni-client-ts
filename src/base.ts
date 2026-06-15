// Copyright 2026 Higitotal, LDA. MIT License.
/** Build a query string from an object (e.g. `?key=val&key2=val2`). */
function stringify(
  params: Record<string, string | boolean | undefined>,
  prefix = "",
): string {
  const entries = Object.entries(params)
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => [k, String(v)]);
  const search = new URLSearchParams(entries).toString();
  return search ? `${prefix}${search}` : "";
}
import { AuthErrorResponse, AuthResponse } from "./types.ts";

const apiBaseUrl = "https://api.moloni.pt";
const sandboxUrl = `${apiBaseUrl}/sandbox`;
const apiUrl = `${apiBaseUrl}/v1`;

export type InitConfig = {
  clientId: string;
  clientSecret: string;
  username?: string;
  password?: string;
  credentials?: AuthResponse; // If using an external authenticator
  sandbox?: boolean;
};

export abstract class Base {
  private companyId?: number;
  private credentials?: AuthResponse;
  private credentialsExpiresAt?: Date;
  private authPromise?: Promise<AuthResponse>;

  constructor(private config: InitConfig) {}

  public setCompanyId(id: number): this {
    this.companyId = id;
    return this;
  }

  private get apiUrl() {
    return this.config.sandbox ? sandboxUrl : apiUrl;
  }

  protected async request<T>(
    endpoint: string,
    // deno-lint-ignore no-explicit-any
    params?: Record<string, any>,
  ): Promise<T> {
    const isWriteOperation = endpoint.endsWith("/insert/") ||
      endpoint.endsWith("/update/");
    if (
      isWriteOperation && params && "status" in params && params.status !== 0
    ) {
      throw new Error(
        `Publishing documents is not allowed. status must be 0 (draft), got: ${params.status}`,
      );
    }

    if (
      !this.credentials?.access_token ||
      (this.credentialsExpiresAt !== undefined &&
        this.credentialsExpiresAt < new Date())
    ) {
      await this.ensureAuthenticated();
    }

    const stringifiedParams = stringify({
      access_token: this.credentials?.access_token,
      human_errors: true,
      json: true,
    }, "?");
    const url = this.apiUrl + endpoint + stringifiedParams;
    const body = JSON.stringify(
      {
        company_id: this.companyId,
        ...params,
      },
      null,
      2,
    );

    try {
      // Log only the path — the full URL carries `?access_token=...` and
      // would broadcast a working OAuth token to stdout (and from there to
      // Deno Deploy logs).
      console.log(`Sending request to ${this.apiUrl + endpoint}`);
      const response = await fetch(url, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error_description ||
            errorData.message ||
            `Request failed with status ${response.status}`,
        );
      }

      return await response.json() as T;
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Ensures authentication is performed only once even with concurrent requests.
   * Multiple concurrent calls will share the same authentication promise.
   */
  private ensureAuthenticated(): Promise<AuthResponse> {
    if (!this.authPromise) {
      this.authPromise = this.authenticate().finally(() => {
        // Clear the promise after completion so future auth can happen
        this.authPromise = undefined;
      });
    }
    return this.authPromise;
  }

  public async authenticate(): Promise<AuthResponse> {
    if (this.config.credentials) {
      this.credentials = this.config.credentials;
      return this.credentials;
    }

    // SEC-006 ROLLBACK: tried POST + form body so credentials would never end
    // up in URLs, but Moloni's production /v1/grant rejected the body shape
    // ("Missing parameters: 'username' and 'password' required") even though
    // /sandbox/grant/ accepted it. Reverted to GET + query string until we can
    // validate against production credentials. SEC-005 (don't log the URL) is
    // still in place, so the secret no longer hits stdout / Deno Deploy logs;
    // the residual exposure surface is `Referer` / external proxy logs, but
    // since this call is server→Moloni only (no browser), there is no Referer.
    const params = {
      grant_type: "password",
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      username: this.config.username,
      password: this.config.password,
    };

    const stringifiedParams = stringify(params, "?");
    const url = `${this.apiUrl}/grant${stringifiedParams}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(
          () => ({}),
        ) as AuthErrorResponse;
        throw new Error(
          errorData.error_description ||
            `Authentication failed with status ${response.status}`,
        );
      }

      const credentials = await response.json() as AuthResponse;
      this.credentials = credentials;

      const secondsMargin = 10;
      this.credentialsExpiresAt = new Date(
        Date.now() + (credentials.expires_in - secondsMargin) * 1000,
      );

      return credentials;
    } catch (error: unknown) {
      console.log("there's an error");
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
