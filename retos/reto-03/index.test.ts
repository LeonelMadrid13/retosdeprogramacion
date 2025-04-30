
        import { describe, it } from "jsr:@std/testing/bdd";
        import { expect } from "jsr:@std/expect";
        import { solve } from "./index.ts";

        describe("Reto 03: LA SUCESIÓN DE FIBONACCI", () => {
          it("FIBONACCI 4", () => {
            const output = solve(4);
            expect(output[0]).toBe(0);
            expect(output[1]).toBe(1);
            expect(output[2]).toBe(1);
            expect(output[3]).toBe(2);
          });
          it("FIBONACCI 50", () => {
            const output = solve(50);
            expect(output[49]).toBe(7778742049);
            expect(output[29]).toBe(514229);
          });
        })
