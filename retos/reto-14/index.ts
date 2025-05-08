// EASY
// Reto 14: FACTORIAL RECURSIVO

export function solve(arg:number): number {
  // TODO: implementar
  // el cálculo del factorial de forma recursiva
  // el factorial de un número n es n * (n-1)!
  while(arg !== 1){
    return solve(arg - 1) * arg;
  }
  return 1;
}

if (import.meta.main) {
  console.log(solve(3));
  console.log(solve(5));
}

/*
 * Escribe una función que calcule y retorne el factorial de un número dado
 * de forma recursiva.
 */
