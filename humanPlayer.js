class HumanPlayer {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }

  getInput(reader, board) {
    return new Promise((resolve, reject) => {
      reader.question('Choose a position for your marker: ', (answer) => {
        resolve(answer);
      });
    });
  }
}

module.exports = HumanPlayer;
