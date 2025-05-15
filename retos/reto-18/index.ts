// MEDIUM
// Reto 18: LA CARRERA DE OBSTÁCULOS

type instruccionsType = "run" | "jump";

export function solve(instruccions: instruccionsType[], track: string): boolean {
  // TODO: implementar
  if (instruccions.length !== track.length) {
    console.log("El número de instrucciones no coincide con la longitud de la pista");
    return false;
  }
  const result = track.split("");
  for (let i = 0; i < instruccions.length; i++) {
    if (instruccions[i] === "run" && track[i] === "_") {
      result[i] = "_";
    } else if (instruccions[i] === "jump" && track[i] === "|") {
      result[i] = "|";
    } else if (instruccions[i] === "jump" && track[i] === "_") {
      result[i] = "x";
    } else if (instruccions[i] === "run" && track[i] === "|") {
      result[i] = "/";
    } else {
      console.log("Instrucción no válida");
      return false;
    }
  }
  console.log("Resultado de la pista: ", result.join(""));
  if (result.includes("x") || result.includes("/")) {
    console.log("El atleta no ha superado la carrera");
    return false;
  }
  console.log("El atleta ha superado la carrera");
  return true;
}

if (import.meta.main) {
  solve(["run", "jump", "run", "jump", "run", "jump", "run"], "_|_|_|_");
  solve(["run", "jump", "run", "jump", "run", "jump", "run", "jump", "run", "jump", "run"], "_|_|_|_|_|_");
}

/*
 * Crea una función que evalúe si un/a atleta ha superado correctamente una
 * carrera de obstáculos.
 * - La función recibirá dos parámetros:
 *      - Un array que sólo puede contener String con las palabras
 *        "run" o "jump"
 *      - Un String que represente la pista y sólo puede contener "_" (suelo)
 *        o "|" (valla)
 * - La función imprimirá cómo ha finalizado la carrera:
 *      - Si el/a atleta hace "run" en "_" (suelo) y "jump" en "|" (valla)
 *        será correcto y no variará el símbolo de esa parte de la pista.
 *      - Si hace "jump" en "_" (suelo), se variará la pista por "x".
 *      - Si hace "run" en "|" (valla), se variará la pista por "/".
 * - La función retornará un Boolean que indique si ha superado la carrera.
 * Para ello tiene que realizar la opción correcta en cada tramo de la pista.
 */
