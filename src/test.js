let Ship = require("./ship");
let Gameboard = require("./gameboard");
let Player = require("./player");

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

describe("Gameboard Factory Test", () => {
  test("Place ship", () => {
    let mockShip = jest.fn((length, hits, sunk) => {
      return {
        length,
        hits,
        sunk,
      };
    });
    let testShip = mockShip(2, 0, false);
    let board = Gameboard();
    board.placeShip(testShip, ["A", 5, 6]);
    board.placeShip(testShip, [7, "A", "B"]);
    expect(board.A[5]).toBe(testShip);
    expect(board.A[6]).toBe(testShip);
    expect(board.A[7]).toBe(testShip);
    expect(board.B[7]).toBe(testShip);
    expect(board.B[8]).toBe(undefined);
  });
  test("Receive attack (hit)", () => {
    let mockShip = jest.fn((length, hits, sunk) => {
      return {
        length,
        hits,
        sunk,
        hit() {
          this.hits++;
        },
      };
    });
    let testShip = mockShip(2, 0, false);
    let board = Gameboard();
    board.placeShip(testShip, ["A", 5, 6]);

    board.receiveAttack(["A", 5]);
    expect(testShip.hits).toBe(1);
  });
  test("Receive attack (miss)", () => {
    let mockShip = jest.fn((length, hits, sunk) => {
      return {
        length,
        hits,
        sunk,
        hit() {
          this.hits++;
        },
      };
    });
    let testShip = mockShip(2, 0, false);
    let board = Gameboard();
    board.placeShip(testShip, ["A", 5, 6]);

    board.receiveAttack(["B", 5]);
    expect(testShip.hits).toBe(0);
    expect(board.misses[0]).toEqual(["B", 5]);
  });
  test("All sunk report", () => {
    let mockShip = jest.fn((length, hits, sunk) => {
      return {
        length,
        hits,
        sunk,
        hit() {
          this.hits++;
        },
        isSunk() {
          if (hits == length) {
            sunk = true;
            return true;
          } else {
            sunk = false;
            return false;
          }
        },
      };
    });
    let board = Gameboard();
    /* Bellow works as well:
    board.placeShip(mockShip(2, 1, false), ["A", 5, 6]);
    expect(board.allSunk()).toBe(false);
    */
    board.placeShip(mockShip(2, 2, true), ["A", 5, 6]);
    expect(board.allSunk()).toBe(true);
  });

  describe("Player Factory Test", () => {
    test("Real and computer players", () => {
      let tom = Player("real", Gameboard());
      expect(tom.type).toBe("real");
      let comp = Player("computer", Gameboard());
      expect(comp.type).toBe("computer");
    });
    test("Has own gameboard", () => {
      let test = Gameboard();
      let tom = Player("real", test);
      expect(tom.gameboard).toEqual(test);
    });
  });
});
