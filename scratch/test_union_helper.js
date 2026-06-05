const ClipperLib = require('../clipper.js');

function unionPolygons(polygons) {
  if (polygons.length <= 1) return polygons;
  
  const clipper = new ClipperLib.Clipper();
  const solution = new ClipperLib.Paths();
  
  const scale = 10000;
  
  polygons.forEach(poly => {
    const path = poly.map(pt => ({
      X: Math.round(pt[0] * scale),
      Y: Math.round(pt[1] * scale)
    }));
    clipper.AddPath(path, ClipperLib.PolyType.ptSubject, true);
  });
  
  const success = clipper.Execute(
    ClipperLib.ClipType.ctUnion,
    solution,
    ClipperLib.PolyFillType.pftNonZero,
    ClipperLib.PolyFillType.pftNonZero
  );
  
  if (!success) {
    console.error("Clipper Union failed!");
    return polygons;
  }
  
  const result = [];
  for (let i = 0; i < solution.length; i++) {
    const path = solution[i];
    const poly = [];
    for (let j = 0; j < path.length; j++) {
      poly.push([path[j].X / scale, path[j].Y / scale]);
    }
    if (poly.length > 0) {
      // Close the loop if not closed
      const first = poly[0];
      const last = poly[poly.length - 1];
      if (Math.hypot(last[0] - first[0], last[1] - first[1]) > 1e-6) {
        poly.push([first[0], first[1]]);
      }
    }
    result.push(poly);
  }
  return result;
}

// Test it with overlapping triangles
const poly1 = [[0, 0], [2, 0], [1, 2], [0, 0]];
const poly2 = [[1, 1], [3, 1], [2, 3], [1, 1]];

const union = unionPolygons([poly1, poly2]);
console.log("Union result paths count:", union.length);
console.log("Union result first path points:", union[0]);
