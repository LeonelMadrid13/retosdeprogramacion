// EASY
// Reto 01: EL FAMOSO "FIZZ BUZZ"

export function solve(arg: number): string[] {
  const result: string[] = [];
  for (let i = 1; i <= arg; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i.toString()); // 👈 conversión explícita
  }
  return result;
}

if (import.meta.main) {
  console.log(solve(4));
}


/*
 * Escribe un programa que muestre por consola (con un print) los
 * números de 1 a 100 (ambos incluidos y con un salto de línea entre
 * cada impresión), sustituyendo los siguientes:
 * - Múltiplos de 3 por la palabra "fizz".
 * - Múltiplos de 5 por la palabra "buzz".
 * - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 */

