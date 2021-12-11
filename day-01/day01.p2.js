const lineReader = require('line-reader');

let allDepths = [];
let increasement = 0;

lineReader.eachLine('day01.input.txt', function(line, last) {
  allDepths.push(parseInt(line));

  if (last) {
    solve();
  }
});

function solve() {
  for (let i = 0; i < (allDepths.length-3); i++) {
    window1 = allDepths[i] + allDepths[i+1] + allDepths[i+2];
    window2 = allDepths[i+1] + allDepths[i+2] + allDepths[i+3];
    if (window1 < window2) {
      increasement++;
    }
  }
  
  console.log('Result : ', increasement);
}
