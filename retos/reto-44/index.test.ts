
        import { describe, it } from "jsr:@std/testing/bdd";
        import { expect } from "jsr:@std/expect";
        import { solve } from "./index.ts";

        describe("Reto 44: TRUCO O TRATO", () => {
          it(" ", () => {
            const output = solve(9);
            expect(output[2]).toBe("Fizz");
          });
        })
