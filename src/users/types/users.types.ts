// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { MoloniError } from "../../types.ts";

type UsersRequest = {
  signUp: {
    params: {
      name: string;
      email: string;
      password: string;
      language_id: number;
      company: string;
      vat: string;
      slug: string;
      country_id: number;
    };
    response: {
      valid: number;
      user_id: number;
      company_id: number;
    };
  };
  recoverPassword: {
    params: {
      email: string;
    };
    response:
      | {
        valid: number;
      }
      | MoloniError;
  };
  updateMe: {
    params: {
      name: string;
      email: string;
      cellphone: string;
      language_id: number;
    };
    response:
      | {
        valid: 1;
      }
      | MoloniError;
  };
  getMe: {
    params: Record<PropertyKey, never>;
    response:
      | (User & {
        num_companies: number;
      })
      | MoloniError;
  };
  getAll: {
    params: {
      company_id: number;
    };
    response: User[];
  };
};

type User = {
  user_id: number;
  user_group_id: number;
  salesman_id: number;
  name: string;
  email: string;
  cellphone: string;
  language_id: number;
  language: {
    language_id: number;
    code: string;
    title: string;
  };
  registered_since: string;
  last_login: string;
};

export type UsersEndpoint = keyof UsersRequest;
export type UsersParams<T extends UsersEndpoint> = UsersRequest[T]["params"];
export type UsersResponse<T extends UsersEndpoint> =
  UsersRequest[T]["response"];
