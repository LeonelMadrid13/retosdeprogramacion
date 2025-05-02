
        import { describe, it } from "jsr:@std/testing/bdd";
        import { expect } from "jsr:@std/expect";
        import { solve } from "./index.ts";

        describe("Reto 07: INVIRTIENDO CADENAS", () => {
          it("palabras y numeros", () => {
            expect(solve("Hola mundo")).toEqual("odnum aloH");
            expect(solve("key")).toEqual("yek");
            expect(solve("1234567890")).toEqual("0987654321");
          });
        })
