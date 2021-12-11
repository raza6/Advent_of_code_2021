const lineReader = require('line-reader');

let prevDepth = Number.POSITIVE_INFINITY;
let increasement = 0;

lineReader.eachLine('day01.input.txt', function(line, last) {
  currentDepth = parseInt(line);
  if (currentDepth > prevDepth) {
    increasement++;
  }
  prevDepth = currentDepth; 
  if(last) {
    console.log('Result : ', increasement);
  }
});