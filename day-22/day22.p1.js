const lineReader = require('line-reader');

let initSteps = [];

lineReader.eachLine('day22.input.txt', function(line, last) {
  let [ _, on, xstart, xend, ystart, yend, zstart, zend ] = /(on|off)\sx=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/g.exec(line);
  initSteps.push({ on: on === 'on', xstart: +xstart, xend: +xend, ystart: +ystart, yend: +yend, zstart: +zstart, zend: +zend });

  if (last) {
    solve();
  }
});

function solve() {
  let area = [...new Array(101)].map(v => {return [...new Array(101)].map(v => {return [new Array(101)].fill(false)})});
  
  for (let step of initSteps) {
    if (step.xstart < -50 || step.xstart > 50) {
      break;
    }
    for (let x = step.xstart; x <= step.xend; x++) {
      for (let y = step.ystart; y <= step.yend; y++) {
        for (let z = step.zstart; z <= step.zend; z++) {
          area[x+50][y+50][z+50] = step.on;
        }
      }  
    }
  }

  console.log('Result : ', area.reduce((acc, v) => acc + v.reduce((acc, v) => acc + v.filter(v => v).length, 0), 0));
}
