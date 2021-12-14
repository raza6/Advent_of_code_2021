const lineReader = require('line-reader');

let word;
let letterFreq = {};
let rules = [];

lineReader.eachLine('day14.input.txt', function(line, last) {
  if (line.includes('->')) {
    const [pattern, letter] = line.split(' -> ');
    rules.push({ pattern, letter });
  } else if (line !== '') {
    word = line;
  }

  if (last) {
    solve();
  }
});

function solve() {
  for (let step = 0; step < 10; step++) {
    for (let i = 0; i < word.length-1; i++) {
      const currentPair = word.slice(i, i+2);
      for (let rule of rules) {
        if (rule.pattern === currentPair) {
          word = word.slice(0, i+1) + rule.letter + word.slice(i+1);
          i += 1;
          break;
        }
      }
    }
  }

  for (let letr of word) {
    letterFreq[letr] ??= 0;
    letterFreq[letr]++;
  }

  const res = Math.max(...Object.values(letterFreq)) - Math.min(...Object.values(letterFreq));

  console.log('Result : ', res);
}
