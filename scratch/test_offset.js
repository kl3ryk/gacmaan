const ClipperLib = require('../clipper.js');

function testOffset() {
  const scale = 10000;
  
  // A simple angled path like 'V' tip
  const path = [
    { X: 0 * scale, Y: 10 * scale },
    { X: 5 * scale, Y: 0 * scale },
    { X: 10 * scale, Y: 10 * scale }
  ];
  
  console.log("=== jtMiter with default limit ===");
  let co = new ClipperLib.ClipperOffset();
  co.AddPath(path, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etOpenButt);
  let solution = new ClipperLib.Paths();
  co.Execute(solution, 1 * scale);
  solution[0].forEach((pt, idx) => console.log(`  pt ${idx}: (${pt.X / scale}, ${pt.Y / scale})`));

  console.log("=== jtMiter with MiterLimit = 10 ===");
  co = new ClipperLib.ClipperOffset(10); // default is 2
  co.AddPath(path, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etOpenButt);
  solution = new ClipperLib.Paths();
  co.Execute(solution, 1 * scale);
  solution[0].forEach((pt, idx) => console.log(`  pt ${idx}: (${pt.X / scale}, ${pt.Y / scale})`));

  console.log("=== jtRound ===");
  co = new ClipperLib.ClipperOffset();
  co.AddPath(path, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etOpenButt);
  solution = new ClipperLib.Paths();
  co.Execute(solution, 1 * scale);
  solution[0].forEach((pt, idx) => console.log(`  pt ${idx}: (${pt.X / scale}, ${pt.Y / scale})`));
}

testOffset();
