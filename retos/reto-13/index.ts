// MEDIUM
// Reto 13: ¿ES UN PALÍNDROMO?

function limpiarTexto(texto: string): string {
  return texto
    .normalize('NFD')                         // Quita tildes
    .replace(/[\u0300-\u036f]/g, '')          // Remueve diacríticos
    .replace(/[^a-zA-Z0-9\s]/g, '')           // Remueve caracteres especiales
    .replace(/\s+/g, '')                      // Opcional: colapsa múltiples espacios
    .toLowerCase()                            // Convierte a minúsculas
    .trim();                                  // Quita espacios al inicio y final
}

export function solve(str:string): boolean {
  // TODO: implementar
  // 1. Eliminar espacios, signos de puntuación y tildes
  // 2. Convertir a minúsculas
  // 3. Comparar la cadena original con la invertida
  // 4. Retornar true o false
  const sanitazedText = limpiarTexto(str);
  return sanitazedText === sanitazedText.split('').reverse().join('');
}

if (import.meta.main) {
  // true
  console.log('True')
  console.log(solve("Ana lleva al oso la avellana."));
  console.log(solve("Amo la pacífica paloma."));
  console.log(solve("La ruta natural."));
  // false
  console.log('False')
  console.log(solve("La casa no es un palíndromo."));
  console.log(solve("La ruta no es natural."));
  console.log(solve("La ruta no es un palíndromo."));
}

/*
 * Escribe una función que reciba un texto y retorne verdadero o
 * falso (Boolean) según sean o no palíndromos.
 * Un Palíndromo es una palabra o expresión que es igual si se lee
  * de izquierda a derecha que de derecha a izquierda.
 * NO se tienen en cuenta los espacios, signos de puntuación y tildes.
 * Ejemplo: Ana lleva al oso la avellana.
 */
