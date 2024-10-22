import "./reset.css";
import "./style.css";
import "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";

let cruiser = Ship(5, 0, false);
let destroyer = Ship(3, 0, false);
let board = Gameboard();
board.placeShip(cruiser, ["A", 1, 2, 3, 4, 5]);
board.placeShip(destroyer, [7, "E", "F", "G"]);
let john = Player("human", board);

function updateDOM(player, comp) {
  for (let i = 0; i < 10; i++) {
    Object.keys(player.gameboard).forEach((key) => {
      if (/^[A-Z]$/.test(key)) {
        // This regex matches single uppercase letters
        if (player.gameboard[key][i] != undefined) {
          let square = document.querySelector(
            "." + key + " .square:nth-child(" + (i + 1) + ")"
          );
          square.classList.add("green");
        }
      }
    });
  }
}

updateDOM(john, null);

let randomize = document.querySelector("button");

randomize.addEventListener("mousedown", function () {
  randomize.classList.add("down");
});
randomize.addEventListener("mouseup", function () {
  randomize.classList.remove("down");
});
