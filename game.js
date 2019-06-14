const Board = require('./board');

class Game {
  constructor(reader, player1, player2) {
    this.reader = reader;
    this.board = new Board();
    this.player1 = player1;
    this.player2 = player2;
    this.playerTurn = player1;
  }

  async turn(callback) {
    console.log(`${this.playerTurn.name}, make your move!`);

    let response = await this.playerTurn.getInput(this.reader, this.board);

    const pos = (Array.isArray(response)) ? response : response.split(', ').map(num => parseInt(num, 10));

    if (this.board.placeMark(pos, this.playerTurn.marker)) {
      this.playerTurn = (this.playerTurn === this.player1) ? this.player2 : this.player1;
    } else {
      console.log('Invalid move!');
    }

    callback();
  }

  run(completionCallback) {
    this.board.print();

    if(this.board.won()) {
      console.log(`Congrats ${this.board.winner()}!`);
      completionCallback();
    } else if (this.board.isFull()) {
      console.log('Nobody wins, game is tied!');
      completionCallback();
    } else {
      this.turn(() => { this.run(completionCallback); });
    }
  }
}

module.exports = Game;
