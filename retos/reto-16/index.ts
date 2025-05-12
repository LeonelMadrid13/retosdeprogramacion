// HARD
// Reto 16: ¿CUÁNTOS DÍAS?

/**
 * 
 * @param date1 string -> format dd/MM/yyyy
 * @param date2 string -> format dd/MM/yyyy
 * @returns number -> absolute number of days between date1 and date2
 */

export function solve(date1:string, date2:string): number {
  // TODO: implementar
  const Date1 = new Date(date1.split("/").reverse().join("/"));
  const Date2 = new Date(date2.split("/").reverse().join("/"));
  if (isNaN(Date1.getTime()) || isNaN(Date2.getTime())) {
    throw new Error("Invalid date format");
  }
  const timeDiff = Math.abs(Date2.getTime() - Date1.getTime());
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDiff;
}

if (import.meta.main) {
  console.log(solve("01/01/2020", "01/02/2020")); // 31
}

/*
 * Crea una función que calcule y retorne cuántos días hay entre dos cadenas
 * de texto que representen fechas.
 * - Una cadena de texto que representa una fecha tiene el formato "dd/MM/yyyy".
 * - La función recibirá dos String y retornará un Int.
 * - La diferencia en días será absoluta (no importa el orden de las fechas).
 * - Si una de las dos cadenas de texto no representa una fecha correcta se
 *   lanzará una excepción.
 */
