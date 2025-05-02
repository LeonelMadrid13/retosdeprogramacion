// EASY
// Reto 09: DECIMAL A BINARIO

export function solve(dec:number): string {
  // TODO: implementar
  // Convertir el número decimal a binario
  // sin utilizar funciones propias del lenguaje que lo hagan directamente.
  if (dec > 0) {
    let binario = "";
    let num = dec;
    while (num > 0) {
      const residuo = num % 2;
      binario = residuo.toString() + binario;
      num = Math.floor(num / 2);
    }
    return binario;
  }
  return "0";
}

if (import.meta.main) {
  console.log(solve(10)); // 1010
  console.log(solve(0)); // 0
  console.log(solve(255)); // 11111111
}

/*
 * Crea un programa se encargue de transformar un número
 * decimal a binario sin utilizar funciones propias del lenguaje que lo hagan directamente.
 */
