// EASY
// Reto 07: INVIRTIENDO CADENAS

export function solve(str:string):string {
  // TODO: implementar
  return str.split("").reverse().join("");
}

if (import.meta.main) {
  console.log(solve("Hola mundo"));
}

/*
 * Crea un programa que invierta el orden de una cadena de texto
 * sin usar funciones propias del lenguaje que lo hagan de forma automática.
 * - Si le pasamos "Hola mundo" nos retornaría "odnum aloH"
 */

