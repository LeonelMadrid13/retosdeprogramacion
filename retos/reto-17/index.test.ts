import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 17: EN MAYÚSCULA", () => {
  it("Change the first letter of the words to uppercase", () => {;
    expect(solve("hello world")).toBe("Hello World");
    expect(solve("hello world!")).toBe("Hello World!");
    expect(solve("hello world! how are you?")).toBe("Hello World! How Are You?");
  });
});
