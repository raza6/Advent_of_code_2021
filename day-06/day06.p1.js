const lineReader = require('line-reader');

let lanternfish = [];
let toBeAdded = 0;

lineReader.eachLine('day6.input.txt', function(line, last) {
  lanternfish = line.split(',').map(n => parseInt(n));

  if (last) {
    solve();
  }
});

function solve() {
  console.log(lanternfish)
  for (let i = 0; i < 80; i++) {
    for (let j = 0; j < lanternfish.length; j++) {
      if (lanternfish[j] === 0) {
        lanternfish[j] = 6;
        toBeAdded++;
      } else {
        lanternfish[j]--;
      }
    }

    for (let j = 0; j < toBeAdded; j++) {
      lanternfish.push(8);
    }
    toBeAdded = 0;
  }

  console.log('Result : ', lanternfish.length);
}
