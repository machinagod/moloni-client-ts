// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { Base } from "../base.ts";
import {
  PriceClassesEndpoint,
  PriceClassesParams,
  PriceClassesResponse,
} from "./types/priceClasses.types.ts";
import {
  ProductCategoriesEndpoint,
  ProductCategoriesParams,
  ProductCategoriesResponse,
} from "./types/productCategories.types.ts";
import {
  ProductsEndpoint,
  ProductsParams,
  ProductsResponse,
} from "./types/products.types.ts";
import {
  ProductStocksEndpoint,
  ProductStocksParams,
  ProductStocksResponse,
} from "./types/productStocks.types.ts";

export class Products extends Base {
  products<T extends ProductsEndpoint>(
    request: T,
    params?: ProductsParams<T>,
  ): Promise<ProductsResponse<T>> {
    return this.request(`/products/${request}/`, params);
  }

  productCategories<T extends ProductCategoriesEndpoint>(
    request: T,
    params?: ProductCategoriesParams<T>,
  ): Promise<ProductCategoriesResponse<T>> {
    return this.request(`/productCategories/${request}/`, params);
  }

  productStocks<T extends ProductStocksEndpoint>(
    request: T,
    params?: ProductStocksParams<T>,
  ): Promise<ProductStocksResponse<T>> {
    return this.request(`/productStocks/${request}/`, params);
  }

  priceClasses<T extends PriceClassesEndpoint>(
    request: T,
    params?: PriceClassesParams<T>,
  ): Promise<PriceClassesResponse<T>> {
    return this.request(`/PriceClasses/${request}/`, params);
  }
}
