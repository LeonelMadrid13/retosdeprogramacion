// MEDIUM
// Reto 04: ¿ES UN NÚMERO PRIMO?

export function solve(num: number): boolean {
  // TODO: implementar
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

if (import.meta.main) {
  console.log(solve(13));
  console.log(solve(4));
  console.log(solve(1));
  console.log(solve(0));
}

/*
 * Escribe un programa que se encargue de comprobar si un número es o no primo.
 * Hecho esto, imprime los números primos entre 1 y 100.
 */

