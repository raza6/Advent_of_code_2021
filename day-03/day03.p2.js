const lineReader = require('line-reader');

let bits = [];
let bitWordLen;
let o2;
let co2;

lineReader.eachLine('day03.input.txt', function(line, last) {
  bits.push(line);

  if (last) {
    bitWordLen = line.length;
    solve();
  }
});

function solve() {
  //O2
  let candidatesBitsO2 = [...bits];
  let candidatesBitsCO2 = [...bits];
  for (let i = 0; i < bitWordLen; i++) {
    let onePresence = 0;
    for (let candidate of candidatesBitsO2) {
      if (candidate[i] === '1') {
        onePresence++;
      }
    }

    if (onePresence >= (candidatesBitsO2.length / 2)) {
      candidatesBitsO2 = candidatesBitsO2.filter(candidate => candidate[i] === '1');
    } else {
      candidatesBitsO2 = candidatesBitsO2.filter(candidate => candidate[i] === '0');
    }

    if (candidatesBitsO2.length === 1) {
      o2 = candidatesBitsO2[0];
      break;
    }
  }

  //CO2
  for (let i = 0; i < bitWordLen; i++) {
    let zeroPresence = 0;
    for (let candidate of candidatesBitsCO2) {
      if (candidate[i] === '0') {
        zeroPresence++;
      }
    }

    if (zeroPresence <= (candidatesBitsCO2.length / 2)) {
      candidatesBitsCO2 = candidatesBitsCO2.filter(candidate => candidate[i] === '0');
    } else {
      candidatesBitsCO2 = candidatesBitsCO2.filter(candidate => candidate[i] === '1');
    }

    if (candidatesBitsCO2.length === 1) {
      co2 = candidatesBitsCO2[0];
      break;
    }
  }

  console.log(o2, co2);
  let o2val = o2.split('').reduce((acc, v, i) => acc += v === '1' ? 2**(bitWordLen-1-i) : 0, 0);
  let co2val = co2.split('').reduce((acc, v, i) => acc += v === '1' ? 2**(bitWordLen-1-i) : 0, 0);

  console.log('Result : ', o2val * co2val);
}