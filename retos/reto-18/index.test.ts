import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 18: LA CARRERA DE OBSTÁCULOS", () => {
  it(" ", () => {;
    expect(solve(["run", "jump", "run", "jump", "run", "jump", "run"], "_|_|_|_")).toBe(true);
    // more test cases different combinations of instructions and track
    expect(solve(["run", "jump", "run", "jump", "run", "jump", "run", "jump", "run", "jump", "run"], "_|_|_|_|_|_")).toBe(true);
    expect(solve(["run", "jump", "run", "jump", "run"], "_|_|_|")).toBe(false);
    expect(solve(["jump", "run", "jump", "run", "jump"], "_|_|_|_")).toBe(false);
    expect(solve(["run", "run", "jump", "jump"], "_|_|_|_")).toBe(false);
    expect(solve(["run", "jump"], "_|_|_|_")).toBe(false);
    expect(solve(["jump", "jump"], "_|_|_|_")).toBe(false);
    expect(solve(["run"], "_|_|_|_")).toBe(false);
    expect(solve(["jump"], "_|_|_|_")).toBe(false);
  });
});
