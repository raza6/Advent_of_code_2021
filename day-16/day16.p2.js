const lineReader = require('line-reader');

let bin = '';
let structPacket;

lineReader.eachLine('day16.input.txt', function(line, last) {
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
  structPacket = decodePacket(bin, 1)[1][0];

  // console.dir(structPacket, { depth: null });
  console.log('Result : ', computePacket(structPacket));
}

function computePacket(packet) {
  switch (packet.typeId) {
    case 0:
      return packet.subpackets.reduce((acc, p) => acc + computePacket(p), 0);
    case 1:
      return packet.subpackets.reduce((acc, p) => acc * computePacket(p), 1);
    case 2:
      return Math.min(...packet.subpackets.map(p => computePacket(p)));
    case 3:
      return Math.max(...packet.subpackets.map(p => computePacket(p)));
    case 4:
      return packet.val;
    case 5:
      return computePacket(packet.subpackets[0]) > computePacket(packet.subpackets[1]) ? 1 : 0;
    case 6:
      return computePacket(packet.subpackets[0]) < computePacket(packet.subpackets[1]) ? 1 : 0;
    case 7:
      return computePacket(packet.subpackets[0]) === computePacket(packet.subpackets[1]) ? 1 : 0;
  }
}

function decodePacket(nextbin, childs = undefined) {
  let currentPackets = [];
  let i = 0;
  while ((!childs && nextbin && !nextbin.match(/^0+$/g)) || i < childs) {
    i++;
    // remove version
    nextbin = nextbin.substring(3);
    // get typeId
    let typeId = parseInt(nextbin.substring(0, 3), 2);
    nextbin = nextbin.substring(3);
  
    // case literal
    if (typeId === 4) {
      let end = false;
      let nb = '';
      while (!end) {
        let currentNb = nextbin.substring(0, 5); 
        nb += currentNb.substring(1, 5);
        end = currentNb[0] === '0';
        nextbin = nextbin.substring(5);
      }
      currentPackets.push({ typeId, val: parseInt(nb, 2) });
    // case operator
    } else {
      let opTypeId = parseInt(nextbin.substring(0, 1), 2);
      nextbin = nextbin.substring(1);
      // based on bits
      if (opTypeId === 0) {
        let nbbits = parseInt(nextbin.substring(0, 15), 2);
        nextbin = nextbin.substring(15);

        const [_, sub] = decodePacket(nextbin.substring(0, nbbits));
        nextbin = nextbin.substring(nbbits);
        currentPackets.push({ typeId, subpackets: [...sub] });
      // based on nb 
      } else {
        let nbpacks = parseInt(nextbin.substring(0, 11), 2);
        nextbin = nextbin.substring(11);

        const [nbin, sub] = decodePacket(nextbin, nbpacks);
        nextbin = nbin;
        currentPackets.push({ typeId, subpackets: [...sub] });
      }
    }
  }
  
  return [nextbin, currentPackets]
}
