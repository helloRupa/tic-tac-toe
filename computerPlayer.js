const Board = require('./board');

class ComputerPlayer {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
    this.oppMarker = (marker === 'X') ? 'O' : 'X';
    this.board = null;
  }

  getInput(reader, board) {
    this.board = board;

    return new Promise((resolve, reject) => {
      const choice = this.choose();
      console.log(choice);
      resolve(choice);
    });
  }

  emptySpaces() {
    let spaces = [];

    this.board.board.forEach((row, y) => {
      row.forEach((space, x) => {
        if (space == null) spaces.push([y, x]);
      });
    });

    return spaces;
  }

  choose() {
    return this.findWin(this.marker) ||
      this.findWin(this.oppMarker) || 
      this.center() ||
      this.findCorner() ||
      this.randomSpace();
  }

  findWin(marker) {
    const deepDup = function (arr) {
      if (!(arr instanceof Array)) return arr;
      return arr.map((el) => deepDup(el));
    };

    const boardCopy = new Board();
    let pos;

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        boardCopy.board = deepDup(this.board.board);
        pos = [y, x];
        boardCopy.placeMark(pos, marker);
        if (boardCopy.won()) return pos;
      }
    }

    return null;
  }

  findCorner() {
    const neighbors = [
      [[0, 0], [0, 1], [1, 0]], 
      [[0, 2], [0, 1], [1, 2]], 
      [[2, 0], [1, 0], [2, 1]], 
      [[2, 2], [2, 1], [1, 2]]
    ];

    for (let i = 0; i < neighbors.length; i++) {
      if (this.board.isEmpty(neighbors[i][0])) {
        if (neighbors[i].slice(1).some(pos => this.board.board[pos[0]][pos[1]] === this.oppMarker)) {
          return neighbors[i][0];
        }
      }
    }

    return [[0, 0], [0, 2], [2, 0], [2, 2]].find(pos => this.board.isEmpty(pos));
  }

  center() {
    return (this.board.isEmpty([1, 1])) ? [1, 1] : null;
  }

  randomSpace() {
    const empties = this.emptySpaces();
    const choice = Math.floor(Math.random() * empties.length);
    return empties[choice];
  }
}

module.exports = ComputerPlayer;
