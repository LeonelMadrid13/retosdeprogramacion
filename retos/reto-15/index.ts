// EASY
// Reto 15: ¿ES UN NÚMERO DE ARMSTRONG?

export function solve(num:number): boolean {
  // TODO: implementar
  const originalNum = num;
  let sum = 0;
  const Power = String(num).length;
  while (num > 0){
    const digit = num % 10;
    sum += Math.pow(digit, Power);
    num = Math.floor(num / 10);
  }
  return sum === originalNum;
}

if (import.meta.main) {
  console.log(solve(153)); // true
  console.log(solve(370)); // true
  console.log(solve(371)); // true
  console.log(solve(9474)); // true
  console.log(solve(150)) // false
}

/*
 * Escribe una función que calcule si un número dado es un número de Armstrong
 * (o también llamado narcisista).
 * Si no conoces qué es un número de Armstrong, debes buscar información
 * al respecto.
 */
