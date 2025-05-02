import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 08: CONTANDO PALABRAS", () => {
  it(" ", () => {
    const str = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const solution = solve(str);
    expect(solution["lorem"]).toBe(1);
    expect(solution["ipsum"]).toBe(1);
    expect(typeof solution).toBe(typeof {});
    expect(solution["total"]).toBe(69);
  });
});
