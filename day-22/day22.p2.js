const lineReader = require('line-reader');

let initSteps = [];

lineReader.eachLine('day22.input.txt', function(line, last) {
  let [ _, on, xstart, xend, ystart, yend, zstart, zend ] = /(on|off)\sx=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/g.exec(line);
  initSteps.push({ on: on === 'on', xstart: +xstart, xend: +xend, ystart: +ystart, yend: +yend, zstart: +zstart, zend: +zend });
  
  if (last) {
    solve();
  }
});

function solve() {
  initSteps.reverse(); // Start from non-trimmed cubes
  
  let existingCubes = [];
  let totalVolume = 0;
  
  for (let step of initSteps) { // Compute volume and add cube to the structure
    if (step.on) { // No need to handle volume of off cubes, just add them to the 
      totalVolume += getVolume(step) - overlap(step, existingCubes);
    }
    existingCubes.push(step); // Add all cubes to the structures 
  }

  console.log('Result : ', totalVolume);
}

// Compute volume of overlap between a cube and other cubes
function overlap(currentCube, existingCubes) {
  let overlapingCubes = []; // Find overlaping cubes
  for (let cube of existingCubes) {
    if (isOverlapping(currentCube, cube)) {
      overlapingCubes.push(getOverlap(currentCube, cube));
    }
  }
  let volumeOverlap = overlapingCubes.reduce((acc, c) => acc + getVolume(c), 0); // Add volume of all overlaps between the cube and the others
  for (let i = 0; i < overlapingCubes.length-1; i++) { // Remove overlap of overlap from volume, one cube at a time versus the higher others
    volumeOverlap -= overlap(overlapingCubes[i], overlapingCubes.slice(i+1)); 
  }
  return volumeOverlap;
}

function getOverlap(c1, c2) {
  return {
    xstart: Math.max(c1.xstart, c2.xstart),
    xend: Math.min(c1.xend, c2.xend),
    ystart: Math.max(c1.ystart, c2.ystart),
    yend: Math.min(c1.yend, c2.yend),
    zstart: Math.max(c1.zstart, c2.zstart),
    zend: Math.min(c1.zend, c2.zend),
  }
}

function isOverlapping(c1, c2) {
  const noOverlap = Math.max(c1.xstart, c2.xstart) > Math.min(c1.xend, c2.xend)
  || Math.max(c1.ystart, c2.ystart) > Math.min(c1.yend, c2.yend)
  || Math.max(c1.zstart, c2.zstart) > Math.min(c1.zend, c2.zend);
  return !noOverlap;
}

function getVolume(cube) {
  return (cube.xend - cube.xstart + 1) * (cube.yend - cube.ystart + 1) * (cube.zend - cube.zstart + 1);
}
