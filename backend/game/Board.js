class Board {
  constructor(grid = ["", "", "", "", "", "", "", "", ""]) {
    this.grid = grid;
  }

  boardState(position) {
    return this.grid[position];
  }

  makeMove(position, symbol) {
    if (this.isMoveValid(position)) {
      this.grid[position] = symbol;
    }
    return this;
  }

  currentMark() {
    const xCount = this.grid.filter((mark) => mark === "X").length;
    const oCount = this.grid.filter((mark) => mark === "O").length;
    return xCount <= oCount ? "X" : "O";
  }

  defaultPositionState(position) {
    return this.grid[position];
  }

  isPositionTaken(position) {
    return this.grid[position] !== "";
  }

  isMoveValid(input) {
    return input >= 0 && input < 9 && !this.isPositionTaken(input);
  }

  markedBoardPositionValue(index) {
    return this.grid[index];
  }

  availablePositions() {
    return this.grid
      .map((val, index) => (val === "" ? index : null))
      .filter((val) => val !== null);
  }

  availablePositionCount() {
    return this.availablePositions().length;
  }

  isGameDraw() {
    return this.availablePositionCount() === 0 && !this.hasWinner();
  }

  isGameOver() {
    return this.isGameDraw() || this.hasWinner();
  }

  hasWinner() {
    const winningCombinations = this.rows().concat(
      this.columns(),
      this.diagonals()
    );
    return winningCombinations.some(
      (combination) =>
        combination.every((position) => position === "X") ||
        combination.every((position) => position === "O")
    );
  }

  rows() {
    return [
      [this.grid[0], this.grid[1], this.grid[2]],
      [this.grid[3], this.grid[4], this.grid[5]],
      [this.grid[6], this.grid[7], this.grid[8]],
    ];
  }

  columns() {
    return [
      [this.grid[0], this.grid[3], this.grid[6]],
      [this.grid[1], this.grid[4], this.grid[7]],
      [this.grid[2], this.grid[5], this.grid[8]],
    ];
  }

  diagonals() {
    return [
      [this.grid[0], this.grid[4], this.grid[8]],
      [this.grid[2], this.grid[4], this.grid[6]],
    ];
  }

  winningPlayer() {
    if (this.hasWinner()) {
      const winningCombination = this.rows()
        .concat(this.columns(), this.diagonals())
        .find(
          (combination) =>
            combination.every((position) => position === "X") ||
            combination.every((position) => position === "O")
        );
      return winningCombination[0];
    }
    return null;
  }

  getWinner() {
    if (this.hasWinner()) {
      const winningCombination = this.rows()
        .concat(this.columns(), this.diagonals())
        .find(
          (combination) =>
            combination.every((position) => position === "X") ||
            combination.every((position) => position === "O")
        );
      return winningCombination[0];
    }
    return null;
  }
}

export default Board;
