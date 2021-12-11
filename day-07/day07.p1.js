const lineReader = require('line-reader');

let crabPos = [];

lineReader.eachLine('day07.input.txt', function(line, last) {
  crabPos = line.split(',').map(p => parseInt(p));

  if (last) {
    solve();
  }
});

function solve() {
  crabPos.sort((a, b) => {return a - b});

  let halfIdx = Math.floor(crabPos.length / 2);
  let median = (crabPos[halfIdx-1] + crabPos[halfIdx])/2;

  let res = crabPos.reduce((acc, v) => acc += Math.abs(median - v), 0);

  console.log('Result : ', res);
}