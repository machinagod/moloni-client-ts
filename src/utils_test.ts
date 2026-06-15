// Copyright 2026 Higitotal, LDA. MIT License.

import { assertEquals, assertStrictEquals } from "std/assert/mod.ts";
import { applyMixins } from "./utils.ts";

Deno.test("applyMixins - copies prototype methods from base class to derived class", () => {
  class Base {
    greet(): string {
      return "Hello";
    }

    farewell(): string {
      return "Goodbye";
    }
  }

  class Derived {
    name = "Derived";
  }

  // Define interface for type safety in tests
  interface Derived extends Base {}

  applyMixins(Derived, [Base]);

  const instance = new Derived() as Derived;

  assertEquals(instance.greet(), "Hello");
  assertEquals(instance.farewell(), "Goodbye");
  assertEquals(instance.name, "Derived");
});

Deno.test("applyMixins - handles multiple base constructors", () => {
  class Movable {
    move(): string {
      return "Moving";
    }
  }

  class Jumpable {
    jump(): string {
      return "Jumping";
    }
  }

  class Swimmable {
    swim(): string {
      return "Swimming";
    }
  }

  class Character {
    name = "Hero";
  }

  // Define interface for type safety in tests
  interface Character extends Movable, Jumpable, Swimmable {}

  applyMixins(Character, [Movable, Jumpable, Swimmable]);

  const hero = new Character() as Character;

  assertEquals(hero.name, "Hero");
  assertEquals(hero.move(), "Moving");
  assertEquals(hero.jump(), "Jumping");
  assertEquals(hero.swim(), "Swimming");
});

Deno.test("applyMixins - copies property descriptors correctly (getters/setters)", () => {
  class WithAccessors {
    protected _value = 0;

    get value(): number {
      return this._value;
    }

    set value(v: number) {
      this._value = v * 2;
    }
  }

  class Target {
    protected _value = 0;
  }

  interface Target extends WithAccessors {}

  applyMixins(Target, [WithAccessors]);

  const instance = new Target() as Target;

  // Test that the getter/setter work correctly
  instance.value = 5;
  assertEquals(instance.value, 10); // setter multiplies by 2

  instance.value = 10;
  assertEquals(instance.value, 20);
});

