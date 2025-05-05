// MEDIUM
// Reto 11: EXPRESIONES EQUILIBRADAS

export function solve(str: string): boolean {
  // TODO: implementar
  // implement binary search to check if the expression is balanced
  // 1. Create a stack to keep track of the opening brackets
  // 2. Iterate through the string
  // 3. If the character is an opening bracket, push it onto the stack
  // 4. If the character is a closing bracket, check if it matches the top of the stack
  // 5. If it matches, pop the top of the stack
  // 6. If it doesn't match, return false
  // 7. If the stack is empty at the end, return true
  // 8. If the stack is not empty, return false
  // 9. If the character is not in list of valid characters, return false
  // 10. If the last character is not a closing bracket that matches the current opening bracket, return false
  const validChars: Record<string, string> = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  let stack: string[] = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (validChars[char]) {
      stack.push(char);
    } else if (Object.values(validChars).includes(char)) {
      if (stack.length === 0) return false;
      const last = stack.pop();
      if (validChars[last!] !== char) return false;
    }
  }
  return stack.length === 0;
}

if (import.meta.main) {
  console.log(solve("{ [ a * ( c + d ) ] - 5 }"));
  console.log(solve("{ a * ( c + d ) ] - 5 }"));
  console.log(solve("[{()}]"));
  console.log(solve("{{}"));
}

/*
 * Crea un programa que comprueba si los paréntesis, llaves y corchetes
 * de una expresión están equilibrados.
 * - Equilibrado significa que estos delimitadores se abren y cieran
 *   en orden y de forma correcta.
 * - Paréntesis, llaves y corchetes son igual de prioritarios.
 *   No hay uno más importante que otro.
 * - Expresión balanceada: { [ a * ( c + d ) ] - 5 }
 * - Expresión no balanceada: { a * ( c + d ) ] - 5 }
 */
