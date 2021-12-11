const lineReader = require('line-reader');

let bits = [];
let bitWordLen;
let gammaCompute;
let gammaR = 0;
let espilonR = 0;


lineReader.eachLine('day03.input.txt', function(line, last) {
  bits.push(line);

  if (last) {
    bitWordLen = line.length;
    solve();
  }
});

function solve() {
  gammaCompute = new Array(bitWordLen).fill(0);
  for (let bit of bits) {
    for (let i = 0; i<bitWordLen; i++) {
      if (bit[i] === '1') {
        gammaCompute[i]++;
      }
    }
  }
  console.log(gammaCompute);


  for (let i = 0; i<bits.length; i++) {
    gammaR += gammaCompute[i] > (bits.length / 2) ? 2**(bitWordLen-1-i) : 0;
  }
  espilonR = gammaR ^ parseInt((new Array(bitWordLen).fill('1')).join(''), 2);

  console.log('Result : ', espilonR * gammaR);
}