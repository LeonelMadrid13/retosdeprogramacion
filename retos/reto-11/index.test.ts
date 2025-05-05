import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto 11: EXPRESIONES EQUILIBRADAS", () => {
  it("balanced expressions", () => {;
    // Test cases for balanced expressions
    expect(solve("{ [ a * ( c + d ) ] - 5 }")).toBe(true);
    expect(solve("{ a * ( c + d ) } - 5")).toBe(true);
    expect(solve("[{()}]")).toBe(true);

  });
  it("unbalanced expressions", () => {;
    // Test cases for imbalanced expressions
    expect(solve("{ a * ( c + d ) ] - 5 }")).toBe(false);
    expect(solve("{{}")).toBe(false);
    expect(solve("{ [ a * ( c + d ) ] - 5 } }")).toBe(false);
    expect(solve("{ [ a * ( c + d ) ] - 5 } {")).toBe(false);
    expect(solve("{ [ a * ( c + d ) ] - 5 } { [")).toBe(false);
  });
  it("empty expressions", () => {;
    // Test cases for empty expressions
    expect(solve("")).toBe(true);
    expect(solve("{}")).toBe(true);
    expect(solve("[]")).toBe(true);
    expect(solve("()")).toBe(true);
  });
  it("invalid characters", () => {
    // Test cases for invalid characters
    expect(solve("{ [ a * ( c + d ) ] - 5 } @")).toBe(true);
    expect(solve("{ [ a * ( c + d ) ] - 5 } #")).toBe(true);
    expect(solve("{ [ a * ( c + d ) ] - 5 } $")).toBe(true);
    expect(solve("{ [ a * ( c + d ) ] - 5 } %")).toBe(true);
  });
  it("nested expressions", () => {
    // Test cases for nested expressions
    expect(solve("{ [ ( ) ] }")).toBe(true);
    expect(solve("{ [ ( ) ] } { [ ( ) ] }")).toBe(true);
    expect(solve("{ [ ( ) ] } { [ ( ) ] } { [ ( ) ] }")).toBe(true);
    expect(solve("{ [ ( ) ] } { [ ( ) ] } { [ ( ) ] } { [ ( ) ] }")).toBe(true);
  });
  it("mixed expressions", () => {
    // Test cases for mixed expressions balanced and unbalanced
    expect(solve("{ [ ( ) ] } { [ ( ) ] } { [ ( ) ] } { [ ( ) ] } { [ ( ) ] }")).toBe(true);
    expect(solve("{  })")).toBe(false);
    expect(solve("{ [ ( ) ] } { [ ( ) ] } { [ ( ) ] } { [ ( ) ] } { [ ( ) ] } {  })")).toBe(false);
  });
  it("single character expressions", () => {
    // Test cases for single character expressions
    expect(solve("{")).toBe(false);
    expect(solve("}")).toBe(false);
    expect(solve("[")).toBe(false);
    expect(solve("]")).toBe(false);
    expect(solve("(")).toBe(false);
    expect(solve(")")).toBe(false);
  });
});
