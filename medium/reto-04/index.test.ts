
        import { describe, it } from "jsr:@std/testing/bdd";
        import { expect } from "jsr:@std/expect";
        import { solve } from "./index.ts";

        describe("Reto 04: ¿ES UN NÚMERO PRIMO?", () => {
          it(" ", () => {
            expect(solve(13)).toBe(true);
            expect(solve(4)).toBe(false);
            expect(solve(1)).toBe(false);
            expect(solve(0)).toBe(false);
            expect(solve(2)).toBe(true);
            expect(solve(3)).toBe(true);
            expect(solve(5)).toBe(true);
          });
        })