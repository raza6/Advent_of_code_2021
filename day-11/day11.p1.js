const lineReader = require('line-reader');

let octopuses = [];
let flashCounter = 0;

lineReader.eachLine('day11.input.txt', function(line, last) {
  octopuses.push(line.split('').map(v => {
    return { 
      energy: parseInt(v), 
      hasFlashed: false,
    }
  }));

  if (last) {
    solve();
  }
});

function solve() {
  for (let step = 0; step < 100; step++) {
    nextStep();
  }
  
  console.log('Result : ', flashCounter);
}

function nextStep() {
  for (let i = 0; i < octopuses.length; i++) {
    for (let j = 0; j < octopuses[i].length; j++) {
      octopuses[i][j].energy++;
    }
  }

  for (let i = 0; i < octopuses.length; i++) {
    for (let j = 0; j < octopuses[i].length; j++) {
      if (octopuses[i][j].energy > 9 && !octopuses[i][j].hasFlashed) {
        flashExpand(i, j);
      }
    }
  }

  for (let i = 0; i < octopuses.length; i++) {
    for (let j = 0; j < octopuses[i].length; j++) {
      octopuses[i][j].hasFlashed = false;
      if (octopuses[i][j].energy > 9) {
        octopuses[i][j].energy = 0;
      }
    }
  }
}

function flashExpand(x, y) {
  octopuses[x][y].hasFlashed = true;
  flashCounter++;
  for (let cases of mooreNeighbourhood(x, y)) {
    const { x: xmoore, y: ymoore} = cases;
    octopuses[xmoore][ymoore].energy++;
    if (octopuses[xmoore][ymoore].energy > 9 && !octopuses[xmoore][ymoore].hasFlashed) {
      flashExpand(xmoore, ymoore);
    }
  }
}

function mooreNeighbourhood(x, y, maxlen = 9) {
  mooreNeighbours = [];

  for (let xx = Math.max(0, x-1); xx <= Math.min(x+1, maxlen); xx++) {
    for (let yy = Math.max(0, y-1); yy <= Math.min(y+1, maxlen); yy++) {
      if (xx !== x || yy !== y) {
        mooreNeighbours.push({ x: xx, y: yy });
      }
    }
  }

  return mooreNeighbours;
}