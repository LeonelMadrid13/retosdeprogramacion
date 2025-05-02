import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 09: DECIMAL A BINARIO", () => {
  it(" ", () => {;
    expect(solve(10)).toBe("1010");
    expect(solve(0)).toBe("0");
    expect(solve(255)).toBe("11111111");
  });
});
