// app.js - Stencil Generator Logic

// State management
let state = {
  strokeWidth: 6.2,      // mm
  charHeight: 50.0,      // mm
  charWidth: 35.0,       // mm
  bridgeWidth: 4.0,      // mm
  plateWidth: 300.0,     // mm
  plateHeight: 200.0,    // mm
  plateThickness: 5.0,   // mm
  platePadding: 10.0,    // mm
  charSpacing: 10.0,     // mm
  
  // CNC limits
  cncWidth: 300.0,
  cncHeight: 200.0,
  
  // Char sets
  useLatin: true,
  useNumbers: true,
  useKatakana: true,
  customText: "",
  joinType: 'round', // 'round', 'square', or 'miter'
  
  // Theme
  theme: 'dark'
};

// Character list
const LATIN_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NUMBER_CHARS = "0123456789".split("");
const KATAKANA_CHARS = [
  "ア", "イ", "ウ", "エ", "オ",
  "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ",
  "タ", "チ", "ツ", "テ", "ト",
  "纳", "ニ", "ヌ", "ネ", "ノ", // Note: The font_data maps specific Japanese characters. Let's ensure they match keys exactly:
  "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ",
  "ヤ", "ユ", "ヨ", "ラ", "リ",
  "ル", "レ", "ロ", "ワ", "ヲ", "ン"
];
// Wait, the key in font_data.js for 'na' is 'ナ'. Let's write the correct characters:
const KATAKANA_CHARS_CORRECT = [
  "ア", "イ", "ウ", "エ", "オ",
  "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ",
  "タ", "チ", "ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ",
  "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ",
  "ヤ", "ユ", "ヨ", "ラ", "リ",
  "ル", "レ", "ロ", "ワ", "ヲ", "ン"
];

// Three.js instances
let scene, camera, renderer, controls, stencilMesh, cncLimitLine, floorMesh;
let is3DInitialized = false;
let shouldFitCamera = true;

// DOM Elements
const elements = {
  themeBtn: document.getElementById('theme-btn'),
  chkLatin: document.getElementById('chk-latin'),
  chkNumbers: document.getElementById('chk-numbers'),
  chkKatakana: document.getElementById('chk-katakana'),
  customText: document.getElementById('custom-text'),
  
  paramStrokeWidth: document.getElementById('param-stroke-width'),
  paramCharHeight: document.getElementById('param-char-height'),
  paramCharWidth: document.getElementById('param-char-width'),
  paramBridgeWidth: document.getElementById('param-bridge-width'),
  paramPlateWidth: document.getElementById('param-plate-width'),
  paramPlateHeight: document.getElementById('param-plate-height'),
  paramPlateThickness: document.getElementById('param-plate-thickness'),
  paramPlatePadding: document.getElementById('param-plate-padding'),
  paramCharSpacing: document.getElementById('param-char-spacing'),
  paramCncWidth: document.getElementById('param-cnc-width'),
  paramCncHeight: document.getElementById('param-cnc-height'),
  
  valStrokeWidth: document.getElementById('val-stroke-width'),
  valCharHeight: document.getElementById('val-char-height'),
  valCharWidth: document.getElementById('val-char-width'),
  valBridgeWidth: document.getElementById('val-bridge-width'),
  valPlateWidth: document.getElementById('val-plate-width'),
  valPlateHeight: document.getElementById('val-plate-height'),
  valPlateThickness: document.getElementById('val-plate-thickness'),
  valPlatePadding: document.getElementById('val-plate-padding'),
  valCharSpacing: document.getElementById('val-char-spacing'),
  valCncWidth: document.getElementById('val-cnc-width'),
  valCncHeight: document.getElementById('val-cnc-height'),
  
  btnSTL: document.getElementById('btn-export-stl'),
  btnDXF: document.getElementById('btn-export-dxf'),
  btnSVG: document.getElementById('btn-export-svg'),
  
  tab2D: document.getElementById('tab-2d'),
  tab3D: document.getElementById('tab-3d'),
  container2D: document.getElementById('container-2d'),
  container3D: document.getElementById('container-3d'),
  canvas: document.getElementById('stencil-canvas'),
  webglContainer: document.getElementById('webgl-canvas-container'),
  warningCnc: document.getElementById('warning-cnc'),
  paramJoinType: document.getElementById('param-join-type'),
  
  statPlateDim: document.getElementById('stat-plate-dim'),
  statCharCount: document.getElementById('stat-char-count')
};

// Initialize application
function init() {
  // Load state from localStorage if exists
  const storedTheme = localStorage.getItem("color-scheme") || "dark";
  state.theme = storedTheme;
  document.documentElement.setAttribute("data-theme", state.theme);
  
  setupEventListeners();
  updateSlidersFromState();
  renderAll();
}

