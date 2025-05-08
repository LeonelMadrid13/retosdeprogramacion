import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 14: FACTORIAL RECURSIVO", () => {
  it("Recursive Factorial", () => {;
    expect(solve(3)).toBe(6);
    expect(solve(5)).toBe(120);
    expect(solve(10)).toBe(3628800);
  });
});
