const lineReader = require('line-reader');

let bin = '';
let versions = [];

lineReader.eachLine('day16.test.input.txt', function(line, last) {
  if (line[0] !== '#') {
    for (let i = 0; i < line.length; i += 2) {
        bin += parseInt(line.substring(i, i+2), 16).toString(2).padStart(8, '0');
    }
  }

  if (last) {
    solve();
  }
});

function solve() {
  while (bin.length > 0) {
    let version = parseInt(bin.substring(0, 3), 2);
    versions.push(version);
    bin = bin.substring(3);
    let typeId = parseInt(bin.substring(0, 3), 2);
    bin = bin.substring(3);

    if (typeId === 4) {
      let end = false;
      while (!end) {
        end = bin.substring(0, 5)[0] === '0';
        bin = bin.substring(5);
      }
    } else {
      let opTypeId = parseInt(bin.substring(0, 1), 2);
      bin = bin.substring(1);
      if (opTypeId === 0) {
        bin = bin.substring(15);
      } else {
        bin = bin.substring(11);
      }
    }
  }

  console.log('Result : ', versions.reduce((acc, v) => acc + v, 0));
}
