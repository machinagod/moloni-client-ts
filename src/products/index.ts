// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Products endpoint group for the Moloni API — product catalog, categories,
 * stock movements, and price classes.
 *
 * @module
 */
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

/**
 * Access to the Moloni product-related endpoint groups.
 *
 * Mixed into the {@linkcode Moloni} client; you normally reach these methods
 * through a `Moloni` instance rather than instantiating this class directly.
 *
 * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
 */
export class Products extends Base {
  /**
   * Calls the Moloni `/products/{request}/` endpoint to manage the product
   * catalog — listing, searching (by name, reference, or EAN), reading,
   * counting, and creating, updating, or deleting products.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  products<T extends ProductsEndpoint>(
    request: T,
    params?: ProductsParams<T>,
  ): Promise<ProductsResponse<T>> {
    return this.request(`/products/${request}/`, params);
  }

  /**
   * Calls the Moloni `/productCategories/{request}/` endpoint to manage the
   * tree of product categories used to organize the catalog.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  productCategories<T extends ProductCategoriesEndpoint>(
    request: T,
    params?: ProductCategoriesParams<T>,
  ): Promise<ProductCategoriesResponse<T>> {
    return this.request(`/productCategories/${request}/`, params);
  }

  /**
   * Calls the Moloni `/productStocks/{request}/` endpoint to read and record
   * stock movements and inventory levels for products that track stock.
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"insert"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  productStocks<T extends ProductStocksEndpoint>(
    request: T,
    params?: ProductStocksParams<T>,
  ): Promise<ProductStocksResponse<T>> {
    return this.request(`/productStocks/${request}/`, params);
  }

  /**
   * Calls the Moloni `/PriceClasses/{request}/` endpoint to manage price
   * classes (tiered price lists that can be assigned to products).
   *
   * @typeParam T The endpoint action, inferred from `request`.
   * @param request The action to perform (e.g. `"getAll"`, `"getOne"`,
   * `"insert"`, `"update"`, `"delete"`).
   * @param params Parameters for the chosen action; the accepted shape is
   * inferred from `request`.
   * @returns The action's response, typed according to `request`.
   * @see {@link https://www.moloni.pt/dev/ | Moloni API documentation}
   */
  priceClasses<T extends PriceClassesEndpoint>(
    request: T,
    params?: PriceClassesParams<T>,
  ): Promise<PriceClassesResponse<T>> {
    return this.request(`/PriceClasses/${request}/`, params);
  }
}
