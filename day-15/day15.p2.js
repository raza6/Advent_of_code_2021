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
  xinitLength = cavern.length;
  yinitLength = cavern[0].length;
  for (let rep = 1; rep < 5; rep++) {
    for (let i = 0; i < xinitLength; i++)
    cavern.push(cavern[i].map(v => {
      return {
        ...v, neighbours: [], weight: v.weight+rep > 9 ? v.weight+rep-9 : v.weight+rep
      }
    }));
  }
  for (let rep = 1; rep < 5; rep++) {
    for (let i = 0; i < cavern.length; i++) {
      cavern[i].push(...cavern[i].slice(0, yinitLength).map(v => {
        return {
          ...v, neighbours: [], weight: v.weight+rep > 9 ? v.weight+rep-9 : v.weight+rep
        }
      }))
    }
  }

  xlength = cavern.length;
  ylength = cavern[0].length;

  for (let i = 0; i < cavern.length; i++) {
    for (let j = 0; j < cavern[i].length; j++) {
      buildGraph(i, j);
    }
  }

  solveDijkstra();

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
  let nodeWithDist = new Set([cavern[0][0]]);
  let i = 0;
  while (true) {
    let closestDist = Number.POSITIVE_INFINITY;
    let closestNode = undefined;
    
    for (let node of nodeWithDist) {
      if (node.distance < closestDist && !node.marked) {
        closestDist = node.distance;
        closestNode = node;
      }
    }

    if (!closestNode) {
      break;
    }

    for (let node of closestNode.neighbours) {
      if (node.distance > closestNode.distance + node.weight) {
        node.distance = closestNode.distance + node.weight;
        if (!node.marked) {
          nodeWithDist.add(node);
        }
      }
    }
    closestNode.marked = true;
    nodeWithDist.delete(closestNode);
  }
}

