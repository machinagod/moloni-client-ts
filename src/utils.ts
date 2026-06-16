// Copyright 2026 Higitotal, LDA. MIT License.
/**
 * Mixin helper used to compose the {@linkcode Moloni} client.
 *
 * @module
 */

// Generic constructor type for mixin pattern
// deno-lint-ignore no-explicit-any
type Constructor = new (...args: any[]) => object;

/**
 * Copies the prototype methods of each base constructor onto a derived
 * constructor, implementing the TypeScript mixin pattern.
 *
 * Used to fold the endpoint-group classes (`Users`, `Products`, …) into the
 * single `Moloni` class so all endpoint methods live on one instance. The
 * `Moloni` class must also `implements`/`interface`-merge the same bases for
 * the types to line up.
 *
 * @param derivedCtor The class to receive the mixed-in methods.
 * @param baseCtors The classes whose prototype methods are copied over.
 * @see {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript mixins}
 */
export const applyMixins = (
  derivedCtor: Constructor,
  baseCtors: Constructor[],
): void => {
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
