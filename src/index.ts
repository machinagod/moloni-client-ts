// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Typed Deno client for the {@link https://www.moloni.pt/ | Moloni} (Portuguese
 * ERP / invoicing) REST API.
 *
 * The {@linkcode Moloni} default export composes every endpoint group —
 * {@linkcode Users}, {@linkcode Products}, {@linkcode Company},
 * {@linkcode Entities}, {@linkcode Documents}, {@linkcode Settings}, and
 * {@linkcode GlobalData} — onto a single class, so every endpoint is reachable
 * from one instance.
 *
 * @example Create a client and list products
 * ```ts
 * import Moloni from "@machinagod/moloni-client-ts";
 *
 * const client = new Moloni({
 *   clientId: Deno.env.get("MOLONI_CLIENT_ID")!,
 *   clientSecret: Deno.env.get("MOLONI_CLIENT_SECRET")!,
 *   username: Deno.env.get("MOLONI_USER")!,
 *   password: Deno.env.get("MOLONI_PASSWORD")!,
 * }).setCompanyId(123456);
 *
 * const products = await client.products("getAll");
 * ```
 *
 * @module
 */
import { Products } from "./products/index.ts";
import { Base, InitConfig } from "./base.ts";
import { applyMixins } from "./utils.ts";
import { Users } from "./users/index.ts";
import { Company } from "./company/index.ts";
import { Entities } from "./entities/index.ts";
import { Documents } from "./documents/index.ts";
import { Settings } from "./settings/index.ts";
import { GlobalData } from "./globalData/index.ts";

/**
 * The Moloni API client.
 *
 * A single class that exposes every endpoint group (users, products, company,
 * entities, documents, settings, and global data) through the mixin pattern.
 * Construct it with {@linkcode InitConfig} credentials, then call
 * {@linkcode Base.setCompanyId | setCompanyId} before issuing requests.
 *
 * @example
 * ```ts
 * const client = new Moloni(config).setCompanyId(123456);
 * const invoices = await client.invoices("getAll", { qty: 50 });
 * ```
 */
class Moloni extends Base {
  /**
   * @param conf Client credentials and options. See {@linkcode InitConfig}.
   */
  constructor(private conf: InitConfig) {
    super(conf);
  }
}
interface Moloni
  extends Users, Products, Company, Entities, Documents, Settings, GlobalData {}

applyMixins(Moloni, [
  Users,
  Products,
  Company,
  Entities,
  Documents,
  Settings,
  GlobalData,
]);

export default Moloni;
