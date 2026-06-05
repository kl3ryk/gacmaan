const ClipperLib = require('../clipper.js');

function testOffsetSquare() {
  const scale = 10000;
  
  // A simple angled path like 'V' tip
  const path = [
    { X: 0 * scale, Y: 10 * scale },
    { X: 5 * scale, Y: 0 * scale },
    { X: 10 * scale, Y: 10 * scale }
  ];
  
  console.log("=== jtSquare ===");
  const co = new ClipperLib.ClipperOffset();
  co.AddPath(path, ClipperLib.JoinType.jtSquare, ClipperLib.EndType.etOpenButt);
  const solution = new ClipperLib.Paths();
  co.Execute(solution, 1 * scale);
  solution[0].forEach((pt, idx) => console.log(`  pt ${idx}: (${pt.X / scale}, ${pt.Y / scale})`));
}

testOffsetSquare();
