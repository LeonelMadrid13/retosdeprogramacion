import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 10: CÓDIGO MORSE", () => {
  it("words to morse", () => {;
    expect(solve("Hola mundo")).toBe(".... --- .-.. .-  -- ..- -. -.. ---");
    expect(solve("Hitshcock")).toBe(".... .. - ... .... -.-. --- -.-. -.-");
  });
  it("morse to words", () => {
    expect(solve(".... --- .-.. .-  -- ..- -. -.. ---")).toBe("HOLA MUNDO");
    expect(solve(".... .. - ... .... -.-. --- -.-. -.-")).toBe("HITSHCOCK");
  });
});
