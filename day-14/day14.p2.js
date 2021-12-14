const lineReader = require('line-reader');

let pairs = {};
let letterFreq = {};
let rules = [];

lineReader.eachLine('day14.input.txt', function(line, last) {
  if (line.includes('->')) {
    const [pattern, letter] = line.split(' -> ');
    rules.push({ pattern, letter });
  } else if (line !== '') {
    for (let i = 0; i < line.length-1; i++) {
      pairs[line.slice(i, i+2)] ??= 0;
      pairs[line.slice(i, i+2)]++;
    }
    for (let i = 0; i < line.length; i++) {
      letterFreq[line[i]] ??= 0;
      letterFreq[line[i]]++;
    }
  }

  if (last) {
    solve();
  }
});

function solve() {
  for (let step = 0; step < 40; step++) {
    let newPair = {};
    for (let rule of rules) {
      const nb = pairs[rule.pattern];
      if (nb) {
        const leftP = rule.pattern[0] + rule.letter;
        const rightP = rule.letter + rule.pattern[1];
        newPair[leftP] ??= 0;
        newPair[rightP] ??= 0;
        newPair[leftP] += nb;
        newPair[rightP] += nb;
        letterFreq[rule.letter] ??= 0;
        letterFreq[rule.letter] += nb;
      }
    }
    pairs = newPair;
  }

  const res = Math.max(...Object.values(letterFreq)) - Math.min(...Object.values(letterFreq));

  console.log('Result : ', res);
}
