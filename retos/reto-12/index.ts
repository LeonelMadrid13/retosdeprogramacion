// EASY
// Reto 12: ELIMINANDO CARACTERES

export function solve(str1:string, str2:string): Record<string, string[]> {
  // TODO: implementar
  const out1 = str1.split('').filter((char) => !str2.includes(char));
  const out2 = str2.split('').filter((char) => !str1.includes(char));
  return {out1, out2};
}

if (import.meta.main) {
  console.log(solve('Hello', 'World'));

}

/*
 * Crea una función que reciba dos cadenas como parámetro (str1, str2)
 * e imprima otras dos cadenas como salida (out1, out2).
 * - out1 contendrá todos los caracteres presentes en la str1 pero NO
 *   estén presentes en str2.
 * - out2 contendrá todos los caracteres presentes en la str2 pero NO
 *   estén presentes en str1.
 */
