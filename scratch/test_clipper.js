const fs = require('fs');
// Load clipper.js in node by reading and eval'ing it to simulate global browser scope
const clipperCode = fs.readFileSync(__dirname + '/../clipper.js', 'utf8');
eval(clipperCode); // this defines global.ClipperLib or ClipperLib

console.log("ClipperLib exists:", typeof ClipperLib !== 'undefined');
if (typeof ClipperLib !== 'undefined') {
  console.log("ClipperLib properties:", Object.keys(ClipperLib).filter(k => k.indexOf('Clipper') !== -1 || k.indexOf('Path') !== -1 || k.indexOf('ClipType') !== -1));
}
