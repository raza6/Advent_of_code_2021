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
  const fold = folding[0];
  let folded = dots.map(dot => {
    if (dot[fold.axis] > fold.val) {
      dot[fold.axis] = Math.abs(dot[fold.axis] - (2*fold.val));
    }
    return {...dot};
  })

  folded = [...new Map(folded.map(v => [JSON.stringify(v), v])).values()];

  console.log('Result : ', folded.length);
}
