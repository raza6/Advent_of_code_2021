const lineReader = require('line-reader');

let boardCounter = -1;
let lineBoardCounter = 0;
let tempBoard;
let firstLine = true;
let drawnNumbers = [];
let bingoBoards = [];

lineReader.eachLine('day4.input.txt', function(line, last) {
  if (firstLine) {
    drawnNumbers = line.split(',').map(n => parseInt(n))
    firstLine = false;
  } else {
    if (line === '') {
      boardCounter++;
      lineBoardCounter = 0;
      tempBoard = [];
    } else {
      tempBoard[lineBoardCounter] = line.split(/\s+/g).filter(n => n !== '').map(n => parseInt(n));
      lineBoardCounter++;
      if (lineBoardCounter === 4) {
        bingoBoards[boardCounter] = tempBoard;
      } 
    }
  }

  if (last) {
    solve();
  }
});

function solve() {
  // console.log(bingoBoards);
  // console.log(drawnNumbers);

  let res;

  solve:
  for (let currentNumber of drawnNumbers) {
    for (let i = 0; i < bingoBoards.length; i++) {
      markBoards(i, currentNumber)
  
      if (checkWin(i)) {
        let remaining = 0;
        for (let ii = 0; ii < bingoBoards[i].length; ii++) {
          for (let ij = 0; ij < bingoBoards[i][ii].length; ij++) {
            if (bingoBoards[i][ii][ij] !== null) {
              remaining += bingoBoards[i][ii][ij];
            }
          }
        }
        res = currentNumber * remaining;
        break solve;
      }
    }
  }

  console.log('Result : ',res);
}

function markBoards(idx, markedNumber) {
  for (let ii = 0; ii < bingoBoards[idx].length; ii++) {
    for (let ij = 0; ij < bingoBoards[idx][ii].length; ij++) {
      if (bingoBoards[idx][ii][ij] === markedNumber) {
        bingoBoards[idx][ii][ij] = null;
        break;
      }
    }
  }
  // console.log(markedNumber, bingoBoards[idx]);
}

function checkWin(idx) {
  for (let ii = 0; ii < bingoBoards[idx].length; ii++) {
    if (bingoBoards[idx][ii].every(n => n === null)) {
      return true;
    }
    if (bingoBoards[idx].map(c => c[ii]).every(n => n === null)) {
      return true;
    }
  }
  return false;
}