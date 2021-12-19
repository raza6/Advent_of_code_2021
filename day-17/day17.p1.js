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
  // Considering y pos depends only on y, discard x
  // y pos and |speed| on the way up and down are the same as it is a discrete paraboloid
  // To max vy we want y to hit the lower bound of the area right after reaching second y=0 
  // Meaning the distance between second y=0 and the next hit is |lowest_bound|
  // As y will accelerate downward by 1, the speed at second y=0 should be |lowest_bound|-1
  // Speed at first y=0 and second y=0 are the same => best vy0 is |lowest_bound|-1
  // Top height is the sum of integer from n=0 to best vy0

  //           │
  //           │
  //    ymax   │           +
  //           │         +   +
  //           │       +       +
  //           │
  //           │     +           +
  //           │
  //           │
  //           │
  //           │   +                +
  //           │
  //           │
  //           │
  //           │
  //           │+                     +
  //    y = 0  ├──────────────────────────────
  //           │
  //           │
  //           │
  //           │
  //           │
  //           │
  //           │                  ┌─────────────┐
  //           │                  │             │
  //           │                  │             │
  //           │                  │             │
  //  lbound   │                  └────+────────┘


  console.log('Result : ', (Math.abs(target.y1) * (Math.abs(target.y1)-1))/2);
}
