// Copyright 2026 Higitotal, LDA. MIT License.
import { Products } from "./products/index.ts";
import { Base, InitConfig } from "./base.ts";
import { applyMixins } from "./utils.ts";
import { Users } from "./users/index.ts";
import { Company } from "./company/index.ts";
import { Entities } from "./entities/index.ts";
import { Documents } from "./documents/index.ts";
import { Settings } from "./settings/index.ts";
import { GlobalData } from "./globalData/index.ts";

class Moloni extends Base {
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
