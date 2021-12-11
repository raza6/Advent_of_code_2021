const lineReader = require('line-reader');

let segments = [];

lineReader.eachLine('day08.input.txt', function(line, last) {
  [input, output] = line.split(' | ');
  segments.push({
    input: input.split(' '),
    output: output.split(' '),
  });

  if (last) {
    solve();
  }
});

function solve() {
  let res = 0;
  let digitsSeg = [2, 4, 3, 7];
  for (let segment of segments) {
    res += segment.output.filter(v => digitsSeg.includes(v.length)).length;
  }

  console.log('Result : ', res);
}