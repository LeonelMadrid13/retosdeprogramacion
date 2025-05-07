import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 13: ¿ES UN PALÍNDROMO?", () => {
  it("True palindromes", () => {;
    /** add those as test cases
      //true
        console.log(solve("Ana lleva al oso la avellana."));
        console.log(solve("Amo la pacífica paloma."));
        console.log(solve("La ruta natural."));
     */
    expect(solve("Ana lleva al oso la avellana.")).toBe(true);
    expect(solve("Amo la pacífica paloma.")).toBe(true);
    expect(solve("La ruta natural.")).toBe(true);
  });
  it("False palindromes", () => {
    /** add those as test cases
      //false
        console.log(solve("La casa no es un palíndromo."));
        console.log(solve("La ruta no es natural."));
        console.log(solve("La ruta no es un palíndromo."));
     */
    expect(solve("La casa no es un palíndromo.")).toBe(false);
    expect(solve("La ruta no es natural.")).toBe(false);
    expect(solve("La ruta no es un palíndromo.")).toBe(false);
  });
});
