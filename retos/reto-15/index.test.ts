import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 15: ¿ES UN NÚMERO DE ARMSTRONG?", () => {
  it("ARMSTRONG number of diferent number of digits", () => {;
    expect(solve(153)).toBe(true); // true
    expect(solve(370)).toBe(true); // true
    expect(solve(371)).toBe(true); // true
    expect(solve(9474)).toBe(true); // true
    expect(solve(150)).toBe(false) // false
  });
});
