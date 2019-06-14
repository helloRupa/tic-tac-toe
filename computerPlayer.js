class ComputerPlayer {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }

  getInput(reader, board) {
    return new Promise((resolve, reject) => {
      const empties = this.emptySpaces(board);
      const choice = Math.floor(Math.random() * empties.length);
      console.log(empties[choice]);
      resolve(empties[choice]);
    });
  }

  emptySpaces(board) {
    let spaces = [];

    board.board.forEach((row, y) => {
      row.forEach((space, x) => {
        if (space == null) spaces.push([y, x]);
      });
    });

    return spaces;
  }
}

module.exports = ComputerPlayer;
