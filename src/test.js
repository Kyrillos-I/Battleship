let Ship = require("./ship");

describe("Ship Factory Test", () => {
  test("Accurate length", () => expect(Ship(10, 1, false).length).toBe(10));
  test("Accurate hits", () => expect(Ship(10, 1, false).hits).toBe(1));
  test("Accurate sunk status", () =>
    expect(Ship(5, 1, false).sunk).toBe(false));
  test("Hit FUNCTION", () => {
    let example = Ship(5, 1, false);
    example.hit();
    expect(example.hits).toBe(2);
  });
  test("Sunk FUNCTION false", () =>
    expect(Ship(5, 3, false).isSunk()).toBe(false));
  test("Sunk FUNCTION true", () =>
    expect(Ship(5, 5, false).isSunk()).toBe(true));
});