Deno.test("applyMixins - preserves non-enumerable property descriptors", () => {
  class BaseWithDescriptors {}

  // Add a non-enumerable method
  Object.defineProperty(BaseWithDescriptors.prototype, "hiddenMethod", {
    value: function () {
      return "hidden";
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });

  class Target {}

  applyMixins(Target, [BaseWithDescriptors]);

  const descriptor = Object.getOwnPropertyDescriptor(
    Target.prototype,
    "hiddenMethod",
  );

  assertEquals(descriptor?.enumerable, false);
  assertEquals(descriptor?.writable, true);
  assertEquals(descriptor?.configurable, true);

  // deno-lint-ignore no-explicit-any
  const instance = new Target() as any;
  assertEquals(instance.hiddenMethod(), "hidden");
});

Deno.test("applyMixins - handles empty base constructors array", () => {
  class Derived {
    value = 42;
  }

  // Should not throw when given empty array
  applyMixins(Derived, []);

  const instance = new Derived();
  assertEquals(instance.value, 42);
});

Deno.test("applyMixins - later base constructors override earlier ones", () => {
  class First {
    method(): string {
      return "First";
    }
  }

  class Second {
    method(): string {
      return "Second";
    }
  }

  class Target {}

  interface Target extends First, Second {}

  applyMixins(Target, [First, Second]);

  const instance = new Target() as Target;

  // Second should override First since it comes later
  assertEquals(instance.method(), "Second");
});

Deno.test("applyMixins - copies constructor property from base class", () => {
  class Base {
    baseMethod(): string {
      return "base";
    }
  }

  class Derived {
    derivedMethod(): string {
      return "derived";
    }
  }

  applyMixins(Derived, [Base]);

  // The constructor property on prototype is copied from Base
  // This is a side effect of copying all prototype properties including 'constructor'
  // However, instantiation still uses the actual Derived constructor
  const instance = new Derived();

  // The prototype.constructor property is now Base (copied from Base.prototype)
  assertStrictEquals(Derived.prototype.constructor, Base);

  // But instance.constructor follows the prototype chain to Derived.prototype.constructor
  assertStrictEquals(instance.constructor, Base);

  // The instance is still actually a Derived instance
  assertEquals(instance instanceof Derived, true);
});

Deno.test("applyMixins - handles base class with only constructor (no additional methods)", () => {
  class EmptyBase {
    // Only has default constructor, no methods
  }

  class Target {
    value = "target";
  }

  // Should not throw
  applyMixins(Target, [EmptyBase]);

  const instance = new Target();
  assertEquals(instance.value, "target");
});

Deno.test("applyMixins - preserves read-only property descriptors", () => {
  class BaseWithReadOnly {}

  Object.defineProperty(BaseWithReadOnly.prototype, "readOnlyValue", {
    value: "constant",
    writable: false,
    enumerable: true,
    configurable: false,
  });

  class Target {}

  applyMixins(Target, [BaseWithReadOnly]);

  const descriptor = Object.getOwnPropertyDescriptor(
    Target.prototype,
    "readOnlyValue",
  );

  assertEquals(descriptor?.value, "constant");
  assertEquals(descriptor?.writable, false);
  assertEquals(descriptor?.configurable, false);
  assertEquals(descriptor?.enumerable, true);
});

Deno.test("applyMixins - methods can access 'this' context of derived instance", () => {
  class Nameable {
    getName(): string {
      // deno-lint-ignore no-explicit-any
      return (this as any).name;
    }
  }

  class Person {
    name = "Alice";
  }

  interface Person extends Nameable {}

  applyMixins(Person, [Nameable]);

  const person = new Person() as Person;

  assertEquals(person.getName(), "Alice");
});

Deno.test("applyMixins - handles Symbol property names", () => {
  const secretMethod = Symbol("secret");

  class BaseWithSymbol {}

  Object.defineProperty(BaseWithSymbol.prototype, secretMethod, {
    value: function () {
      return "secret value";
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });

  class Target {}

  // Note: applyMixins uses getOwnPropertyNames which doesn't include Symbols
  // This test verifies the current behavior - Symbols are NOT copied
  applyMixins(Target, [BaseWithSymbol]);

  const hasSymbol = Object.getOwnPropertySymbols(Target.prototype).includes(
    secretMethod,
  );
  assertEquals(hasSymbol, false); // Symbols are not copied by current implementation
});

Deno.test("applyMixins - handles methods with parameters", () => {
  class Calculator {
    add(a: number, b: number): number {
      return a + b;
    }

    multiply(a: number, b: number): number {
      return a * b;
    }
  }

  class MathHelper {}

  interface MathHelper extends Calculator {}

  applyMixins(MathHelper, [Calculator]);

  const helper = new MathHelper() as MathHelper;

  assertEquals(helper.add(2, 3), 5);
  assertEquals(helper.multiply(4, 5), 20);
});

Deno.test("applyMixins - falls back to {} when a name has no descriptor", () => {
  // Drive the `... || {}` fallback hermetically — no global monkey-patching
  // (which was non-deterministic under the parallel suite). A Proxy prototype
  // lists "ghost" via ownKeys, so getOwnPropertyNames sees it, but returns no
  // descriptor for it, so `getOwnPropertyDescriptor(...)` is undefined and the
  // empty-object fallback is taken. The invariant is legal: the target is an
  // extensible bare object with no own "ghost" property.
  const ghostProto = new Proxy(Object.create(null), {
    ownKeys: () => ["ghost"],
    getOwnPropertyDescriptor: () => undefined,
  });
  type Ctor = Parameters<typeof applyMixins>[0];
  const Base = (function GhostBase() {}) as unknown as Ctor;
  Base.prototype = ghostProto;

  class Target {}
  applyMixins(Target as unknown as Ctor, [Base]);

  // The fallback defined `ghost` on the target with an empty descriptor:
  // an own property whose value is undefined.
  assertEquals(
    Object.prototype.hasOwnProperty.call(Target.prototype, "ghost"),
    true,
  );
});
