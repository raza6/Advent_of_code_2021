const lineReader = require('line-reader');

lines = [];
let validCharOpen = ['(', '[', '{', '<'];
let validChar = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

let charScore = {
  '' : 0,
  ')' : 1,
  ']' : 2,
  '}' : 3,
  '>' : 4,
}

lineReader.eachLine('day10.input.txt', function(line, last) {
  lines.push(line);

  if (last) {
    solve();
  }
});

function solve() {
  let scores = [];
  for (let line of lines) {
    let charFix = fixLine(line);
    if (charFix.length > 0) {
      let score = 0;
      for (let char of charFix) {
        score *= 5;
        score += charScore[char];
      }
      scores.push(score);
    }
  }

  let res = scores.sort((a, b) => a-b)[Math.floor(scores.length/2)];

  console.log('Result : ', res);
}

function fixLine(line) {
  let chars = line.split('');
  let chunkDel = [];
  for ( let char of chars) {
    if (validCharOpen.includes(char)) {
      chunkDel.push(char);
    } else {
      if (validChar[chunkDel[chunkDel.length-1]] === char) {
        chunkDel.pop(char);
      } else {
        chunkDel = [];
        break;
      }
    }
  }

  return chunkDel.reverse().map(v => validChar[v]);
}
