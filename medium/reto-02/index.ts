// MEDIUM
// Reto 02: ¿ES UN ANAGRAMA?

export function solve(word1: string, word2: string): boolean {
  // TODO: implementar
  // Convertir las palabras a minúsculas y eliminar espacios
  const normalizedWord1 = word1.toLowerCase().replace(/\s+/g, '');
  const normalizedWord2 = word2.toLowerCase().replace(/\s+/g, '');


  // Si las palabras son iguales después de normalizarlas, no son anagramas
  // ver si word1 o word2 estan vacías despues de normalizarlas
  // Si las longitudes son diferentes, no pueden ser anagramas
  if ((!normalizedWord1 || !normalizedWord2) || (normalizedWord1.length !== normalizedWord2.length) || (normalizedWord1 === normalizedWord2)) {
    return false;
  }

  // Contar la frecuencia de cada letra en ambas palabras
  const charCount1: Record<string, number> = {};
  const charCount2: Record<string, number> = {};
  for (const char of normalizedWord1) {
    charCount1[char] = (charCount1[char] || 0) + 1;
  }
  for (const char of normalizedWord2) {
    charCount2[char] = (charCount2[char] || 0) + 1;
  }
  // Comparar las frecuencias de cada letra
  for (const char in charCount1) {
    if (charCount1[char] !== charCount2[char]) {
      return false;
    }
  }
  // Si todas las frecuencias coinciden, son anagramas
  return true;
}

if (import.meta.main) {
  console.log(solve('roma', 'amor')); // true
  console.log(solve('roma', 'amores')); // false
  console.log(solve('Roma', ' a m o r ')); // true
}

/*
 * Escribe una función que reciba dos palabras (String) y retorne
 * verdadero o falso (Bool) según sean o no anagramas.
 * - Un Anagrama consiste en formar una palabra reordenando TODAS
 *   las letras de otra palabra inicial.
 * - NO hace falta comprobar que ambas palabras existan.
 * - Dos palabras exactamente iguales no son anagrama.
 */

