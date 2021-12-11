const lineReader = require('line-reader');

let ventMap = [...new Array(1000)].map(() => new Array(1000).fill(0));
let dangerousPoints = 0;

lineReader.eachLine('day05.input.txt', function(line, last) {
  let match = /(\d+),(\d+)\s+->\s+(\d+),(\d+)/g.exec(line);
  let x1 = match[1];
  let y1 = match[2];
  let x2 = match[3];
  let y2 = match[4];

  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      ventMap[x1][y]++;
      if (ventMap[x1][y] === 2) {
        dangerousPoints++;
      }
    }
  } else if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      ventMap[x][y1]++;
      if (ventMap[x][y1] === 2) {
        dangerousPoints++;
      }
    }
  } else if (Math.abs((y2-y1)/(x2-x1)) === 1) {
    let slope = (y2-y1)/(x2-x1) === 1;
    let pointToPlace = Math.abs(x1 - x2)+1;
    for (let i = 0; i < pointToPlace; i++) {
      let x = slope ? Math.min(x1,x2)+i : Math.max(x1,x2)-i;
      let y = Math.min(y1,y2)+i;
      ventMap[x][y]++;
      if (ventMap[x][y] === 2) {
        dangerousPoints++;
      }
    }
  }

  if (last) {
    solve();
  }
});

function solve() {
  // console.table(ventMap);

  console.log('Result : ', dangerousPoints);
}
