
        import { describe, it } from "jsr:@std/testing/bdd";
        import { expect } from "jsr:@std/expect";
        import { solve } from "./index.ts";

        describe("Reto 13: ¿ES UN PALÍNDROMO?", () => {
          it(" ", () => {
            const output = solve(9);
            expect(output[2]).toBe("Fizz");
          });
        })
