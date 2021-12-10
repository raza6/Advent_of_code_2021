const lineReader = require('line-reader');

lines = [];
let validCharOpen = ['(', '[', '{', '<'];
let validChar = {
  '(': ')',
  '[': ']',
  '<': '>',
  '{': '}',
}

let illegalCharScore = {
  '' : 0,
  ')' : 3,
  ']' : 57,
  '}' : 1197,
  '>' : 25137,
}

lineReader.eachLine('day10.input.txt', function(line, last) {
  lines.push(line);

  if (last) {
    solve();
  }
});

function solve() {
  let res = 0;
  for (let line of lines) {
    res += illegalCharScore[isCorruptedLine(line)];
  }

  console.log('Result : ', res);
}

function isCorruptedLine(line) {
  let chars = line.split('');
  let chunkDel = [];
  let illegalChar = '';
  for ( let char of chars) {
    if (validCharOpen.includes(char)) {
      chunkDel.push(char);
    } else {
      if (validChar[chunkDel[chunkDel.length-1]] === char) {
        chunkDel.pop(char);
      } else {
        illegalChar = char;
        //console.log('WARN', char, 'should have been', validChar[chunkDel[chunkDel.length-1]]);
        break;
      }
    }
  }
  return illegalChar;
}
