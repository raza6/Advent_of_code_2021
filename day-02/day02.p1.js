const lineReader = require('line-reader');

let commands = [];
currentPosition = {
  x: 0,
  d: 0,
}

lineReader.eachLine('day02.input.txt', function(line, last) {
  const el = line.split(' ');
  commands.push({ 
    move: el[0],
    val: parseInt(el[1])
  });

  if (last) {
    solve();
  }
});

function solve() {
  for (const command of commands) {
    if (command.move === 'forward') {
      currentPosition.x += command.val;
    } else if (command.move === 'down') {
      currentPosition.d += command.val;
    } else if (command.move === 'up') {
      currentPosition.d -= command.val;
    }
  }

  console.log('Result : ', currentPosition.x * currentPosition.d);
}
