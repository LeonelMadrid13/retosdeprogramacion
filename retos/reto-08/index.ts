// MEDIUM
// Reto 08: CONTANDO PALABRAS

export function solve(str: string): { [key: string]: number } {
  // TODO: implementar
  // 1. Eliminar signos de puntuación
  // 2. Convertir a minúsculas
  // 3. Separar las palabras
  // 4. Contar las palabras
  // 5. Mostrar el recuento final
  // 6. Retornar el número de palabras
  const punctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
  const words = str.replace(punctuation, "").toLowerCase().split(/\s+/);
  const wordCount: { [key: string]: number } = {};
  for (const word of words) {
    if (word) {
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    }
  }
  wordCount["total"] = words.length;
  return wordCount
}

if (import.meta.main) {
  console.log(solve("lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
}

/*
 * Crea un programa que cuente cuantas veces se repite cada palabra
 * y que muestre el recuento final de todas ellas.
 * - Los signos de puntuación no forman parte de la palabra.
 * - Una palabra es la misma aunque aparezca en mayúsculas y minúsculas.
 * - No se pueden utilizar funciones propias del lenguaje que
 *   lo resuelvan automáticamente.
 */
