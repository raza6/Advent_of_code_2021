const lineReader = require('line-reader');

let algostr;
let img = [];
let first = true;

lineReader.eachLine('day20.input.txt', function(line, last) {
  if (line !== '') {
    if (first) {
      algostr = line.replaceAll('#', '1').replaceAll('.', '0');
      first = false;
    } else {
      img.push(line.replaceAll('#', '1').replaceAll('.', '0').split(''));
    }
  }

  if (last) {
    solve();
  }
});

function expandImg(inputImg, filler = '0') {
  let outputImg = [];
  for (let i = 0; i < 2; i++) {
    outputImg.push([...new Array(inputImg.length + 4).fill(filler)]);
  }
  for (let i = 0; i < inputImg.length; i++) {
    outputImg.push([filler,filler].concat(inputImg[i].concat([filler,filler])));
  }
  for (let i = 0; i < 2; i++) {
    outputImg.push([...new Array(inputImg.length + 4).fill(filler)]);
  }
  return outputImg;
}

function solve() {
  for (let i = 0; i < 50; i++) {
    img = enhanceImg(expandImg(img, i % 2 === 0 ? '0' : '1')); // remove ternary for test
  }

  console.log('Result : ', img.reduce((acc, v) => acc + v.filter(c => c === '1').length, 0));
}

function enhanceImg(inputImg) {
  let outputImg = [];
  for (let i = 1; i < inputImg.length-1; i++) {
    outputImg.push([]);
    for (let j = 1; j < inputImg[0].length-1; j++) {
      let currentVal = inputImg[i-1][j-1] + inputImg[i-1][j] + inputImg[i-1][j+1] + inputImg[i][j-1] + inputImg[i][j] + inputImg[i][j+1] + inputImg[i+1][j-1] + inputImg[i+1][j] + inputImg[i+1][j+1];
      outputImg[i-1].push(algostr[parseInt(currentVal, 2)]);
    }
  }

  return outputImg;
}
