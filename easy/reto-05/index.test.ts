
        import { describe, it } from "jsr:@std/testing/bdd";
        import { expect } from "jsr:@std/expect";
        import { solve, Triangle, Rectangle, Square } from "./index.ts";

        describe("Reto 05: ÁREA DE UN POLÍGONO", () => {
          it("polygons", () => {
            expect(solve(new Triangle(10, 5))).toBe(25);
            expect(solve(new Square(4))).toBe(16);
            expect(solve(new Rectangle(4, 5))).toBe(20);
          });
        })
