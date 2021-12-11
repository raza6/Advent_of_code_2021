const lineReader = require('line-reader');

let segments = [];
const binToDigit = {
  119: '0',
  36: '1',
  93: '2',
  109: '3',
  46: '4',
  107: '5',
  123: '6',
  37: '7',
  127: '8',
  111: '9',
}

lineReader.eachLine('day08.input.txt', function(line, last) {
  [input, output] = line.split(' | ');
  segments.push({
    input: input.split(' '),
    output: output.split(' '),
  });

  if (last) {
    solve();
  }
});

function solve() {
  let res = 0;
  
  for (let segment of segments) {
    let decodedSegment = [...new Array(7)].map(() => ['a','b','c','d','e','f','g']);
    // Use 1, 4 and 7
    for (let word of segment.input) {
      switch (word.length) {
        case 2: // 1
          decodedSegment = pruneSegment(decodedSegment, word, [2, 5]);
          break;
        case 3: // 7
          decodedSegment = pruneSegment(decodedSegment, word, [0, 2, 5]);
          break;
        case 4: // 4
          decodedSegment = pruneSegment(decodedSegment, word, [1, 2, 3, 5]);
          break;
      }
    }

    // Use 2, 3 and 5
    const fiveSeg = segment.input.filter(v => v.length === 5);
    let commonFiveLetters = fiveSeg[0].split('').filter(l => fiveSeg[1].includes(l) && fiveSeg[2].includes(l));
    decodedSegment = pruneSegment(decodedSegment, commonFiveLetters.join(''), [0, 3, 6]);
    
    // Use 6 and 9
    const sixSegFiltered = segment.input
    .filter(v => v.length === 6)
    .filter(v => v
      .split('')
      .filter(v => !commonFiveLetters.includes(v)).length < 4)
    .map(v => v
      .split('')
      .filter(v => ![...decodedSegment
          .filter(v => v.length === 1)
          .map(v => v[0])
        ].includes(v))
      .join('')
    );
    let commonSixLetters = sixSegFiltered[0].split('').filter(v => sixSegFiltered[1].split('').includes(v));
    decodedSegment = pruneSegment(decodedSegment, commonSixLetters.join(''), [5]);

    // Decoded
    let reversedSegment = reverseSegment(decodedSegment);

    let currentOutput = '';
    for (let word of segment.output) {
      let wordBin = word.split('').reduce((acc, l) => acc + 2**reversedSegment[l], 0);
      currentOutput += binToDigit[wordBin];
    }

    res += parseInt(currentOutput);
  }
  console.log('Result : ', res);
}

function pruneSegment(resSegment, word, segments) {
  const letters = word.split('');
  const antiletters = ['a','b','c','d','e','f','g'].filter(d => !letters.includes(d));
  
  for (let i = 0; i < 7; i++) {
    if (segments.includes(i)) {
      resSegment[i] = resSegment[i].filter(d => letters.includes(d));
    } else {
      resSegment[i] = resSegment[i].filter(d => antiletters.includes(d));
    }
  }
  
  return resSegment;
}

function reverseSegment(segment) {
  let reversedSegment = {};
  for (let i = 0; i < segment.length; i++) {
    reversedSegment[segment[i][0]] = i;
  }
  return reversedSegment;
}