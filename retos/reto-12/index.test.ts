import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 12: ELIMINANDO CARACTERES", () => {
  it(" ", () => {;
    expect(solve('Hello', 'World')).toEqual({ out1: ["H", "e"], out2: ["W", "r", "d"] });
    expect(solve('abc', 'def')).toEqual({ out1: ["a", "b", "c"], out2: ["d", "e", "f"] });
    expect(solve('abc', 'abc')).toEqual({ out1: [], out2: [] });
    expect(solve('abc', 'abcd')).toEqual({ out1: [], out2: ["d"] });
  });
});
