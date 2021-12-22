const lineReader = require('line-reader');

let p1pos, p2pos;


lineReader.eachLine('day21.input.txt', function(line, last) {
  if (line[7] === '1') {
    p1pos = parseInt(line[line.length-1]);
  } else {
    p2pos = parseInt(line[line.length-1]);
  }

  if (last) {
    solve();
  }
});

function solve() {
  let dice = 1;
  let diceRolls = 0;
  let p1score = 0;
  let p2score = 0;
  let currentScore = 0;
  let newpos = 0;

  while (p1score < 1000 && p2score < 1000) {
    // check p1
    currentScore = 0;
    for (let i = 0; i < 3; i++) {
      currentScore += dice;
      dice++;
      dice = dice % 100;
      diceRolls++;
    }
    newpos = (p1pos + currentScore) % 10;
    p1pos = newpos === 0 ? 10 : newpos;
    p1score += p1pos;
    
    if (p1score >= 1000) {
      break;
    }
    
    // check p2
    currentScore = 0;
    for (let i = 0; i < 3; i++) {
      currentScore += dice;
      dice++;
      dice = dice % 100;
      diceRolls++;
    }
    newpos = (p2pos + currentScore) % 10;
    p2pos = newpos === 0 ? 10 : newpos;
    p2score += p2pos;
  }

  console.log('Result : ', diceRolls * Math.min(p1score, p2score));
}