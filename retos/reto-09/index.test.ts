import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 09: DECIMAL A BINARIO", () => {
  it(" ", () => {;
    expect(solve(10)).toBe("1010");
    expect(solve(0)).toBe("0");
    expect(solve(255)).toBe("11111111");
    expect(solve(1)).toBe("1");
    expect(solve(2)).toBe("10");
    expect(solve(3)).toBe("11");
    expect(solve(4)).toBe("100");
  });
});
