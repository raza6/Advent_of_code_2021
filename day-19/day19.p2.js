const lineReader = require('line-reader');

let unmappedScanners = [];
let scannerId = -1;
let scannerPos = [];

lineReader.eachLine('day19.input.txt', function(line, last) {
  if (line.startsWith('--')) {
    scannerId++;
    unmappedScanners[scannerId] = [];
  } else if (line !== '') {
    const [x, y, z] = line.split(',').map(v => parseInt(v));
    unmappedScanners[scannerId].push({ x, y, z});
  }

  if (last) {
    solve();
  }
});

function solve() {
  let sbase = unmappedScanners.shift();
  scannerPos[0] = { x: 0, y: 0, z: 0 };

  while (unmappedScanners.length > 0) {
    for (let scanIdx = 0; scanIdx < unmappedScanners.length; scanIdx++) {
      let currentScan = unmappedScanners[scanIdx];
      // console.log('currentScan', scanIdx, 'of', unmappedScanners.length);
      // try to find a variation that is mappable to sbase
      for (let varScan of getAllVariations(currentScan)) {
        let pos = getScanPosInBase(sbase, varScan);
        // if a scan is mappable to sbase:
        // add all beacon to sbase with respect to sbase system, remove scan from unmmaped, no need to test other variations
        if (pos) {
          // console.log('merging', pos);
          mergeIntoBase(sbase, varScan, pos);
          unmappedScanners.splice(scanIdx, 1);
          scannerPos.push(pos);
          break;
        }
      }
    }
  }

  let maxDist = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < scannerPos.length; i++) {
    for (let j = i+1; j < scannerPos.length; j++) {
      let s1 = scannerPos[i];
      let s2 = scannerPos[j];
      let manDist = Math.abs(s1.x - s2.x) + Math.abs(s1.y - s2.y) + Math.abs(s1.z - s2.z);
      if (manDist > maxDist) {
        maxDist = manDist;
      }
    }
  }

  console.log('Result : ', maxDist);
}

function mergeIntoBase(base, scan, pos) {
  for (let i = 0; i < scan.length; i++){
    let newPos = {
      x: scan[i].x + pos.x,
      y: scan[i].y + pos.y,
      z: scan[i].z + pos.z
    }
    if (!base.some(b => b.x === newPos.x && b.y === newPos.y && b.z === newPos.z)) {
      base.push(newPos);
    }
  }
}

function getScanPosInBase(base, scan) {
  let translations = {};
  for (let i = 0; i < base.length; i++) {
    for (let j = 0; j < scan.length; j++) {
      let translation = {
        x: base[i].x - scan[j].x, 
        y: base[i].y - scan[j].y, 
        z: base[i].z - scan[j].z, 
      }
      let hash = `${translation.x},${translation.y},${translation.z}`;
      translations[hash] ??= { t: translation, n: 0 };
      translations[hash].n++;
    } 
  }

  let match;
  for (let translationHash in translations) {
    if (translations[translationHash].n >= 12) {
      match = translations[translationHash].t;
      break;
    }
  }
  return match;
}

function getAllVariations(scan) {
  let allVar = [];
  for (let varRef of varRefs) {
    let currentScanVar = [];
    for (let s of scan) {
      currentScanVar.push(
        {
          x: s[varRef.cx] * (varRef.cxsign ? 1 : -1),
          y: s[varRef.cy] * (varRef.cysign ? 1 : -1),
          z: s[varRef.cz] * (varRef.czsign ? 1 : -1)
        }
      );
    }
    allVar.push(currentScanVar);
  }
  return allVar;
}

const varRefs = [
  {cx: 'x', cxsign: true, cy: 'y', cysign: true, cz: 'z', czsign: true},
  {cx: 'x', cxsign: true, cy: 'y', cysign: false, cz: 'z', czsign: false},
  {cx: 'x', cxsign: true, cy: 'z', cysign: true, cz: 'y', czsign: false},
  {cx: 'x', cxsign: true, cy: 'z', cysign: false, cz: 'y', czsign: true},

  {cx: 'x', cxsign: false, cy: 'y', cysign: false, cz: 'z', czsign: true},
  {cx: 'x', cxsign: false, cy: 'y', cysign: true, cz: 'z', czsign: false},
  {cx: 'x', cxsign: false, cy: 'z', cysign: true, cz: 'y', czsign: true},
  {cx: 'x', cxsign: false, cy: 'z', cysign: false, cz: 'y', czsign: false},

  {cx: 'y', cxsign: true, cy: 'x', cysign: true, cz: 'z', czsign: false},
  {cx: 'y', cxsign: true, cy: 'x', cysign: false, cz: 'z', czsign: true},
  {cx: 'y', cxsign: true, cy: 'z', cysign: true, cz: 'x', czsign: true},
  {cx: 'y', cxsign: true, cy: 'z', cysign: false, cz: 'x', czsign: false},

  {cx: 'y', cxsign: false, cy: 'x', cysign: true, cz: 'z', czsign: true},
  {cx: 'y', cxsign: false, cy: 'x', cysign: false, cz: 'z', czsign: false},
  {cx: 'y', cxsign: false, cy: 'z', cysign: true, cz: 'x', czsign: false},
  {cx: 'y', cxsign: false, cy: 'z', cysign: false, cz: 'x', czsign: true},
  
  {cx: 'z', cxsign: true, cy: 'x', cysign: true, cz: 'y', czsign: true},
  {cx: 'z', cxsign: true, cy: 'x', cysign: false, cz: 'y', czsign: false},
  {cx: 'z', cxsign: true, cy: 'y', cysign: true, cz: 'x', czsign: false},
  {cx: 'z', cxsign: true, cy: 'y', cysign: false, cz: 'x', czsign: true},

  {cx: 'z', cxsign: false, cy: 'x', cysign: true, cz: 'y', czsign: false},
  {cx: 'z', cxsign: false, cy: 'x', cysign: false, cz: 'y', czsign: true},
  {cx: 'z', cxsign: false, cy: 'y', cysign: true, cz: 'x', czsign: true},
  {cx: 'z', cxsign: false, cy: 'y', cysign: false, cz: 'x', czsign: false},
]
