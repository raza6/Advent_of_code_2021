const lineReader = require('line-reader');

let lanternfish = [];
let fishStates = new Array(9).fill(0);

lineReader.eachLine('day06.input.txt', function(line, last) {
  lanternfish = line.split(',').map(n => parseInt(n));

  if (last) {
    solve();
  }
});

function solve() {
  for (fish of lanternfish) {
    fishStates[fish]++;
  }
  console.log(fishStates);
  for (let i = 0; i < 256; i++) {
    let newFishStates = new Array(9).fill(0);
    newFishStates[8] = fishStates[0];
    newFishStates[6] = fishStates[0];
    for (let j = 1; j <= 8; j++) {
      newFishStates[j-1] += fishStates[j];
    }

    fishStates = [...newFishStates];
  }

  console.log('Result : ', fishStates.reduce((acc, f) => acc + f, 0));
}