function setupEventListeners() {
  // Theme Toggle
  elements.themeBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("color-scheme", state.theme);
    if (is3DInitialized) update3DLightAndBackground();
  });
  
  // Inputs
  const inputParams = [
    { el: elements.paramStrokeWidth, key: 'strokeWidth', valEl: elements.valStrokeWidth, suffix: ' mm' },
    { el: elements.paramCharHeight, key: 'charHeight', valEl: elements.valCharHeight, suffix: ' mm' },
    { el: elements.paramCharWidth, key: 'charWidth', valEl: elements.valCharWidth, suffix: ' mm' },
    { el: elements.paramBridgeWidth, key: 'bridgeWidth', valEl: elements.valBridgeWidth, suffix: ' mm' },
    { el: elements.paramPlateWidth, key: 'plateWidth', valEl: elements.valPlateWidth, suffix: ' mm' },
    { el: elements.paramPlateHeight, key: 'plateHeight', valEl: elements.valPlateHeight, suffix: ' mm' },
    { el: elements.paramPlateThickness, key: 'plateThickness', valEl: elements.valPlateThickness, suffix: ' mm' },
    { el: elements.paramPlatePadding, key: 'platePadding', valEl: elements.valPlatePadding, suffix: ' mm' },
    { el: elements.paramCharSpacing, key: 'charSpacing', valEl: elements.valCharSpacing, suffix: ' mm' },
    { el: elements.paramCncWidth, key: 'cncWidth', valEl: elements.valCncWidth, suffix: ' mm' },
    { el: elements.paramCncHeight, key: 'cncHeight', valEl: elements.valCncHeight, suffix: ' mm' }
  ];
  
  inputParams.forEach(param => {
    param.el.addEventListener('input', (e) => {
      state[param.key] = parseFloat(e.target.value);
      param.valEl.textContent = state[param.key].toFixed(1) + param.suffix;
      renderAll();
    });
  });
  
  // Checkboxes
  const checkboxes = [
    { el: elements.chkLatin, key: 'useLatin' },
    { el: elements.chkNumbers, key: 'useNumbers' },
    { el: elements.chkKatakana, key: 'useKatakana' }
  ];
  
  checkboxes.forEach(cb => {
    cb.el.addEventListener('change', (e) => {
      state[cb.key] = e.target.checked;
      shouldFitCamera = true;
      renderAll();
    });
  });
  
  // Custom Text
  elements.customText.addEventListener('input', (e) => {
    state.customText = e.target.value;
    shouldFitCamera = true;
    renderAll();
  });
  
  // Join Type Dropdown
  elements.paramJoinType.addEventListener('change', (e) => {
    state.joinType = e.target.value;
    renderAll();
  });
  
  // Tabs
  elements.tab2D.addEventListener('click', () => {
    elements.tab2D.classList.add('active');
    elements.tab3D.classList.remove('active');
    elements.container2D.classList.add('active');
    elements.container3D.classList.remove('active');
    render2D();
  });
  
  elements.tab3D.addEventListener('click', () => {
    elements.tab3D.classList.add('active');
    elements.tab2D.classList.remove('active');
    elements.container3D.classList.add('active');
    elements.container2D.classList.remove('active');
    shouldFitCamera = true;
    if (!is3DInitialized) {
      init3D();
    }
    render3D();
  });
  
  // Exports
  elements.btnSVG.addEventListener('click', exportSVG);
  elements.btnDXF.addEventListener('click', exportDXF);
  elements.btnSTL.addEventListener('click', exportSTL);
  
  // Window Resize
  window.addEventListener('resize', () => {
    if (elements.container2D.classList.contains('active')) {
      render2D();
    }
    if (is3DInitialized && elements.container3D.classList.contains('active')) {
      const width = elements.webglContainer.clientWidth;
      const height = elements.webglContainer.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  });
}

function updateSlidersFromState() {
  elements.paramStrokeWidth.value = state.strokeWidth;
  elements.valStrokeWidth.textContent = state.strokeWidth.toFixed(1) + ' mm';
  
  elements.paramCharHeight.value = state.charHeight;
  elements.valCharHeight.textContent = state.charHeight.toFixed(1) + ' mm';
  
  elements.paramCharWidth.value = state.charWidth;
  elements.valCharWidth.textContent = state.charWidth.toFixed(1) + ' mm';
  
  elements.paramBridgeWidth.value = state.bridgeWidth;
  elements.valBridgeWidth.textContent = state.bridgeWidth.toFixed(1) + ' mm';
  
  elements.paramPlateWidth.value = state.plateWidth;
  elements.valPlateWidth.textContent = state.plateWidth.toFixed(1) + ' mm';
  
  elements.paramPlateHeight.value = state.plateHeight;
  elements.valPlateHeight.textContent = state.plateHeight.toFixed(1) + ' mm';
  
  elements.paramPlateThickness.value = state.plateThickness;
  elements.valPlateThickness.textContent = state.plateThickness.toFixed(1) + ' mm';
  
  elements.paramPlatePadding.value = state.platePadding;
  elements.valPlatePadding.textContent = state.platePadding.toFixed(1) + ' mm';
  
  elements.paramCharSpacing.value = state.charSpacing;
  elements.valCharSpacing.textContent = state.charSpacing.toFixed(1) + ' mm';
  
  elements.paramCncWidth.value = state.cncWidth;
  elements.valCncWidth.textContent = state.cncWidth.toFixed(1) + ' mm';
  
  elements.paramCncHeight.value = state.cncHeight;
  elements.valCncHeight.textContent = state.cncHeight.toFixed(1) + ' mm';
  
  elements.paramJoinType.value = state.joinType;
}

// Get active character list to generate
function getActiveCharacters() {
  if (state.customText.trim().length > 0) {
    // Return only unique supported characters from custom text
    const chars = [];
    const text = state.customText.toUpperCase();
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (FONT_DATA[char]) {
        chars.push(char);
      }
    }
    return chars;
  }
  
  let chars = [];
  if (state.useLatin) chars = chars.concat(LATIN_CHARS);
  if (state.useNumbers) chars = chars.concat(NUMBER_CHARS);
  if (state.useKatakana) chars = chars.concat(KATAKANA_CHARS_CORRECT);
  
  return chars;
}

