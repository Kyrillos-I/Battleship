function Gameboard() {
  return {
    A: new Array(10),
    B: new Array(10),
    C: new Array(10),
    D: new Array(10),
    E: new Array(10),
    F: new Array(10),
    G: new Array(10),
    H: new Array(10),
    I: new Array(10),
    J: new Array(10),
    misses: new Array(),

    placeShip(ship, array) {
      let hold = array[0];
      if (typeof hold == "string") {
        //Preform if first is string and rest are num
        for (let i = 1; i < array.length; i++) {
          for (let j = 0; j < this[hold].length; j++) {
            if (j == array[i]) {
              this[hold][j] = ship;
            }
          }
        }
      } else {
        //Preform if first is num and rest are letters
        for (let i = 1; i < array.length; i++) {
          let letter = array[i];
          this[letter][hold] = ship;
        }
      }
    },
    receiveAttack(array) {
      let hold = array[0];
      let num = array[1];
      if (this[hold][num] != undefined) {
        this[hold][num].hit();
      } else {
        this.misses.push(array);
      }
    },
    allSunk() {
      for (let i = 0; i < 10; i++) {
        if (this.A[i] != undefined) {
          if (this.A[i].isSunk() == false) {
            return false;
          }
        } else if (this.B[i] != undefined) {
          if (this.B[i].isSunk() == false) {
            return false;
          }
        } else if (this.C[i] != undefined) {
          if (this.C[i].isSunk() == false) {
            return false;
          }
        } else if (this.D[i] != undefined) {
          if (this.D[i].isSunk() == false) {
            return false;
          } else if (this.E[i] != undefined) {
            if (this.E[i].isSunk() == false) {
              return false;
            }
          } else if (this.F[i] != undefined) {
            if (this.F[i].isSunk() == false) {
              return false;
            } else if (this.G[i] != undefined) {
              if (this.G[i].isSunk() == false) {
                return false;
              }
            } else if (this.H[i] != undefined) {
              if (this.H[i].isSunk() == false) {
                return false;
              }
            } else if (this.I[i] != undefined) {
              if (this.I[i].isSunk() == false) {
                return false;
              }
            } else if (this.J[i] != undefined) {
              if (this.J[i].isSunk() == false) {
                return false;
              }
            }
          }
        }
      }
      return true;
    },
  };
}

export default Gameboard;
