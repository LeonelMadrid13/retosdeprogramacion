import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 02: ¿ES UN ANAGRAMA?", () => {
  it("anagramas", () => {
    expect(solve("roma", "amor")).toBe(true);
    expect(solve("roma", "amores")).toBe(false);
    expect(solve("Roma", "amor")).toBe(true);
    expect(solve("Roma", "amores")).toBe(false);
    expect(solve("roma", "Amor")).toBe(true);
    expect(solve("roma", "Amores")).toBe(false);
  });
  it("palabras iguales", () => {
    expect(solve("roma", "roma")).toBe(false);
    expect(solve("Roma", "Roma")).toBe(false);
    expect(solve("a", "a")).toBe(false);
    expect(solve(" ", " ")).toBe(false);
  });
  it("palabras vacías", () => {
    expect(solve("", "")).toBe(false);
    expect(solve(" ", "")).toBe(false);
    expect(solve("", " ")).toBe(false);
    expect(solve(" ", "  ")).toBe(false);
    expect(solve(" ", "a")).toBe(false);
    expect(solve("a", " ")).toBe(false);
  });
  it("palabras con mayúsculas", () => {
    expect(solve("Roma", "amor")).toBe(true);
    expect(solve("Roma", "amores")).toBe(false);
    expect(solve("roma", "Amor")).toBe(true);
  });
  it("no anagramas", () => {
    expect(solve("roma", "amore")).toBe(false);
    expect(solve("roma", "amores")).toBe(false);
    expect(solve("roma", "amore")).toBe(false);
    expect(solve("roma", "amores")).toBe(false);
    expect(solve("roma", "amore")).toBe(false);
  });
  it("Palabras con espacios", () => {
    expect(solve("roma", " a m o r")).toBe(true);
    expect(solve("roma", " a m o r e s")).toBe(false);
  });
});

