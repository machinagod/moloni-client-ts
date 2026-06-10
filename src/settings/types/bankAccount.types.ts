// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type BankAccountRequest = {
  getAll: {
    params: {
      company_id?: number;
    };
    response: BankAccount[];
  };
};

export interface BankAccount {
  bank_account_id: number;
  name: string;
  bank_name: string;
  account_number: string;
  swift: string;
  iban: string;
  lastmodifiedby: string;
  lastmodified: string;
}

export type BankAccountEndpoint = keyof BankAccountRequest;
export type BankAccountParams<T extends BankAccountEndpoint> =
  BankAccountRequest[T]["params"];
export type BankAccountResponse<T extends BankAccountEndpoint> =
  BankAccountRequest[T]["response"];
