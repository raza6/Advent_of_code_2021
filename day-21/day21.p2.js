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
  let res = firstTo21(p1pos, p2pos, 0, 0, true);

  console.log('Result : ', res);
}

//   │  Frequency
//   │
//   │
//   │
// 7 │           ┌┐
//   │        ┌┐ ││ ┌┐
// 6 │        ││ ││ ││
//   │        ││ ││ ││
// 3 │     ┌┐ ││ ││ ││ ┌┐
//   │     ││ ││ ││ ││ ││
// 1 │  ┌┐ ││ ││ ││ ││ ││ ┌┐
//   └──┴┴─┴┴─┴┴─┴┴─┴┴─┴┴─┴┴──────
//      3  4  5  6  7  8  9
//  Sum of three dirac dice rolls

diceThrows = [
  { res: 3, freq: 1 },
  { res: 4, freq: 3 },
  { res: 5, freq: 6 },
  { res: 6, freq: 7 },
  { res: 7, freq: 6 },
  { res: 8, freq: 3 },
  { res: 9, freq: 1 },
];

function firstTo21(p1pos, p2pos, p1score, p2score, p1play) {
  if (p1score >= 21) {
    return 1;
  }
  if (p2score >= 21) {
    return 0;
  }

  let victories = 0;
  for (let dice of diceThrows) {
    let newpos = p1play ? ((p1pos-1+dice.res) % 10)+1 : ((p2pos-1+dice.res) % 10)+1;
    if (p1play) {
      victories += dice.freq * firstTo21(newpos, p2pos, p1score + newpos, p2score, false);
    } else {
      victories += dice.freq * firstTo21(p1pos, newpos, p1score, p2score + newpos, true);
    }
  }
  return victories;
}