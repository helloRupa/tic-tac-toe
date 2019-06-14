const Game = require('./game');
const HumanPlayer = require('./humanPlayer');
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const player1 = new HumanPlayer('Bart', 'X');
const player2 = new HumanPlayer('Lisa', 'O');
let ttt = new Game(reader, player1, player2);

const completionCallback = () => {
  reader.question('Would you like to play again? ', (answer) => {
    if (answer === 'Y') {
      ttt = new Game(reader, player1, player2);
      ttt.run(completionCallback);
    } else {
      console.log('Goodbye');
      reader.close();
    }
  });
};


ttt.run(completionCallback);