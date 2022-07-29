const lineReader = require('line-reader');

const costs = { 'A': 1, 'B': 10, 'C': 100, 'D': 1000 };
const targets = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
const targetsReversed = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
const transitionRoomToHallway = { 0: 2, 1: 4, 2: 6, 3: 8 };
const roomDepth = 2;

let parallelCosts = [];

let burrow = {};
burrow.hallway = [...new Array(11)].fill('.');
burrow.rooms = [...new Array(4)].map(v => new Array(roomDepth));
burrow.cost = 0;

let queue = [burrow];

let lineIdx = 0;
lineReader.eachLine('day23.input.txt', function(line, last) {
  if (lineIdx === 2) {
    let [ _, AUp, BUp, CUp, DUp ] = /###(.)#(.)#(.)#(.)###/g.exec(line);
    burrow.rooms[0][1] = AUp;
    burrow.rooms[1][1] = BUp;
    burrow.rooms[2][1] = CUp;
    burrow.rooms[3][1] = DUp;
  } else if (lineIdx === 3) {
    let [ _, ADown, BDown, CDown, DDown ] = /\s\s#(.)#(.)#(.)#(.)/g.exec(line);
    burrow.rooms[0][0] = ADown;
    burrow.rooms[1][0] = BDown;
    burrow.rooms[2][0] = CDown;
    burrow.rooms[3][0] = DDown;
  }
  lineIdx++;

  if (last) {
    solve();
  }
});

// let iter = 0;
// let pruned = 0;
let exploredSolution = new Set();

function solve() {
  while (queue.length > 0) {
    const currentBurrow = queue.shift();

    const bhash = hash(currentBurrow);
    if (exploredSolution.has(bhash)) {
      // pruned++;
      continue;
    } else {
      exploredSolution.add(bhash);
    }
    
    // iter++;
    // if (iter % 10000 === 0) {
    //   console.log(iter++, queue.length, pruned);
    //   console.log(drawBurrow(currentBurrow));
    // }
    
    if (isBurrowOrganized(currentBurrow)) {
      parallelCosts.push(currentBurrow.cost);
      continue;
    }

    // Move amphipod from hallway to room
    for (let hIdx = 0; hIdx < burrow.hallway.length; hIdx++) {
      const currentAmphipod = currentBurrow.hallway[hIdx];

      // Place in hallway empty -> do nothing
      if (currentAmphipod === '.') {
        continue;
      }

      // Try to put it in correct room (empty or with same amphipods)
      const targetRoomIdx = targets[currentAmphipod]
      const targetRoom = currentBurrow.rooms[targetRoomIdx];
      if (
        targetRoom.length === 0 || 
        targetRoom.every(a => a === currentAmphipod)
      ) {
        const targetHallwayIdx = transitionRoomToHallway[targetRoomIdx];
        let cost = roomDepth - targetRoom.length;
        if (targetHallwayIdx > hIdx) { // To the right
          // No obstacle
          if (currentBurrow.hallway.slice(hIdx+1, targetHallwayIdx+1).every(p => p === '.')) {
            cost += targetHallwayIdx - hIdx;
          } else {
            continue;
          }
        } else { // To the left
          // No obstacle
          if (currentBurrow.hallway.slice(targetHallwayIdx, hIdx).every(p => p === '.')) {
            cost += hIdx - targetHallwayIdx;
          } else {
            continue;
          }
        }

        const pburrow = { 
          ...currentBurrow, 
          hallway: [...currentBurrow.hallway],
          rooms: [...currentBurrow.rooms.map(r => [...r])]
        };
        pburrow.hallway[hIdx] = '.';
        pburrow.rooms[targetRoomIdx].push(currentAmphipod);
        pburrow.cost += cost * costs[currentAmphipod];
        queue.unshift(pburrow); // DFS rather than BFS, protect memory
      }
    }

    // Move amphipod from room to hallway
    for (let roomIdx = 0; roomIdx < burrow.rooms.length; roomIdx++) {
      const currentRoom = currentBurrow.rooms[roomIdx];
      
      // Room is empty -> do nothing
      if (currentRoom.length === 0) {
        continue
      }

      // Room full of correct amphipods -> do nothing
      if (currentRoom.every(amp => amp === targetsReversed[roomIdx])) {
        continue;
      }

      // Exploration
      let initCost = roomDepth + 1 - currentRoom.length;
      let parallelPlaces = [];

      // On the right
      let rightPlace = transitionRoomToHallway[roomIdx] + 1;
      let rightCost = initCost;
      while (rightPlace < burrow.hallway.length) {
        if (currentBurrow.hallway[rightPlace] === '.') {
          rightCost++;
        } else {
          break;
        }
        parallelPlaces.push({place: rightPlace, cost: rightCost});
        rightPlace++;
      }
      
      // On the left
      let leftPlace = transitionRoomToHallway[roomIdx] - 1;
      let leftCost = initCost;
      while (leftPlace >= 0) {
        if (currentBurrow.hallway[leftPlace] === '.') {
          leftCost++;
        } else {
          break;
        }
        parallelPlaces.push({place: leftPlace, cost: leftCost});
        leftPlace--;
      }

      // Remove forbiden places
      parallelPlaces = parallelPlaces.filter(b => ![2, 4, 6, 8].includes(b.place));
      // Queue parallel burrow
      for (const pplace of parallelPlaces) {
        const pburrow = { 
          ...currentBurrow, 
          hallway: [...currentBurrow.hallway],
          rooms: [...currentBurrow.rooms.map(r => [...r])]
        };
        const currentAmphipod = pburrow.rooms[roomIdx].pop();
        pburrow.hallway[pplace.place] = currentAmphipod;
        pburrow.cost += pplace.cost * costs[currentAmphipod];
        queue.unshift(pburrow); // DFS rather than BFS, protect memory
      }
    }
  }

  console.log(Math.min(...parallelCosts));
}

function isBurrowOrganized(cburrow) {
  return cburrow.rooms[0][0] === 'A' && cburrow.rooms[0][1] === 'A'
  && cburrow.rooms[1][0] === 'B' && cburrow.rooms[1][1] === 'B'
  && cburrow.rooms[2][0] === 'C' && cburrow.rooms[2][1] === 'C'
  && cburrow.rooms[3][0] === 'D' && cburrow.rooms[3][1] === 'D'
}

function hash(cburrow) {
  return cburrow.hallway.reduce((acc, v) => acc += v, '')
  + cburrow.rooms.reduce((acc, v, i) => acc += i + v.reduce((acc, v) => acc += v, ''), '')
  + '$' + cburrow.cost;
}

function drawBurrow(cburrow) {
  let res = 
  `#############
#${cburrow.hallway.reduce((acc, v) => acc += v, '')}#
###${cburrow.rooms[0][1] ?? '.'}#${cburrow.rooms[1][1] ?? '.'}#${cburrow.rooms[2][1] ?? '.'}#${cburrow.rooms[3][1] ?? '.'}###
  #${cburrow.rooms[0][0] ?? '.'}#${cburrow.rooms[1][0] ?? '.'}#${cburrow.rooms[2][0] ?? '.'}#${cburrow.rooms[3][0] ?? '.'}#
  #########`;
  return res;
}
