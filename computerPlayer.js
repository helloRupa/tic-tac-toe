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

  emptySpaces(board = this.board) {
    let spaces = [];

    board.board.forEach((row, y) => {
      row.forEach((space, x) => {
        if (space == null) spaces.push([y, x]);
      });
    });

    return spaces;
  }

  choose() {
    let bestSpace;
    let bestScore = null;

    const empties = this.emptySpaces();

    if (empties.length === 9) {
      return this.randomSpace([[1, 1], [0, 0], [0, 2], [2, 0], [2, 2]]);
    }

    empties.forEach((coords => {
      let score = this.scoreSpace(coords);
      
      if (bestScore === null || (score > bestScore)) {
        bestScore = score;
        bestSpace = coords;
      }
    }));

    return bestSpace;
  }

  scoreSpace(pos, board = this.board, marker = this.marker, weight = 100) {
    const bcopy = new Board();
    bcopy.board = this.deepDup(board.board);
    bcopy.placeMark(pos, marker);
    
    if (bcopy.won()) {
      return (bcopy.winner() === this.marker) ? 1 * weight : -1 * weight;
    }

    let score = 0;
    marker = (marker === this.marker) ? this.oppMarker : this.marker;

    this.emptySpaces(bcopy).forEach((coords) => {
      score += this.scoreSpace(coords, bcopy, marker, weight / 2);
    });

    return score;
  }

  deepDup(arr) {
    if (!(arr instanceof Array)) return arr;
    return arr.map((el) => this.deepDup(el));
  }

  randomSpace(empties) {
    const choice = Math.floor(Math.random() * empties.length);
    return empties[choice];
  }
}

module.exports = ComputerPlayer;
