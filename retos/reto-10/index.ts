// MEDIUM
// Reto 10: CÓDIGO MORSE

function morseDecoderEncoder(morse: string, isMorse:boolean): string {
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
  morse = morse.toUpperCase();
  const words: string[] = !isMorse ? morse.split(' '): morse.split('  ');
  const letters: string[][] = words.map((word) => {
    return !isMorse ? word.split('') : word.split(' ');
  });
  const code = letters.map((letter) => {
    return letter.map((char) => {
      const decodedChar = Object.entries(morseAlphabet).find(([Key, _]) => {
        if (isMorse) {
          return _ === char;
        }
        return Key === char;
      });
      if (decodedChar) {
        return isMorse ? decodedChar[0] : decodedChar[1];
      }
      return '';
    })
  });
  return !isMorse ? code.map((letter) => letter.join(' ')).join('  ') : code.map((letter) => letter.join('')).join(' ');
}

export function solve(morse:string ): string {
  // TODO: implementar
  const isMorse = (morse[0] === '.' || morse[0] === '-');
  return morseDecoderEncoder(morse, isMorse);
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