// Math core: Bridge subdivision
function getSubdividedSegments(segments, bridges, charHeight, bridgeWidth) {
  const subdivided = [];
  
  // Convert bridge width to normalised grid units
  // Normalised height is 14 grid units
  const gridBridgeWidth = bridgeWidth * (14.0 / charHeight);
  
  for (let sIdx = 0; sIdx < segments.length; sIdx++) {
    const seg = segments[sIdx];
    const segBridges = bridges.filter(b => b.seg === sIdx);
    
    if (segBridges.length === 0) {
      subdivided.push(seg);
      continue;
    }
    
    // Sort bridges along the segment direction
    segBridges.sort((a, b) => a.t - b.t);
    
    let currentStart = [seg[0][0], seg[0][1]];
    const p0 = seg[0];
    const p1 = seg[1];
    
    const dx = p1[0] - p0[0];
    const dy = p1[1] - p0[1];
    const len = Math.hypot(dx, dy);
    
    if (len === 0) {
      subdivided.push(seg);
      continue;
    }
    
    const ux = dx / len;
    const uy = dy / len;
    
    let skipRemaining = false;
    
    for (const bridge of segBridges) {
      const t = bridge.t;
      // Bridge center in grid coordinates
      const cx = p0[0] + t * dx;
      const cy = p0[1] + t * dy;
      
      // Calculate bridge boundaries
      const b1x = cx - ux * (gridBridgeWidth / 2);
      const b1y = cy - uy * (gridBridgeWidth / 2);
      
      const b2x = cx + ux * (gridBridgeWidth / 2);
      const b2y = cy + uy * (gridBridgeWidth / 2);
      
      // Calculate length of the first section
      const len1 = Math.hypot(b1x - currentStart[0], b1y - currentStart[1]);
      const dot1 = (b1x - currentStart[0]) * ux + (b1y - currentStart[1]) * uy;
      
      if (dot1 > 0 && len1 < len) {
        subdivided.push([[currentStart[0], currentStart[1]], [b1x, b1y]]);
      }
      
      // Update start point of next section
      currentStart = [b2x, b2y];
      
      // Check if currentStart is beyond end of segment
      const dotEnd = (p1[0] - currentStart[0]) * ux + (p1[1] - currentStart[1]) * uy;
      if (dotEnd <= 0) {
        skipRemaining = true;
        break;
      }
    }
    
    if (!skipRemaining) {
      subdivided.push([[currentStart[0], currentStart[1]], [p1[0], p1[1]]]);
    }
  }
  
  return subdivided;
}

// Join individual line segments into connected paths
function joinSegments(segments) {
  const polylines = [];
  // Make a deep copy of segments
  const remaining = segments.map(s => [[s[0][0], s[0][1]], [s[1][0], s[1][1]]]);

  while (remaining.length > 0) {
    let current = remaining.shift();
    let extended = true;

    while (extended) {
      extended = false;
      const lastPoint = current[current.length - 1];
      const firstPoint = current[0];

      for (let i = 0; i < remaining.length; i++) {
        const seg = remaining[i];
        
        // Tolerance for joining vertices (0.1 grid units ~ 0.3mm)
        const tol = 0.1;
        
        // Check if seg starts at lastPoint
        if (Math.hypot(seg[0][0] - lastPoint[0], seg[0][1] - lastPoint[1]) < tol) {
          current.push([seg[1][0], seg[1][1]]);
          remaining.splice(i, 1);
          extended = true;
          break;
        }
        // Check if seg ends at firstPoint
        else if (Math.hypot(seg[1][0] - firstPoint[0], seg[1][1] - firstPoint[1]) < tol) {
          current.unshift([seg[0][0], seg[0][1]]);
          remaining.splice(i, 1);
          extended = true;
          break;
        }
        // Check if seg ends at lastPoint (reversed segment)
        else if (Math.hypot(seg[1][0] - lastPoint[0], seg[1][1] - lastPoint[1]) < tol) {
          current.push([seg[0][0], seg[0][1]]);
          remaining.splice(i, 1);
          extended = true;
          break;
        }
        // Check if seg starts at firstPoint (reversed segment)
        else if (Math.hypot(seg[0][0] - firstPoint[0], seg[0][1] - firstPoint[1]) < tol) {
          current.unshift([seg[1][0], seg[1][1]]);
          remaining.splice(i, 1);
          extended = true;
          break;
        }
      }
    }
    polylines.push(current);
  }
  return polylines;
}

// Manual fallback for offsetting a polyline path to generate its 2D stroke outline loop of specified width
function offsetPathManual(points, width) {
  const half = width / 2;
  const n = points.length;
  if (n < 2) return [];

  const leftPoints = [];
  const rightPoints = [];

  // Compute segment directions and normals
  const dirs = [];
  const normals = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = points[i+1][0] - points[i][0];
    const dy = points[i+1][1] - points[i][1];
    const len = Math.hypot(dx, dy);
    if (len === 0) {
      dirs.push([1, 0]);
      normals.push([0, 1]);
    } else {
      const ux = dx / len;
      const uy = dy / len;
      dirs.push([ux, uy]);
      normals.push([-uy, ux]); // Normal to the left of the segment direction
    }
  }

  // Start point
  leftPoints.push([
    points[0][0] + normals[0][0] * half,
    points[0][1] + normals[0][1] * half
  ]);
  rightPoints.push([
    points[0][0] - normals[0][0] * half,
    points[0][1] - normals[0][1] * half
  ]);

  // Intermediate joints (miter joint with scale limit)
  for (let i = 1; i < n - 1; i++) {
    const nPrev = normals[i-1];
    const nNext = normals[i];
    
    // Average normal
    let nx = (nPrev[0] + nNext[0]) / 2;
    let ny = (nPrev[1] + nNext[1]) / 2;
    const len = Math.hypot(nx, ny);
    
    if (len === 0) {
      // Degenerate 180-degree turn
      leftPoints.push([points[i][0] + nPrev[0] * half, points[i][1] + nPrev[1] * half]);
      rightPoints.push([points[i][0] - nPrev[0] * half, points[i][1] - nPrev[1] * half]);
    } else {
      nx /= len;
      ny /= len;
      
      // Miter scale = 1 / dot(avg_normal, segment_normal)
      const dot = nx * nPrev[0] + ny * nPrev[1];
      const miterScale = Math.min(2.0, 1.0 / Math.max(0.1, dot)); // cap to avoid spikes
      
      leftPoints.push([
        points[i][0] + nx * half * miterScale,
        points[i][1] + ny * half * miterScale
      ]);
      rightPoints.push([
        points[i][0] - nx * half * miterScale,
        points[i][1] - ny * half * miterScale
      ]);
    }
  }

  // End point
  leftPoints.push([
    points[n-1][0] + normals[n-2][0] * half,
    points[n-1][1] + normals[n-2][1] * half
  ]);
  rightPoints.push([
    points[n-1][0] - normals[n-2][0] * half,
    points[n-1][1] - normals[n-2][1] * half
  ]);

  // Combine left and right offset points into a single closed outline loop
  const loop = [];
  for (let i = 0; i < n; i++) {
    loop.push(leftPoints[i]);
  }
  for (let i = n - 1; i >= 0; i--) {
    loop.push(rightPoints[i]);
  }
  // Close the loop
  loop.push([leftPoints[0][0], leftPoints[0][1]]);

  return loop;
}

