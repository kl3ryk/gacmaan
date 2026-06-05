// Load clipper.js in node using require
const ClipperLib = require('../clipper.js');

console.log("ClipperLib exists:", typeof ClipperLib !== 'undefined');
if (typeof ClipperLib !== 'undefined') {
  // Let's create two overlapping squares
  const scale = 10000;
  
  // Square 1: from (0, 0) to (2, 2)
  const path1 = [
    {X: 0 * scale, Y: 0 * scale},
    {X: 2 * scale, Y: 0 * scale},
    {X: 2 * scale, Y: 2 * scale},
    {X: 0 * scale, Y: 2 * scale}
  ];
  
  // Square 2: from (1, 1) to (3, 3)
  const path2 = [
    {X: 1 * scale, Y: 1 * scale},
    {X: 3 * scale, Y: 1 * scale},
    {X: 3 * scale, Y: 3 * scale},
    {X: 1 * scale, Y: 3 * scale}
  ];
  
  const clipper = new ClipperLib.Clipper();
  const solution = new ClipperLib.Paths();
  
  clipper.AddPath(path1, ClipperLib.PolyType.ptSubject, true);
  clipper.AddPath(path2, ClipperLib.PolyType.ptClip, true);
  
  const success = clipper.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
  
  console.log("Success:", success);
  console.log("Solution paths count:", solution.length);
  if (solution.length > 0) {
    console.log("First path points:", solution[0].map(pt => ({X: pt.X / scale, Y: pt.Y / scale})));
  }
} else {
  console.log("ClipperLib is undefined!");
}
