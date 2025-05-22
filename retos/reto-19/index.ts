// HARD
// Reto 19: TRES EN RAYA

export function solve(matrix: string[][]): string {
  const flat = matrix.flat();
  const xCount = flat.filter((c) => c === "X").length;
  const oCount = flat.filter((c) => c === "O").length;
  const emptyCount = flat.filter((c) => c === "").length;

  // Reglas de proporción
  if (xCount < oCount || xCount - oCount > 1) return "Nulo";

  // Chequear líneas ganadoras
  const lines = [
    // Filas
    [matrix[0][0], matrix[0][1], matrix[0][2]],
    [matrix[1][0], matrix[1][1], matrix[1][2]],
    [matrix[2][0], matrix[2][1], matrix[2][2]],
    // Columnas
    [matrix[0][0], matrix[1][0], matrix[2][0]],
    [matrix[0][1], matrix[1][1], matrix[2][1]],
    [matrix[0][2], matrix[1][2], matrix[2][2]],
    // Diagonales
    [matrix[0][0], matrix[1][1], matrix[2][2]],
    [matrix[0][2], matrix[1][1], matrix[2][0]],
  ];

  const isWinner = (player: string) => lines.some(line => line.every(cell => cell === player));

  const xWins = isWinner("X");
  const oWins = isWinner("O");

  if (xWins && oWins) return "Nulo";
  if (xWins && xCount === oCount + 1) return "X";
  if (oWins && xCount === oCount) return "O";
  if (!xWins && !oWins && emptyCount === 0) return "Empate";

  return "Nulo";
}


if (import.meta.main) {
  console.log(solve([["X", "O", "X"], ["O", "X", ""], ["O", "", "O"]])); // Nulo (jugadores desbalanceados)
  console.log(solve([["X", "O", "X"], ["O", "X", ""], ["O", "", "X"]]));  // X (gana en diagonal)
  console.log(solve([["X", "X", "O"], ["O", "X", "O"], ["X", "", "O"]])); // O (gana en columna)
  console.log(solve([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]])); // Empate
  console.log(solve([["X", "X", "X"], ["O", "O", ""], ["", "", ""]])); // X
}


/*
 * Crea una función que analice una matriz 3x3 compuesta por "X" y "O"
 * y retorne lo siguiente:
 * - "X" si han ganado las "X"
 * - "O" si han ganado los "O"
 * - "Empate" si ha habido un empate
 * - "Nulo" si la proporción de "X", de "O", o de la matriz no es correcta.
 *   O si han ganado los 2.
 * Nota: La matriz puede no estar totalmente cubierta.
 * Se podría representar con un vacío "", por ejemplo.
 */