// Offset a polyline path using ClipperOffset to ensure 100% uniform stroke width everywhere
function offsetPath(points, width) {
  const n = points.length;
  if (n < 2) return [];
  if (typeof ClipperLib === 'undefined') {
    // Fallback if Clipper is not loaded
    const fallback = offsetPathManual(points, width);
    return fallback.length > 0 ? [fallback] : [];
  }
  
  const scale = 10000;
  const co = new ClipperLib.ClipperOffset(5.0); // MiterLimit = 5.0 for clean sharp corners
  
  const path = points.map(pt => ({
    X: Math.round(pt[0] * scale),
    Y: Math.round(pt[1] * scale)
  }));
  
  let joinType = ClipperLib.JoinType.jtRound; // Default round
  if (state.joinType === 'miter') {
    joinType = ClipperLib.JoinType.jtMiter;
  } else if (state.joinType === 'square') {
    joinType = ClipperLib.JoinType.jtSquare;
  }
  
  co.AddPath(path, joinType, ClipperLib.EndType.etOpenButt);
  
  const solution = new ClipperLib.Paths();
  const delta = (width / 2) * scale;
  co.Execute(solution, delta);
  
  const result = [];
  for (let k = 0; k < solution.length; k++) {
    const singlePath = solution[k];
    const poly = [];
    for (let i = 0; i < singlePath.length; i++) {
      poly.push([singlePath[i].X / scale, singlePath[i].Y / scale]);
    }
    if (poly.length > 0) {
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

// Union helper using ClipperLib to merge overlapping paths
function unionPolygons(polygons) {
  if (polygons.length <= 1) return polygons;
  if (typeof ClipperLib === 'undefined') {
    console.warn("ClipperLib is not loaded. Skipping union.");
    return polygons;
  }
  
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
      // Close the loop
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

// Compute the entire template layout and return dimensions & cutouts in mm
function computeLayout() {
  const activeChars = getActiveCharacters();
  const numChars = activeChars.length;
  
  if (numChars === 0) {
    return {
      plateWidth: state.plateWidth || 300,
      plateHeight: state.plateHeight || 200,
      holes: [],
      numChars: 0
    };
  }
  
  // Grid layout: dynamically calculate columns to fit within the plate width
  const availW = (state.plateWidth || 300) - 2 * state.platePadding;
  const unitW = state.charWidth + state.charSpacing;
  let cols = Math.max(1, Math.floor((availW + state.charSpacing) / unitW));
  
  // If custom text is short and fits in fewer columns, reduce columns
  if (state.customText.trim().length > 0 && numChars < cols) {
    cols = numChars;
  }
  
  const rows = Math.ceil(numChars / cols);
  
  const plateWidth = state.plateWidth || 300;
  const plateHeight = state.plateHeight || 200;
  
  const holes = [];
  
  activeChars.forEach((char, idx) => {
    const charData = FONT_DATA[char];
    if (!charData) return;
    
    // Grid position
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    
    const xBox = state.platePadding + col * (state.charWidth + state.charSpacing);
    // Align rows from top to bottom
    const yBox = plateHeight - state.platePadding - (row + 1) * state.charHeight - row * state.charSpacing;
    
    // 1. Get subdivided segments in normalized grid coordinates
    const splitSegs = getSubdividedSegments(charData.segments, charData.bridges || [], state.charHeight, state.bridgeWidth);
    
    // 2. Scale segments to millimeter coordinates
    const scaledSegs = splitSegs.map(seg => {
      const p0_mm = [
        xBox + seg[0][0] * (state.charWidth / 10),
        yBox + (14.0 - seg[0][1]) * (state.charHeight / 14) // flip Y so it draws right-side up
      ];
      const p1_mm = [
        xBox + seg[1][0] * (state.charWidth / 10),
        yBox + (14.0 - seg[1][1]) * (state.charHeight / 14)
      ];
      return [p0_mm, p1_mm];
    });
    
    // 3. Join scaled segments into polylines
    const polylines = joinSegments(scaledSegs);
    
    // 4. Offset polylines to outline loops (slot width in mm)
    const charHoles = [];
    polylines.forEach(polyline => {
      const outlines = offsetPath(polyline, state.strokeWidth);
      outlines.forEach(outline => {
        if (outline.length > 0) {
          charHoles.push(outline);
        }
      });
    });
    
    // 5. Union overlapping loops of the character using ClipperLib
    const unionedHoles = unionPolygons(charHoles);
    unionedHoles.forEach(hole => {
      holes.push(hole);
    });
  });
  
  return {
    plateWidth,
    plateHeight,
    holes,
    numChars
  };
}

// 2D Preview Render
function render2D() {
  const layout = computeLayout();
  
  // Update stats
  elements.statPlateDim.textContent = `Rozmiar płyty: ${layout.plateWidth.toFixed(1)} x ${layout.plateHeight.toFixed(1)} mm`;
  elements.statCharCount.textContent = `Liczba znaków: ${layout.numChars}`;
  
  // Check CNC Limit Violation
  const isViolated = (layout.plateWidth > state.cncWidth) || (layout.plateHeight > state.cncHeight);
  elements.warningCnc.style.display = isViolated ? 'flex' : 'none';
  
  // Setup canvas sizes (maintaining aspect ratio in DOM container)
  const wrapper = elements.canvas.parentElement;
  const padding = 20;
  // Scale the viewport to fit both the plate and the CNC limits, plus a 15% margin.
  // This ensures the red boundary is always fully visible and scales dynamically.
  const maxW_mm = Math.max(layout.plateWidth, state.cncWidth) * 1.15;
  const maxH_mm = Math.max(layout.plateHeight, state.cncHeight) * 1.15;
  
  const maxWidth = wrapper.clientWidth - padding;
  const maxHeight = wrapper.clientHeight - padding || 450;
  
  const aspect = maxW_mm / maxH_mm;
  
  let canvasWidth = maxWidth;
  let canvasHeight = maxWidth / aspect;
  
  if (canvasHeight > maxHeight) {
    canvasHeight = maxHeight;
    canvasWidth = maxHeight * aspect;
  }
  
  // Canvas pixel density scaling
  const scale = 2.0; 
  elements.canvas.width = canvasWidth * scale;
  elements.canvas.height = canvasHeight * scale;
  elements.canvas.style.width = canvasWidth + 'px';
  elements.canvas.style.height = canvasHeight + 'px';
  
  const ctx = elements.canvas.getContext('2d');
  ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
  
  // Scale ctx to draw in millimeter units based on the bounding box of plate + CNC limits
  const drawScale = (canvasWidth * scale) / maxW_mm;
  ctx.save();
  ctx.scale(drawScale, drawScale);
  
  // Flip Y coordinate so bottom-left is (0,0)
  ctx.translate(0, maxH_mm);
  ctx.scale(1, -1);
  
  // Center the stencil plate inside the canvas viewport if plate is smaller than viewport
  const offsetX = 0;
  const offsetY = 0;
  
  // Draw background grid (every 50mm) to show physical scale changes clearly
  ctx.strokeStyle = state.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  ctx.lineWidth = 0.5;
  const gridSpacing = 50; // mm
  ctx.beginPath();
  for (let x = 0; x <= maxW_mm; x += gridSpacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, maxH_mm);
  }
  for (let y = 0; y <= maxH_mm; y += gridSpacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(maxW_mm, y);
  }
  ctx.stroke();
  
  // Draw grid labels
  ctx.save();
  ctx.scale(1, -1); // flip temporarily to write text upright
  ctx.fillStyle = state.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.4)';
  ctx.font = '7px monospace';
  for (let x = gridSpacing; x < maxW_mm; x += gridSpacing) {
    ctx.fillText(`${x}mm`, x - 10, -2);
  }
  for (let y = gridSpacing; y < maxH_mm; y += gridSpacing) {
    ctx.fillText(`${y}mm`, 2, -y + 3);
  }
  ctx.restore();
  
  // Draw solid stencil plate (metal color)
  ctx.fillStyle = "#1e293b"; // dark steel
  ctx.fillRect(offsetX, offsetY, layout.plateWidth, layout.plateHeight);
  
  // Draw plate outline border
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 1;
  ctx.strokeRect(offsetX, offsetY, layout.plateWidth, layout.plateHeight);
  
  // Draw letter cutouts (black)
  ctx.fillStyle = "#000000";
  layout.holes.forEach(hole => {
    ctx.beginPath();
    ctx.moveTo(offsetX + hole[0][0], offsetY + hole[0][1]);
    for (let i = 1; i < hole.length; i++) {
      ctx.lineTo(offsetX + hole[i][0], offsetY + hole[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    
    // Highlight cutout boundary
    ctx.strokeStyle = "rgba(96, 165, 250, 0.4)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  });
  
  // Draw CNC Limit boundary (Red dashed line)
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(0, 0, state.cncWidth, state.cncHeight);
  ctx.setLineDash([]);
  
  ctx.restore();
}

// 3D Preview (Three.js scene)
function init3D() {
  const width = elements.webglContainer.clientWidth || 800;
  const height = elements.webglContainer.clientHeight || 500;
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color(state.theme === 'dark' ? 0x0f1115 : 0xf5f7fa);
  
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
  // Crucial: Set Z-axis as the UP vector so OrbitControls work naturally
  camera.up.set(0, 0, 1);
  camera.position.set(0, -400, 400);
  
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  elements.webglContainer.appendChild(renderer.domElement);
  
  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.01; // Prevent camera going below floor
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
  dirLight1.position.set(200, -200, 500);
  dirLight1.castShadow = true;
  dirLight1.shadow.mapSize.width = 2048;
  dirLight1.shadow.mapSize.height = 2048;
  dirLight1.shadow.camera.near = 10;
  dirLight1.shadow.camera.far = 1500;
  const d = 500;
  dirLight1.shadow.camera.left = -d;
  dirLight1.shadow.camera.right = d;
  dirLight1.shadow.camera.top = d;
  dirLight1.shadow.camera.bottom = -d;
  scene.add(dirLight1);
  
  const dirLight2 = new THREE.DirectionalLight(0x90b0ff, 0.35);
  dirLight2.position.set(-300, 300, 200);
  scene.add(dirLight2);
  
  const gridHelper = new THREE.GridHelper(2000, 100, 0x475569, 0x273549);
  gridHelper.rotation.x = Math.PI / 2;
  gridHelper.position.z = -0.15;
  scene.add(gridHelper);
  
  // Translucent floor plane to catch shadow projection
  const floorGeo = new THREE.PlaneGeometry(3000, 3000);
  const floorMat = new THREE.ShadowMaterial({ opacity: 0.25 });
  floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.position.z = -0.2;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);
  
  is3DInitialized = true;
  
  animate();
}

function update3DLightAndBackground() {
  if (!scene) return;
  scene.background = new THREE.Color(state.theme === 'dark' ? 0x0f1115 : 0xf5f7fa);
}

function animate() {
  requestAnimationFrame(animate);
  // Performance optimization: only run updates and render if the 3D container is active
  if (is3DInitialized && elements.container3D.classList.contains('active')) {
    if (controls) controls.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
  }
}

function render3D() {
  if (!is3DInitialized) return;
  
  const layout = computeLayout();
  
  // Update warnings for 3D tab
  const isViolated = (layout.plateWidth > state.cncWidth) || (layout.plateHeight > state.cncHeight);
  elements.warningCnc.style.display = isViolated ? 'flex' : 'none';
  elements.warningCnc.querySelector('.warning-text').textContent = "Szablon przekracza obszar roboczy CNC!";
  
  try {
    // Self-correct layout dimensions (ensures container is never 0 size when switching tabs)
    const width = elements.webglContainer.clientWidth || 800;
    const height = elements.webglContainer.clientHeight || 500;
    const pixelRatio = renderer.getPixelRatio();
    const expectedWidth = Math.round(width * pixelRatio);
    const expectedHeight = Math.round(height * pixelRatio);
    if (renderer.domElement.width !== expectedWidth || renderer.domElement.height !== expectedHeight) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    
    // Remove existing stencil mesh
    if (stencilMesh) {
      scene.remove(stencilMesh);
      stencilMesh.geometry.dispose();
      stencilMesh.material.dispose();
    }
    
    // Remove existing CNC limit boundary lines
    if (cncLimitLine) {
      scene.remove(cncLimitLine);
      cncLimitLine.geometry.dispose();
      cncLimitLine.material.dispose();
    }
    
    // 1. Generate STL Buffer data
    const stlBuffer = generateSTL(layout.plateWidth, layout.plateHeight, state.plateThickness, layout.holes);
    
    // 2. Read STL triangles into Three.js BufferGeometry
    const geometry = new THREE.BufferGeometry();
    const view = new DataView(stlBuffer);
    const numTriangles = view.getUint32(80, true);
    
    if (numTriangles === 0) {
      console.warn("No triangles generated in STL!");
      return;
    }
    
    const positions = new Float32Array(numTriangles * 9);
    const normals = new Float32Array(numTriangles * 9);
    
    let offset = 84;
    for (let i = 0; i < numTriangles; i++) {
      const nx = view.getFloat32(offset, true);
      const ny = view.getFloat32(offset + 4, true);
      const nz = view.getFloat32(offset + 8, true);
      
      const v1x = view.getFloat32(offset + 12, true);
      const v1y = view.getFloat32(offset + 16, true);
      const v1z = view.getFloat32(offset + 20, true);
      
      const v2x = view.getFloat32(offset + 24, true);
      const v2y = view.getFloat32(offset + 28, true);
      const v2z = view.getFloat32(offset + 32, true);
      
      const v3x = view.getFloat32(offset + 36, true);
      const v3y = view.getFloat32(offset + 40, true);
      const v3z = view.getFloat32(offset + 44, true);
      
      positions[i*9] = v1x;
      positions[i*9+1] = v1y;
      positions[i*9+2] = v1z;
      positions[i*9+3] = v2x;
      positions[i*9+4] = v2y;
      positions[i*9+5] = v2z;
      positions[i*9+6] = v3x;
      positions[i*9+7] = v3y;
      positions[i*9+8] = v3z;
      
      for (let k = 0; k < 3; k++) {
        normals[i*9 + k*3] = nx;
        normals[i*9 + k*3 + 1] = ny;
        normals[i*9 + k*3 + 2] = nz;
      }
      
      offset += 50;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    
    // Center mesh relative to origin
    const plateCenterX = layout.plateWidth / 2;
    const plateCenterY = layout.plateHeight / 2;
    geometry.translate(-plateCenterX, -plateCenterY, 0);
    
    // Create material with shadow casting
    const material = new THREE.MeshStandardMaterial({
      color: 0x475569, // slate gray
      roughness: 0.4,
      metalness: 0.35,
      side: THREE.DoubleSide
    });
    
    stencilMesh = new THREE.Mesh(geometry, material);
    stencilMesh.castShadow = true;
    stencilMesh.receiveShadow = true;
    scene.add(stencilMesh);
    
    // 3. Render CNC Bounding Box (Red dashed rectangle at origin)
    // Draw the boundary from (0,0) to (cncWidth, cncHeight) on the XY floor
    const cncPts = [];
    const cw = state.cncWidth;
    const ch = state.cncHeight;
    // Offset so that it aligns correctly relative to our centered plate
    const ox = -plateCenterX;
    const oy = -plateCenterY;
    
    cncPts.push(new THREE.Vector3(ox, oy, 0.5));
    cncPts.push(new THREE.Vector3(ox + cw, oy, 0.5));
    cncPts.push(new THREE.Vector3(ox + cw, oy + ch, 0.5));
    cncPts.push(new THREE.Vector3(ox, oy + ch, 0.5));
    cncPts.push(new THREE.Vector3(ox, oy, 0.5));
    
    const cncGeom = new THREE.BufferGeometry().setFromPoints(cncPts);
    const cncMat = new THREE.LineDashedMaterial({
      color: 0xef4444, // warning red
      dashSize: 10,
      gapSize: 6,
      scale: 1
    });
    
    cncLimitLine = new THREE.Line(cncGeom, cncMat);
    cncLimitLine.computeLineDistances(); // Required for dashes to render
    scene.add(cncLimitLine);
    
    // Position camera to fit both plate and CNC workspace only if fit requested
    if (shouldFitCamera) {
      const boundingDim = Math.max(layout.plateWidth, layout.plateHeight, state.cncWidth, state.cncHeight);
      camera.position.set(0, -boundingDim * 1.0, boundingDim * 0.95);
      controls.target.set(0, 0, 0);
      controls.update();
      shouldFitCamera = false;
    }
  } catch (err) {
    console.error("render3D Error:", err);
    elements.warningCnc.style.display = 'flex';
    elements.warningCnc.querySelector('.warning-text').textContent = "Błąd 3D: " + err.message;
  }
}

function renderAll() {
  if (elements.container2D.classList.contains('active')) {
    render2D();
  } else {
    render3D();
  }
}

// SVG Export
function exportSVG() {
  const layout = computeLayout();
  
  let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${layout.plateWidth}mm" height="${layout.plateHeight}mm" viewBox="0 0 ${layout.plateWidth} ${layout.plateHeight}">
  <rect x="0" y="0" width="${layout.plateWidth}" height="${layout.plateHeight}" fill="#334155" stroke="#1e293b" stroke-width="1"/>
`;

  // Write each hole outline loop (Z in mm)
  layout.holes.forEach(hole => {
    let d = `M ${hole[0][0].toFixed(3)} ${(layout.plateHeight - hole[0][1]).toFixed(3)}`; // Y-flipped for standard SVG coordinate space
    for (let i = 1; i < hole.length; i++) {
      d += ` L ${hole[i][0].toFixed(3)} ${(layout.plateHeight - hole[i][1]).toFixed(3)}`;
    }
    d += ' Z';
    svg += `  <path d="${d}" fill="#0f172a" stroke="#60a5fa" stroke-width="0.2"/>\n`;
  });

  svg += `</svg>`;
  
  downloadFile(svg, 'text/xml', 'stencil_template.svg');
}

// DXF Export
function exportDXF() {
  const layout = computeLayout();
  
  let dxf = `0
SECTION
2
HEADER
9
$ACADVER
1
AC1015
0
ENDSEC
0
SECTION
2
ENTITIES
`;

  // Draw the outer boundary of the plate
  dxf += drawDXFPolyline([
    [0, 0],
    [layout.plateWidth, 0],
    [layout.plateWidth, layout.plateHeight],
    [0, layout.plateHeight],
    [0, 0]
  ]);

  // Draw each hole
  layout.holes.forEach(hole => {
    dxf += drawDXFPolyline(hole);
  });

  dxf += `0
ENDSEC
0
EOF
`;

  downloadFile(dxf, 'application/dxf', 'stencil_template.dxf');
}

function drawDXFPolyline(points) {
  let poly = `0
LWPOLYLINE
5
${Math.floor(Math.random() * 1000000).toString(16)}
100
AcDbEntity
8
0
100
AcDbPolyline
90
${points.length}
70
1
`;
  for (const pt of points) {
    poly += `10
${pt[0].toFixed(4)}
20
${pt[1].toFixed(4)}
`;
  }
  return poly;
}

// STL Export (Binary ArrayBuffer)
function exportSTL() {
  const layout = computeLayout();
  const buffer = generateSTL(layout.plateWidth, layout.plateHeight, state.plateThickness, layout.holes);
  
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'stencil_template.stl';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Dynamic watertight 3D STL mesh generation (Binary format)
function generateSTL(plateWidth, plateHeight, thickness, holes) {
  const triangles = [];
  
  // 1. Prepare flat vertices and hole boundary index arrays for earcut
  const vertices = [];
  const holesIndices = [];

  // Outer boundary (CCW winding)
  vertices.push(0, 0);
  vertices.push(plateWidth, 0);
  vertices.push(plateWidth, plateHeight);
  vertices.push(0, plateHeight);

  // Holes (CW winding)
  let currentOffset = 4;
  const cleanedHoles = [];
  
  for (const hole of holes) {
    // Force Clockwise winding to ensure watertight earcut triangulation
    let cwHole = [...hole];
    forceClockwise(cwHole);
    
    const len = cwHole.length;
    // Strip duplicate last vertex to keep earcut clean
    const limit = (len > 1 && Math.hypot(cwHole[len-1][0] - cwHole[0][0], cwHole[len-1][1] - cwHole[0][1]) < 0.01) ? len - 1 : len;
    
    if (limit < 3) continue; // skip degenerate triangles
    
    holesIndices.push(currentOffset);
    const cleanedHole = [];
    for (let i = 0; i < limit; i++) {
      vertices.push(cwHole[i][0], cwHole[i][1]);
      cleanedHole.push([cwHole[i][0], cwHole[i][1]]);
    }
    cleanedHoles.push(cleanedHole);
    currentOffset += limit;
  }

  // 2. Perform 2D Triangulation using earcut wrapper
  const indices = earcutWrapper(vertices, holesIndices, 2);

  // Top Face (Z = thickness, outward normal [0, 0, 1])
  for (let i = 0; i < indices.length; i += 3) {
    const i0 = indices[i];
    const i1 = indices[i+1];
    const i2 = indices[i+2];
    
    const v1 = [vertices[2*i0], vertices[2*i0+1], thickness];
    const v2 = [vertices[2*i1], vertices[2*i1+1], thickness];
    const v3 = [vertices[2*i2], vertices[2*i2+1], thickness];
    
    triangles.push({ v1, v2, v3 });
  }

  // Bottom Face (Z = 0, reverse winding to face downward normal [0, 0, -1])
  for (let i = 0; i < indices.length; i += 3) {
    const i0 = indices[i];
    const i1 = indices[i+1];
    const i2 = indices[i+2];
    
    const v1 = [vertices[2*i0], vertices[2*i0+1], 0];
    const v2 = [vertices[2*i2], vertices[2*i2+1], 0];
    const v3 = [vertices[2*i1], vertices[2*i1+1], 0];
    
    triangles.push({ v1, v2, v3 });
  }

  // 3. Extrude vertical walls along outer boundary (outward) & holes (inward)
  // Outer boundary vertices list
  const outerLoop = [
    [0, 0],
    [plateWidth, 0],
    [plateWidth, plateHeight],
    [0, plateHeight]
  ];
  addWallTriangles(outerLoop, thickness, triangles);

  // Hole loops
  for (const hole of cleanedHoles) {
    addWallTriangles(hole, thickness, triangles);
  }

  // 4. Construct Binary Buffer
  const buffer = new ArrayBuffer(80 + 4 + triangles.length * 50);
  const view = new DataView(buffer);

  // Header (80 bytes of padding spaces)
  for (let i = 0; i < 80; i++) {
    view.setUint8(i, 32);
  }

  // Triangle count (4 bytes Uint32)
  view.setUint32(80, triangles.length, true);

  // Facet data (50 bytes each)
  let offset = 84;
  for (const tri of triangles) {
    // Normal calculation
    const n = calculateNormal(tri.v1, tri.v2, tri.v3);
    
    // Normal (12 bytes)
    view.setFloat32(offset, n[0], true);
    view.setFloat32(offset + 4, n[1], true);
    view.setFloat32(offset + 8, n[2], true);
    
    // Vertices (3 * 12 = 36 bytes)
    view.setFloat32(offset + 12, tri.v1[0], true);
    view.setFloat32(offset + 16, tri.v1[1], true);
    view.setFloat32(offset + 20, tri.v1[2], true);
    
    view.setFloat32(offset + 24, tri.v2[0], true);
    view.setFloat32(offset + 28, tri.v2[1], true);
    view.setFloat32(offset + 32, tri.v2[2], true);
    
    view.setFloat32(offset + 36, tri.v3[0], true);
    view.setFloat32(offset + 40, tri.v3[1], true);
    view.setFloat32(offset + 44, tri.v3[2], true);
    
    // Attribute byte count (2 bytes)
    view.setUint16(offset + 48, 0, true);
    
    offset += 50;
  }

  return buffer;
}

function addWallTriangles(loop, thickness, triangles) {
  const n = loop.length;
  for (let i = 0; i < n; i++) {
    const pk = loop[i];
    const pk1 = loop[(i + 1) % n];
    
    const v1 = [pk[0], pk[1], thickness];
    const v2 = [pk1[0], pk1[1], thickness];
    const v3 = [pk[0], pk[1], 0];
    
    const v4 = [pk1[0], pk1[1], thickness];
    const v5 = [pk1[0], pk1[1], 0];
    const v6 = [pk[0], pk[1], 0];
    
    // Triangle 1: pk,T -> pk,0 -> pk1,T
    triangles.push({ v1: v1, v2: v3, v3: v2 });
    // Triangle 2: pk1,T -> pk,0 -> pk1,0
    triangles.push({ v1: v4, v2: v6, v3: v5 });
  }
}

function calculateNormal(v1, v2, v3) {
  const ux = v2[0] - v1[0];
  const uy = v2[1] - v1[1];
  const uz = v2[2] - v1[2];
  
  const vx = v3[0] - v1[0];
  const vy = v3[1] - v1[1];
  const vz = v3[2] - v1[2];
  
  let nx = uy * vz - uz * vy;
  let ny = uz * vx - ux * vz;
  let nz = ux * vy - uy * vx;
  
  const len = Math.hypot(nx, ny, nz);
  if (len === 0) return [0, 0, 1];
  return [nx / len, ny / len, nz / len];
}

// File download helper
function downloadFile(content, mimeType, filename) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Force a polygon loop to be oriented Clockwise (CW)
function forceClockwise(poly) {
  let area = 0;
  const n = poly.length;
  if (n < 3) return poly;
  for (let i = 0; i < n; i++) {
    const p1 = poly[i];
    const p2 = poly[(i + 1) % n];
    area += p1[0] * p2[1] - p2[0] * p1[1];
  }
  // CCW area is positive; we want CW (negative area) for earcut holes
  if (area > 0) {
    poly.reverse();
  }
  return poly;
}

// Browser & Node compatible wrapper for earcut library loading style
function earcutWrapper(vertices, holesIndices, dimensions) {
  if (typeof earcut === 'function') {
    return earcut(vertices, holesIndices, dimensions);
  } else if (typeof window !== 'undefined' && window.earcut) {
    if (typeof window.earcut === 'function') {
      return window.earcut(vertices, holesIndices, dimensions);
    } else if (typeof window.earcut.default === 'function') {
      return window.earcut.default(vertices, holesIndices, dimensions);
    }
  }
  throw new Error("Biblioteka 'earcut' do triangulacji 3D nie została załadowana! Sprawdź połączenie lub plik lokalny.");
}

// On-screen Javascript error display for easy debugging
if (typeof window !== 'undefined') {
  window.addEventListener('error', function(e) {
    const errDiv = document.createElement('div');
    errDiv.style.position = 'fixed';
    errDiv.style.bottom = '20px';
    errDiv.style.right = '20px';
    errDiv.style.background = 'rgba(239, 68, 68, 0.95)';
    errDiv.style.color = 'white';
    errDiv.style.padding = '16px';
    errDiv.style.borderRadius = '12px';
    errDiv.style.zIndex = '99999';
    errDiv.style.maxWidth = '450px';
    errDiv.style.fontFamily = 'monospace';
    errDiv.style.fontSize = '12px';
    errDiv.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    errDiv.innerHTML = '<strong>Błąd Javascript:</strong><br>' + e.message + '<br><small>Plik: ' + e.filename + ':' + e.lineno + '</small>';
    document.body.appendChild(errDiv);
  });
}

// Start app
document.addEventListener('DOMContentLoaded', init);
