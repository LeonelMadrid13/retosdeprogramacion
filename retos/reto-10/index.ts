// MEDIUM
// Reto 10: CÓDIGO MORSE

export function solve(morse:string ): string {
  // TODO: implementar
  const isMorse = (morse[0] === '.' || morse[0] === '-');
  const morseAlphabet: Record<string, string> = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--.."
  }
  if (isMorse) {
    const words: string[] = morse.split('  ');
    const letters: string[][] = words.map((word) => word.split(' '));
    const decoded = letters.map((letter) => {
      return letter.map((char) => {
        const decodedChar = Object.entries(morseAlphabet).find(([_, value]) => {
          return value === char;
        });
        if (decodedChar) {
          return decodedChar[0];
        }
        return '';
      })
    });
    return decoded.map((letter) => letter.join('')).join(' ');
  }
  // Si no es morse, entonces es texto natural
  morse = morse.toUpperCase();
  const words: string[] = morse.split(' ');
  const letters: string[][] = words.map((word) => word.split(''));
  const encoded = letters.map((letter) => {
    return letter.map((char) => {
      const decodedChar = Object.entries(morseAlphabet).find(([Key, _]) => {
        return Key === char;
      });
      if (decodedChar) {
        return decodedChar[1];
      }
      return '';
    })
  });
  return encoded.map((letter) => letter.join(' ')).join('  ');
}

if (import.meta.main) {
  console.log(solve(".... --- .-.. .-  -- ..- -. -.. ---"));
  console.log(solve("Hitshcock"));
}

/*
 * Crea un programa que sea capaz de transformar texto natural a código
 * morse y viceversa.
 * - Debe detectar automáticamente de qué tipo se trata y realizar
 *   la conversión.
 * - En morse se soporta raya "—", punto ".", un espacio " " entre letras
 *   o símbolos y dos espacios entre palabras "  ".
 * - El alfabeto morse soportado será el mostrado en
 *   https://es.wikipedia.org/wiki/Código_morse.
 */
