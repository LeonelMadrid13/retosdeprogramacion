// HARD
// Reto 03: LA SUCESIÓN DE FIBONACCI

export function solve(arg: number): number[] {
  // TODO: implementar
  const fib: number[] = [0, 1, 1];
  for (let i = 3; i < arg; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}

if (import.meta.main) {
  console.log(solve(50));
}

/*
 * Escribe un programa que imprima los 50 primeros números de la sucesión
 * de Fibonacci empezando en 0.
 * - La serie Fibonacci se compone por una sucesión de números en
 *   la que el siguiente siempre es la suma de los dos anteriores.
 *   0, 1, 1, 2, 3, 5, 8, 13...
 */

