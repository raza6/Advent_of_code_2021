const lineReader = require('line-reader');
const jsgraphs = require('js-graph-algorithms');

let cavern = [];
let xlength;
let ylength;

lineReader.eachLine('day15.input.txt', function(line, last) {
  cavern.push(line.split('').map(v => {
    return {
      weight: parseInt(v),
      marked: false,
      distance: Number.POSITIVE_INFINITY,
      neighbours: [],
    }
  }));

  if (last) {
    solve();
  }
});

function solve() {
  xlength = cavern.length;
  ylength = cavern[0].length;

  for (let i = 0; i < cavern.length; i++) {
    for (let j = 0; j < cavern[i].length; j++) {
      buildGraph(i, j);
    }
  }

  solveDijkstra();

  // console.table(cavern.map(l => l.map(v => v.distance)))

  console.log('Result : ', cavern[xlength-1][ylength-1].distance);
}

function buildGraph(x, y) {
  if (x > 0) {
    cavern[x][y].neighbours.push(cavern[x-1][y]);
  }
  if (y > 0) {
    cavern[x][y].neighbours.push(cavern[x][y-1]);
  }
  if (x < cavern.length-1) {
    cavern[x][y].neighbours.push(cavern[x+1][y]);
  }
  if (y < cavern[x].length-1) {
    cavern[x][y].neighbours.push(cavern[x][y+1]);
  }
}

function solveDijkstra() {
  cavern[0][0].distance = 0;
  while (true) {
    let closestDist = Number.POSITIVE_INFINITY;
    let closestNode = undefined;

    for (let i = 0; i < cavern.length; i++) {
      for (let j = 0; j < cavern[i].length; j++) {
        if (cavern[i][j].distance < closestDist && !cavern[i][j].marked) {
          closestDist = cavern[i][j].distance;
          closestNode = cavern[i][j];
        }
      }
    }

    if (!closestNode) {
      break;
    }

    for (let node of closestNode.neighbours) {
      if (node.distance > closestNode.distance + node.weight) {
        node.distance = closestNode.distance + node.weight;
      }
    }
    closestNode.marked = true;
  }
}

