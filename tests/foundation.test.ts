import { describe, expect, it } from "vitest";
import fc from "fast-check";

describe("foundation toolchain", () => {
  it("runs a basic unit test", () => {
    expect(2 + 2).toBe(4);
  });

  it("checks a basic fast-check property", () => {
    fc.assert(
      fc.property(fc.integer(), (value) => value + 0 === value),
    );
  });
});
