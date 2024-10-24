import "./reset.css";
import "./style.css";
import "./player.js";
import hit_src from "./hitX.png";
import miss_src from "./missO.png";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";

let cruiser = Ship(5, 0, false);
let destroyer = Ship(3, 0, false);
let board = Gameboard();
board.placeShip(cruiser, ["A", 1, 2, 3, 4, 5]);
board.placeShip(destroyer, [7, "E", "F", "G"]);
let john = Player("human", board);
john.gameboard.receiveAttack(["A", 1]);
john.gameboard.receiveAttack(["A", 4]);
let comp = Player("computer", board);
comp.gameboard.receiveAttack(["B", 5]);

function updateDOM(player, comp) {
  for (let i = 0; i < 10; i++) {
    Object.keys(player.gameboard).forEach((key) => {
      if (/^[A-Z]$/.test(key)) {
        // This regex matches single uppercase letters
        let square = document.querySelector(
          "." + key + " .square:nth-child(" + (i + 1) + ")"
        );
        if (player.gameboard[key][i] != undefined) {
          square.classList.add("green");
          for (let j = 0; j < player.gameboard.hits.length; j++) {
            if (
              player.gameboard.hits[j][0] == key &&
              player.gameboard.hits[j][1] == i
            ) {
              square.classList.remove("green");
              square.classList.add("red");
            }
          }
        } else {
          square.classList.remove("green");
          square.classList.remove("red");
          square.innerHTML = "";
          for (let t = 0; t < player.gameboard.misses.length; t++) {
            if (
              player.gameboard.misses[t][0] == key &&
              player.gameboard.misses[t][1] == i
            ) {
              let dot = document.createElement("img");
              dot.src = miss_src;
              dot.alt = "Miss marker";
              dot.style.marginLeft = "5px";
              dot.style.marginTop = "5px";
              dot.style.height = "25px";
              dot.classList.add("missMarker");
              square.appendChild(dot);
            }
          }
        }
      }
    });
    Object.keys(comp.gameboard).forEach((key) => {
      if (/^[A-Z]$/.test(key)) {
        let square = document.querySelector(
          ".computer." + key + " .square:nth-child(" + (i + 1) + ")"
        );
        if (comp.gameboard[key][i] != undefined) {
          for (let j = 0; j < comp.gameboard.hits.length; j++) {
            if (
              comp.gameboard.hits[j][0] == key &&
              comp.gameboard.hits[j][1] == i
            ) {
              let cross = document.createElement("img");
              cross.src = hit_src;
              cross.alt = "Hit marker";
              cross.style.marginLeft = "5px";
              cross.classList.add("hitMarker");
              square.appendChild(cross);
            }
          }
        } else {
          square.classList.remove("green");
          square.classList.remove("red");
          square.innerHTML = "";
          for (let t = 0; t < comp.gameboard.misses.length; t++) {
            if (
              comp.gameboard.misses[t][0] == key &&
              comp.gameboard.misses[t][1] == i
            ) {
              let dot = document.createElement("img");
              dot.src = miss_src;
              dot.alt = "Miss marker";
              dot.style.marginLeft = "5px";
              dot.style.marginTop = "5px";
              dot.style.height = "25px";
              dot.classList.add("missMarker");
              square.appendChild(dot);
            }
          }
        }
      }
    });
  }
}

updateDOM(john, comp);

let randomize = document.querySelector("button");

randomize.addEventListener("mousedown", function () {
  randomize.classList.add("down");
});
randomize.addEventListener("mouseup", function () {
  randomize.classList.remove("down");
});
