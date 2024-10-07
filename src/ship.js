function Ship(length, hits, sunk) {
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
}

module.exports = Ship;
