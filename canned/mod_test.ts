// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
import { assertEquals, assertThrows } from "std/assert/mod.ts";
import { loadCannedResponse } from "./mod.ts";

Deno.test("loadCannedResponse returns a registered fixture", async () => {
  const rows = await loadCannedResponse<unknown[]>("companies", "getAll");
  assertEquals(Array.isArray(rows), true);
});

Deno.test("loadCannedResponse throws for an unregistered fixture", () => {
  assertThrows(
    () => loadCannedResponse("nope", "missing"),
    Error,
    "No canned response for nope/missing",
  );
});
