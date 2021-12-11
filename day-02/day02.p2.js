const lineReader = require('line-reader');

let commands = [];
currentPosition = {
  x: 0,
  d: 0,
  aim: 0,
}

lineReader.eachLine('day2.input.txt', function(line, last) {
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
      currentPosition.d += currentPosition.aim * command.val;
    } else if (command.move === 'down') {
      currentPosition.aim += command.val;
    } else if (command.move === 'up') {
      currentPosition.aim -= command.val;
    }
  }

  console.log('Result : ', currentPosition.x * currentPosition.d);
}
