// Copyright 2026 Higitotal, LDA. All rights reserved. Proprietary.
// Generic constructor type for mixin pattern
// deno-lint-ignore no-explicit-any
type Constructor = new (...args: any[]) => object;

export const applyMixins = (
  derivedCtor: Constructor,
  baseCtors: Constructor[],
) => {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || {},
      );
    });
  });
};
