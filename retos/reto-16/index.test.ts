import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 16: ¿CUÁNTOS DÍAS?", () => {
  it("positive number of difference", () => {;
    expect(solve("01/01/2020", "06/01/2020")).toBe(5);
    expect(solve("01/01/2020", "01/02/2020")).toBe(31);
    expect(solve("01/01/2020", "01/03/2020")).toBe(60);
    expect(solve("01/01/2020", "01/01/2021")).toBe(366);
  });
  it("negative number of difference", () => {
    expect(solve("06/01/2020", "01/01/2020")).toBe(5);
    expect(solve("01/02/2020", "01/01/2020")).toBe(31);
    expect(solve("01/03/2020", "01/01/2020")).toBe(60);
    expect(solve("01/01/2021", "01/01/2020")).toBe(366);
  });
});
