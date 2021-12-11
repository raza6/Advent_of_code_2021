const lineReader = require('line-reader');

let heightMap = [];

lineReader.eachLine('day09.input.txt', function(line, last) {
  heightMap.push(line.split('').map(v => parseInt(v)));

  if (last) {
    solve();
  }
});

function solve() {
  let res = 0;

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      if(isLowPoint(i, j)) {
        res += 1+heightMap[i][j];
      }
    }
  }

  console.log('Result : ', res);
}

function isLowPoint(x, y) {
  const currentValue = heightMap[x][y];
  if (x > 0 && currentValue >= heightMap[x-1][y]) {
    return false;
  }
  if (y > 0 && currentValue >= heightMap[x][y-1]) {
    return false;
  }
  if (x < heightMap.length-1 && currentValue >= heightMap[x+1][y]) {
    return false;
  }
  if (y < heightMap[x].length-1 && currentValue >= heightMap[x][y+1]) {
    return false;
  }
  return true;
}
