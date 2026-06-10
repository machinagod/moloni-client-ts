// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
type SubscriptionRequest = {
  getOne: {
    params: {
      company_id: string | number;
    };
    response: Subscription;
  };
};

type Subscription = {
  subscription_id: number;
  company_id: number;
  plan_id: number;
  payment_mode: string;
  last_price: number;
  subscription_date: string;
  expire_date: string;
  paid: number;
  last_payment_date: string;
};

export type SubscriptionEndpoint = keyof SubscriptionRequest;
export type SubscriptionParams<T extends SubscriptionEndpoint> =
  SubscriptionRequest[T]["params"];
export type SubscriptionResponse<T extends SubscriptionEndpoint> =
  SubscriptionRequest[T]["response"];
