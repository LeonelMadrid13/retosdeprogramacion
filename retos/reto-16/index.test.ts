
        import { describe, it } from "jsr:@std/testing/bdd";
        import { expect } from "jsr:@std/expect";
        import { solve } from "./index.ts";

        describe("Reto 16: ¿CUÁNTOS DÍAS?", () => {
          it(" ", () => {
            const output = solve(9);
            expect(output[2]).toBe("Fizz");
          });
        })
