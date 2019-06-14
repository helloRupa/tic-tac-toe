const Board = require('./board');

class Game {
  constructor(reader) {
    this.reader = reader;
    this.board = new Board();
  }

  run(completionCallback) {

  }
}

module.exports = Game;
