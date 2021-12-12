const lineReader = require('line-reader');

let graph = {};
let allPaths = [];

lineReader.eachLine('day12.input.txt', function(line, last) {
  const [cave1, cave2] = line.split('-');

  if(!graph[cave1]) {
    graph[cave1] = {
      name: cave1,
      small: cave1[0] === cave1[0].toLowerCase(),
      neighboors: [],
    }
  }

  if(!graph[cave2]) {
    graph[cave2] = {
      name: cave2,
      small: cave2[0] === cave2[0].toLowerCase(),
      neighboors: [],
    }
  }

  graph[cave1].neighboors.push(cave2);
  graph[cave2].neighboors.push(cave1);

  if (last) {
    solve();
  }
});

function solve() {
  dfs(graph['start']);

  console.log('Result : ', allPaths.length);
}

function dfs(currentNode, currentPath = [], smallVisited = [], duplicate) {
  if (currentNode.small) {
    smallVisited.push(currentNode.name);
  }
  currentPath.push(currentNode.name)
  if (currentNode.name === 'end') {
    allPaths.push([...currentPath]);
    return;
  }

  for (let nodeName of currentNode.neighboors) {
    if (nodeName !== 'start') {
      if (duplicate) {
        if (!smallVisited.includes(nodeName)) {
          dfs(graph[nodeName], [...currentPath], [...smallVisited], duplicate);
        }
      } else {
        const occ = smallVisited.filter(n => n === nodeName).length;
        if (occ === 0) {
          dfs(graph[nodeName], [...currentPath], [...smallVisited], duplicate);
        } else if (occ === 1) {
          dfs(graph[nodeName], [...currentPath], [...smallVisited], nodeName);
        }
      }
    }   
  }
}
