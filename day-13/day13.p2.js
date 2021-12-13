const lineReader = require('line-reader');

let dots = [];
let folding = [];

lineReader.eachLine('day13.input.txt', function(line, last) {
  if (line.includes('fold')) {
    const [axis, val] = line.replace('fold along ', '').split('=');
    folding.push({ axis, val: parseInt(val)});
  } else if (line !== '') {
    const [x, y] = line.split(',').map(v => parseInt(v));
    dots.push({ x, y});
  }

  if (last) {
    solve();
  }
});

function solve() {
  for (const fold of folding) {
    dots = dots.map(dot => {
      if (dot[fold.axis] > fold.val) {
        dot[fold.axis] = Math.abs(dot[fold.axis] - (2*fold.val));
      }
      return {...dot};
    })
  
    dots = [...new Map(dots.map(v => [JSON.stringify(v), v])).values()];
  }

  const xmax = Math.max(...dots.map(v => v.x))+1;
  const ymax = Math.max(...dots.map(v => v.y))+1;

  let display = [...new Array(ymax)].map(() => new Array(xmax).fill('.'));
  for (let dot of dots) {
    display[dot.y][dot.x] = '#';
  }

  console.log('Result : ');
  for (let i = 0; i < display.length; i++) {
    console.log(display[i].join(''));
  }
}
