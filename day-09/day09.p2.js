const lineReader = require('line-reader');
const jsgraphs = require('js-graph-algorithms');

let heightMap = [];
let xlength;
let ylength;
let g;

lineReader.eachLine('day09.input.txt', function(line, last) {
  heightMap.push(line.split('').map(v => parseInt(v)));

  if (last) {
    solve();
  }
});

function solve() {
  xlength = heightMap.length;
  ylength = heightMap[0].length;
  g = new jsgraphs.Graph(xlength*ylength);

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      buildGraph(i, j);
    }
  }

  //Polluted by 9s
  let cc = new jsgraphs.ConnectedComponents(g);

  let occ = cc.id.reduce((acc, v) => {
    acc[v] ??= 0;
    acc[v]++;
    return acc;
  }, {});

  const maxConnex = [...Object.values(occ)].sort((a,b) => a-b).reverse().slice(0, 3);

  console.log('Result : ', maxConnex.reduce((acc, v) => acc *= v, 1));
}

function buildGraph(x, y) {
  const currentValue = heightMap[x][y];
  const currentNode = nodeId(x, y);
  if (currentValue !== 9) {
    if (x < heightMap.length-1 && heightMap[x+1][y] !== 9) {
      const targetNode = nodeId(x+1, y);
      g.addEdge(currentNode, targetNode);
    }
    if (y < heightMap[x].length-1 && heightMap[x][y+1] !== 9) {
      const targetNode = nodeId(x, y+1);
      g.addEdge(currentNode, targetNode);
    }
  }
}

function nodeId(x, y) {
  return (ylength * x) + y;
}
