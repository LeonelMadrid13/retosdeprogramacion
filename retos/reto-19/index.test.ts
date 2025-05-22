import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 19: TRES EN RAYA", () => {
  it("TIC TAC TOE", () => {;
    expect(solve([["X", "O", "X"], ["O", "X", ""], ["O", "", "O"]])).toBe('Nulo'); // Nulo (jugadores desbalanceados)
    expect(solve([["X", "O", "X"], ["O", "X", ""], ["O", "", "X"]])).toBe("X");  // X (gana en diagonal)
    expect(solve([["X", "X", "O"], ["O", "X", "O"], ["X", "", "O"]])).toBe("O"); // O (gana en columna)
    expect(solve([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]])).toBe("Empate"); // Empate
    expect(solve([["X", "X", "X"], ["O", "O", ""], ["", "", ""]])).toBe("X"); // X
  });
});
