const lineReader = require('line-reader');

let crabPos = [];

lineReader.eachLine('day7.input.txt', function(line, last) {
  crabPos = line.split(',').map(p => parseInt(p));

  if (last) {
    solve();
  }
});

function solve() {
  let avgRaw = crabPos.reduce((acc, v) => {return acc + v}, 0)/crabPos.length;
  let avgLow = Math.floor(avgRaw);
  let avgHigh = Math.ceil(avgRaw);

  let res = Math.min(computeScore(avgLow), computeScore(avgHigh));

  console.log('Result : ', res);
}

function computeScore(target) {
  let score = 0;

  for (let i = 0; i < crabPos.length; i++) {
    let diff = (Math.max(target, crabPos[i]) - Math.min(target, crabPos[i]));
    score += (diff*(diff+1))/2;
  }

  return score;
}