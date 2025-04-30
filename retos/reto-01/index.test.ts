import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 01: Fizzbuzz", () => {
  it("Debería retornar 'Fizz' para múltiplos de 3", () => {
    const output = solve(9);
    expect(output[2]).toBe("Fizz");
    expect(output[5]).toBe("Fizz");
    expect(output[8]).toBe("Fizz");
  });

  it("Debería retornar 'Buzz' para múltiplos de 5", () => {
    const output = solve(25);
    expect(output[4]).toBe("Buzz");
    expect(output[9]).toBe("Buzz");
    expect(output[24]).toBe("Buzz");
  });

  it("Debería retornar 'FizzBuzz' para múltiplos de 3 y 5", () => {
    const output = solve(45);
    expect(output[14]).toBe("FizzBuzz");
    expect(output[29]).toBe("FizzBuzz");
    expect(output[44]).toBe("FizzBuzz");
  });

  it("Debería retornar el número mismo si no es múltiplo de 3 o 5", () => {
    const output = solve(4);
    expect(output[0]).toBe("1");
    expect(output[1]).toBe("2");
    expect(output[3]).toBe("4");
  });
})