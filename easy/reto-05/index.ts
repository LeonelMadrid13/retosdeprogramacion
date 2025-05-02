// EASY
// Reto 05: ÁREA DE UN POLÍGONO
export class Triangle {
  constructor(public base: number, public height: number) {}
  area() {
    return (this.base * this.height) / 2;
  }
}
export class Square {
  constructor(public side: number) {}
  area() {
    return this.side ** 2;
  }
}
export class Rectangle {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
}

type Polygon = Triangle | Square | Rectangle;

export function solve(polygon: Polygon) {
  // TODO: implementar
  switch (polygon.constructor.name) {
    case "Triangle":
      return polygon.area();
    case "Square":
      return polygon.area();
    case "Rectangle":
      return polygon.area();
    default:
      throw new Error("Unknown polygon type");
  }
}

if (import.meta.main) {
  console.log(solve(new Triangle(10, 5)));
  console.log(solve(new Square(4)));
  console.log(solve(new Rectangle(4, 5)));
}

/*
 * Crea una única función (importante que sólo sea una) que sea capaz
 * de calcular y retornar el área de un polígono.
 * - La función recibirá por parámetro sólo UN polígono a la vez.
 * - Los polígonos soportados serán Triángulo, Cuadrado y Rectángulo.
 * - Imprime el cálculo del área de un polígono de cada tipo.
 */

