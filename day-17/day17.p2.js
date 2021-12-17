const lineReader = require('line-reader');

target = {};

lineReader.eachLine('day17.input.txt', function(line, last) {
  const [_, x1, x2, y1, y2] = /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/g.exec(line);
  target = { x1: parseInt(x1), x2: parseInt(x2), y1: parseInt(y1), y2: parseInt(y2)};

  if (last) {
    solve();
  }
});

function solve() {
  let validConditions = 0;

  const limitUpVy = (Math.abs(target.y1) * (Math.abs(target.y1)-1))/2;
  const limitDownVy = -Math.abs(target.y1);
  const limitUpVx = Math.abs(target.x2+1);
  const limitDownVx = 0;

  for (let vx = limitDownVx; vx <= limitUpVx; vx++) {
    for (let vy = limitDownVy; vy <= limitUpVy; vy++) {
      let x = 0;
      let y = 0;
      let currentvx = vx;
      let currentvy = vy;
      while (x < target.x2 && y > target.y1) {
        x += currentvx;
        y += currentvy;
        currentvx = currentvx === 0 ? 0 : currentvx-1;
        currentvy--;
        if (x <= target.x2 && x >= target.x1 && y >= target.y1 && y <= target.y2) {
          validConditions++;
          break;
        }
      }
    }
  }

  console.log('Result : ', validConditions);
}
