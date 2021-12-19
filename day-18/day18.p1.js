const lineReader = require('line-reader');

let fnumbers = [];

lineReader.eachLine('day18.input.txt', function(line, last) {
  let fnumber = parseFarray(JSON.parse(line));

  fnumbers.push(fnumber);

  if (last) {
    solve();
  }
});

function parseFarray(far, parent, depth = 0, type = 'root') {
  const [ left, right ] = far;
  let fn = {};
  fn.left = Array.isArray(left) ? parseFarray(left, fn, depth+1, 'left') : left;
  fn.right = Array.isArray(right) ? parseFarray(right, fn, depth+1, 'right') : right;
  fn.parent = parent;
  fn.depth = depth;
  fn.type = type;
  return fn;
}

function solve() {
  let fadd = fnumbers[0];
  for (let i = 1; i < fnumbers.length; i++) {
    fadd = add(fadd, fnumbers[i]);
  }
  console.log('Result : ', magnitude(fadd));
}

function add(fn1, fn2) {
  let fn = { left: fn1, right: fn2 };
  fn.left.parent = fn;
  fn.right.parent = fn;
  fn.type = 'root';
  fn.left.type = 'left';
  fn.right.type = 'right';
  updateFDepth(fn);
  while(fixExplode(fn) || fixSplit(fn)) {}
  return fn;
}

// explode ? false : true
function fixExplode(fn) {
  if (fn.depth > 3) {
    // add to closest left value
    updateFirstLeftUpward(fn, fn.left);
    // add to closest right value
    updateFirstRightUpward(fn, fn.right);
    if (fn.parent.left.depth > 3) {
      fn.parent.left = 0;
    } else {
      fn.parent.right = 0;
    }
    return true; 
  } else {
    if (typeof fn.left !== 'number' && fixExplode(fn.left)) {
      return true;
    }
    if (typeof fn.right !== 'number' && fixExplode(fn.right)) {
      return true;
    }
    return false;
  }
}

function updateFirstLeftUpward(fn, nb) {
  if (fn.type === 'root') {
    return;
  }
  if (fn.type === 'right') {
    if (typeof fn.parent.left === 'number') {
      fn.parent.left += nb;
      return;
    } else {
      updateFirstLeftDownward(fn.parent.left, nb);
    }
  } else {
    updateFirstLeftUpward(fn.parent, nb);
  }
}

function updateFirstLeftDownward(fn, nb) {
  if (typeof fn.right === 'number') {
    fn.right += nb;
    return;
  } else {
    updateFirstLeftDownward(fn.right, nb);
  }
}

function updateFirstRightUpward(fn, nb) {
  if (fn.type === 'root') {
    return;
  }
  if (fn.type === 'left') {
    if (typeof fn.parent.right === 'number') {
      fn.parent.right += nb;
      return;
    } else {
      updateFirstRightDownward(fn.parent.right, nb);
    }
  } else {
    updateFirstRightUpward(fn.parent, nb);
  }
}

function updateFirstRightDownward(fn, nb) {
  if (typeof fn.left === 'number') {
    fn.left += nb;
    return;
  } else {
    updateFirstRightDownward(fn.left, nb);
  }
}

// split ? false : true
function fixSplit(fn) {
  if (typeof fn.left === 'number' && fn.left >= 10) {
    let newVal = fn.left / 2;
    fn.left = { left: Math.floor(newVal), right: Math.ceil(newVal), depth: fn.depth+1, parent: fn, type: 'left' };
    return true;
  } else if (typeof fn.left !== 'number' && fixSplit(fn.left)) {
    return true;
  }
  if (typeof fn.right === 'number' && fn.right >= 10) {
    let newVal = fn.right / 2;
    fn.right = { left: Math.floor(newVal), right: Math.ceil(newVal), depth: fn.depth+1, parent: fn, type: 'right' };
    return true;
  } else if (typeof fn.right !== 'number' && fixSplit(fn.right)) {
    return true;
  }
  return false;
}

function updateFDepth(fn, depth = 0){
  fn.depth = depth;
  if (typeof fn.left !== 'number') {
    updateFDepth(fn.left, depth+1);
  }
  if (typeof fn.right !== 'number') {
    updateFDepth(fn.right, depth+1);
  }
}

function magnitude(fn) {
  const { left, right } = fn;
  let mag = 0;
  mag += 3 * (typeof left === 'number' ? left : magnitude(left));
  mag += 2 * (typeof right === 'number' ? right : magnitude(right));
  return mag;
}
