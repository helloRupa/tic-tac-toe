class Board {
  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  won() {
    return this.board.concat(this.buildColumns()).concat(this.buildDiagonals()).some(row => {
      const str = row.join('');
      return str === 'XXX' || str === 'OOO';
    });
  }

  buildDiagonals() {
    return [
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]]
    ];
  }

  buildColumns() {
    return this.board[0].reduce((accum, el, idx) => {
      let row = this.board.reduce((array, sub) => {
        array.push(sub[idx]);
        return array;
      }, []);

      accum.push(row);
      return accum;
    }, []);
  }

  winner() {
    let isX = this.board.concat(this.buildColumns()).concat(this.buildDiagonals()).some(row => {
      const str = row.join('');
      return str === 'XXX';
    });

    return (isX) ? 'X' : 'O';
  }

  isEmpty(pos) {
    return this.board[pos[0]][pos[1]] == null;
  }

  placeMark(pos, mark) {
    if(this.isEmpty(pos)) {
      this.board[pos[0]][pos[1]] = mark;
      return true;
    }

    return false;
  }

  isFull() {
    return !this.board.flat().some(el => el == null);
  }

  print() {
    this.board.forEach((row, idx) => {
      console.log(` ${row.map(el => el ? el : ' ').join(' | ')} `);
      if(idx !== 2) {
        console.log('-'.repeat(11));
      }
    });
  }
}

module.exports = Board;
