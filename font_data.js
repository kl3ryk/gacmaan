// font_data.js - Normalized stencil font representation
// Character grid: X in [0, 10], Y in [0, 14]

const FONT_DATA = {
  // --- LATIN LETTERS (A-Z) ---
  'A': {
    segments: [
      [[0, 14], [0, 5]],     // 0: Left vertical lower
      [[0, 5], [4, 0]],      // 1: Left diagonal upper
      [[4, 0], [6, 0]],      // 2: Top horizontal peak
      [[6, 0], [10, 5]],     // 3: Right diagonal upper
      [[10, 5], [10, 14]],   // 4: Right vertical lower
      [[0, 8], [10, 8]]      // 5: Crossbar
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 2, t: 0.5 },
      { seg: 4, t: 0.5 }
    ]
  },
  'B': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [7, 0]],      // 1: Top horizontal
      [[7, 0], [10, 3]],     // 2: Top-right chamfer
      [[10, 3], [10, 7]],    // 3: Top-right vertical
      [[10, 7], [0, 7]],     // 4: Middle horizontal
      [[10, 7], [10, 11]],   // 5: Bottom-right vertical
      [[10, 11], [7, 14]],   // 6: Bottom-right chamfer
      [[7, 14], [0, 14]]     // 7: Bottom horizontal
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 3, t: 0.5 },
      { seg: 5, t: 0.5 }
    ]
  },
  'C': {
    segments: [
      [[10, 3], [7, 0]],     // 0: Top-right chamfer
      [[7, 0], [3, 0]],      // 1: Top horizontal
      [[3, 0], [0, 3]],      // 2: Top-left chamfer
      [[0, 3], [0, 11]],     // 3: Left vertical
      [[0, 11], [3, 14]],    // 4: Bottom-left chamfer
      [[3, 14], [7, 14]],    // 5: Bottom horizontal
      [[7, 14], [10, 11]]    // 6: Bottom-right chamfer
    ],
    bridges: [
      { seg: 2, t: 0.5 },
      { seg: 4, t: 0.5 }
    ]
  },
  'D': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [7, 0]],      // 1: Top horizontal
      [[7, 0], [10, 3]],     // 2: Top-right chamfer
      [[10, 3], [10, 11]],    // 3: Right vertical
      [[10, 11], [7, 14]],   // 4: Bottom-right chamfer
      [[7, 14], [0, 14]]     // 5: Bottom horizontal
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 3, t: 0.5 }
    ]
  },
  'E': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [10, 0]],     // 1: Top horizontal
      [[0, 7], [8, 7]],      // 2: Middle horizontal
      [[0, 14], [10, 14]]    // 3: Bottom horizontal
    ],
    bridges: [
      { seg: 0, t: 0.25 },
      { seg: 0, t: 0.75 }
    ]
  },
  'F': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [10, 0]],     // 1: Top horizontal
      [[0, 7], [8, 7]]       // 2: Middle horizontal
    ],
    bridges: [
      { seg: 0, t: 0.5 }
    ]
  },
  'G': {
    segments: [
      [[10, 3], [7, 0]],     // 0: Top-right chamfer
      [[7, 0], [3, 0]],      // 1: Top horizontal
      [[3, 0], [0, 3]],      // 2: Top-left chamfer
      [[0, 3], [0, 11]],     // 3: Left vertical
      [[0, 11], [3, 14]],    // 4: Bottom-left chamfer
      [[3, 14], [7, 14]],    // 5: Bottom horizontal
      [[7, 14], [10, 11]],   // 6: Bottom-right chamfer
      [[10, 11], [10, 7]],   // 7: Lower-right vertical
      [[10, 7], [6, 7]]      // 8: G-tick crossbar
    ],
    bridges: [
      { seg: 3, t: 0.5 },
      { seg: 7, t: 0.5 }
    ]
  },
  'H': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[10, 0], [10, 14]],   // 1: Right vertical
      [[0, 7], [10, 7]]      // 2: Crossbar
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 1, t: 0.5 }
    ]
  },
  'I': {
    segments: [
      [[5, 0], [5, 14]]      // 0: Vertical stem
    ],
    bridges: [
      { seg: 0, t: 0.5 }
    ]
  },
  'J': {
    segments: [
      [[0, 0], [10, 0]],     // 0: Top horizontal
      [[7, 0], [7, 11]],     // 1: Right vertical stem
      [[7, 11], [4, 14]],    // 2: Bottom-right chamfer
      [[4, 14], [1, 14]],    // 3: Bottom horizontal
      [[1, 14], [0, 11]]     // 4: Bottom-left chamfer
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'K': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 7], [8, 0]],      // 1: Upper diagonal
      [[0, 7], [10, 14]]     // 2: Lower diagonal
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 1, t: 0.5 },
      { seg: 2, t: 0.5 }
    ]
  },
  'L': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 14], [10, 14]]    // 1: Bottom horizontal
    ],
    bridges: [
      { seg: 0, t: 0.5 }
    ]
  },
  'M': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [5, 7]],      // 1: Left diagonal
      [[5, 7], [10, 0]],     // 2: Right diagonal
      [[10, 0], [10, 14]]    // 3: Right vertical
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 3, t: 0.5 }
    ]
  },
  'N': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [10, 14]],    // 1: Main diagonal
      [[10, 0], [10, 14]]    // 2: Right vertical
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 1, t: 0.5 },
      { seg: 2, t: 0.5 }
    ]
  },
  'O': {
    segments: [
      [[3, 0], [7, 0]],      // 0: Top horizontal
      [[7, 0], [10, 3]],     // 1: Top-right chamfer
      [[10, 3], [10, 11]],    // 2: Right vertical
      [[10, 11], [7, 14]],   // 3: Bottom-right chamfer
      [[7, 14], [3, 14]],    // 4: Bottom horizontal
      [[3, 14], [0, 11]],    // 5: Bottom-left chamfer
      [[0, 11], [0, 3]],     // 6: Left vertical
      [[0, 3], [3, 0]]       // 7: Top-left chamfer
    ],
    bridges: [
      { seg: 2, t: 0.5 },
      { seg: 6, t: 0.5 }
    ]
  },
  'P': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [7, 0]],      // 1: Top horizontal
      [[7, 0], [10, 3]],     // 2: Top-right chamfer
      [[10, 3], [10, 7]],    // 3: Right vertical
      [[10, 7], [0, 7]]      // 4: Middle horizontal
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 3, t: 0.5 }
    ]
  },
  'Q': {
    segments: [
      [[3, 0], [7, 0]],      // 0: Top horizontal
      [[7, 0], [10, 3]],     // 1: Top-right chamfer
      [[10, 3], [10, 10]],   // 2: Right vertical
      [[10, 10], [7, 13]],   // 3: Bottom-right chamfer
      [[7, 13], [3, 13]],    // 4: Bottom horizontal
      [[3, 13], [0, 10]],    // 5: Bottom-left chamfer
      [[0, 10], [0, 3]],     // 6: Left vertical
      [[0, 3], [3, 0]],      // 7: Top-left chamfer
      [[7, 10], [10, 14]]    // 8: Q-tail
    ],
    bridges: [
      { seg: 2, t: 0.5 },
      { seg: 6, t: 0.5 }
    ]
  },
  'R': {
    segments: [
      [[0, 0], [0, 14]],     // 0: Left vertical
      [[0, 0], [7, 0]],      // 1: Top horizontal
      [[7, 0], [10, 3]],     // 2: Top-right chamfer
      [[10, 3], [10, 7]],    // 3: Right vertical
      [[10, 7], [0, 7]],     // 4: Middle horizontal
      [[5, 7], [10, 14]]     // 5: Slanted leg
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 3, t: 0.5 },
      { seg: 5, t: 0.5 }
    ]
  },
  'S': {
    segments: [
      [[10, 3], [7, 0]],     // 0: Top-right chamfer
      [[7, 0], [3, 0]],      // 1: Top horizontal
      [[3, 0], [0, 3]],      // 2: Top-left chamfer
      [[0, 3], [0, 6]],      // 3: Upper-left vertical
      [[0, 6], [3, 8]],      // 4: Center-left chamfer
      [[3, 8], [7, 8]],      // 5: Middle horizontal
      [[7, 8], [10, 10]],    // 6: Center-right chamfer
      [[10, 10], [10, 11]],  // 7: Lower-right vertical
      [[10, 11], [7, 14]],   // 8: Bottom-right chamfer
      [[7, 14], [3, 14]],    // 9: Bottom horizontal
      [[3, 14], [0, 11]]     // 10: Bottom-left chamfer
    ],
    bridges: [
      { seg: 3, t: 0.5 },
      { seg: 7, t: 0.5 }
    ]
  },
  'T': {
    segments: [
      [[0, 0], [10, 0]],     // 0: Top horizontal
      [[5, 0], [5, 14]]      // 1: Vertical stem
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'U': {
    segments: [
      [[0, 0], [0, 11]],     // 0: Left vertical
      [[0, 11], [3, 14]],    // 1: Bottom-left chamfer
      [[3, 14], [7, 14]],    // 2: Bottom horizontal
      [[7, 14], [10, 11]],   // 3: Bottom-right chamfer
      [[10, 11], [10, 0]]    // 4: Right vertical
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 4, t: 0.5 }
    ]
  },
  'V': {
    segments: [
      [[0, 0], [0, 4]],      // 0: Left vertical stub
      [[0, 4], [4.5, 14]],   // 1: Left slanted leg
      [[10, 0], [10, 4]],    // 2: Right vertical stub
      [[10, 4], [5.5, 14]],  // 3: Right slanted leg
      [[4.5, 14], [5.5, 14]] // 4: Bottom tip
    ],
    bridges: [
      { seg: 1, t: 0.5 },
      { seg: 3, t: 0.5 }
    ]
  },
  'W': {
    segments: [
      [[0, 0], [2, 14]],     // 0: Outer-left diagonal
      [[2, 14], [5, 5]],      // 1: Inner-left diagonal
      [[5, 5], [8, 14]],      // 2: Inner-right diagonal
      [[8, 14], [10, 0]]     // 3: Outer-right diagonal
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 3, t: 0.5 }
    ]
  },
  'X': {
    segments: [
      [[0, 0], [10, 14]],    // 0: Diagonal 1
      [[10, 0], [0, 14]]     // 1: Diagonal 2
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 1, t: 0.5 }
    ]
  },
  'Y': {
    segments: [
      [[0, 0], [5, 7]],      // 0: Left diagonal
      [[10, 0], [5, 7]],     // 1: Right diagonal
      [[5, 7], [5, 14]]      // 2: Vertical stem
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'Z': {
    segments: [
      [[0, 0], [10, 0]],     // 0: Top horizontal
      [[10, 0], [0, 14]],    // 1: Main diagonal
      [[0, 14], [10, 14]]    // 2: Bottom horizontal
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },

  // --- NUMBERS (0-9) ---
  '0': {
    segments: [
      [[3, 0], [7, 0]],      // 0: Top horizontal
      [[7, 0], [10, 3]],     // 1: Top-right chamfer
      [[10, 3], [10, 11]],    // 2: Right vertical
      [[10, 11], [7, 14]],   // 3: Bottom-right chamfer
      [[7, 14], [3, 14]],    // 4: Bottom horizontal
      [[3, 14], [0, 11]],    // 5: Bottom-left chamfer
      [[0, 11], [0, 3]],     // 6: Left vertical
      [[0, 3], [3, 0]]       // 7: Top-left chamfer
    ],
    bridges: [
      { seg: 2, t: 0.5 },
      { seg: 6, t: 0.5 }
    ]
  },
  '1': {
    segments: [
      [[2, 3], [5, 0]],      // 0: Top flag
      [[5, 0], [5, 14]],     // 1: Center stem
      [[2, 14], [8, 14]]     // 2: Bottom base
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  '2': {
    segments: [
      [[0, 3], [3, 0]],      // 0: Top-left chamfer
      [[3, 0], [7, 0]],      // 1: Top horizontal
      [[7, 0], [10, 3]],     // 2: Top-right chamfer
      [[10, 3], [10, 6]],    // 3: Upper-right vertical
      [[10, 6], [0, 14]],    // 4: Main diagonal
      [[0, 14], [10, 14]]    // 5: Bottom base
    ],
    bridges: [
      { seg: 4, t: 0.5 }
    ]
  },
  '3': {
    segments: [
      [[0, 3], [3, 0]],      // 0: Top-left chamfer
      [[3, 0], [7, 0]],      // 1: Top horizontal
      [[7, 0], [10, 3]],     // 2: Top-right chamfer
      [[10, 3], [10, 6]],    // 3: Upper-right vertical
      [[10, 6], [6, 7]],      // 4: Middle loop return
      [[6, 7], [10, 8]],      // 5: Middle loop out
      [[10, 8], [10, 11]],   // 6: Lower-right vertical
      [[10, 11], [7, 14]],   // 7: Bottom-right chamfer
      [[7, 14], [3, 14]],    // 8: Bottom horizontal
      [[3, 14], [0, 11]]     // 9: Bottom-left chamfer
    ],
    bridges: [
      { seg: 3, t: 0.5 },
      { seg: 6, t: 0.5 }
    ]
  },
  '4': {
    segments: [
      [[7, 14], [7, 0]],     // 0: Right vertical stem
      [[7, 0], [0, 9]],      // 1: Left diagonal
      [[0, 9], [10, 9]]      // 2: Middle horizontal
    ],
    bridges: [
      { seg: 0, t: 0.3 },
      { seg: 1, t: 0.5 }
    ]
  },
  '5': {
    segments: [
      [[10, 0], [0, 0]],     // 0: Top horizontal
      [[0, 0], [0, 6]],      // 1: Upper-left vertical
      [[0, 6], [7, 6]],      // 2: Middle horizontal
      [[7, 6], [10, 9]],     // 3: Center-right chamfer
      [[10, 9], [10, 11]],   // 4: Lower-right vertical
      [[10, 11], [7, 14]],   // 5: Bottom-right chamfer
      [[7, 14], [3, 14]],    // 6: Bottom horizontal
      [[3, 14], [0, 11]]     // 7: Bottom-left chamfer
    ],
    bridges: [
      { seg: 1, t: 0.5 },
      { seg: 4, t: 0.5 }
    ]
  },
  '6': {
    segments: [
      [[7, 0], [3, 0]],      // 0: Top horizontal
      [[3, 0], [0, 3]],      // 1: Top-left chamfer
      [[0, 3], [0, 11]],     // 2: Left vertical stem
      [[0, 11], [3, 14]],    // 3: Bottom-left chamfer
      [[3, 14], [7, 14]],    // 4: Bottom horizontal
      [[7, 14], [10, 11]],   // 5: Bottom-right chamfer
      [[10, 11], [10, 8]],   // 6: Lower-right vertical
      [[10, 8], [7, 6]],      // 7: Loop-top chamfer
      [[7, 6], [0, 6]]       // 8: Middle horizontal
    ],
    bridges: [
      { seg: 2, t: 0.25 },
      { seg: 2, t: 0.75 },
      { seg: 6, t: 0.5 }
    ]
  },
  '7': {
    segments: [
      [[0, 0], [10, 0]],     // 0: Top horizontal
      [[10, 0], [4, 14]]     // 1: Slanted stem
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  '8': {
    segments: [
      [[3, 0], [7, 0]],      // 0: Top horizontal
      [[7, 0], [10, 3]],     // 1: Top-right chamfer
      [[10, 3], [10, 5.5]],  // 2: Upper-right vertical
      [[10, 5.5], [7, 7]],    // 3: Middle-right chamfer
      [[7, 7], [3, 7]],      // 4: Middle horizontal
      [[3, 7], [0, 5.5]],    // 5: Middle-left chamfer
      [[0, 5.5], [0, 3]],    // 6: Upper-left vertical
      [[0, 3], [3, 0]],      // 7: Top-left chamfer
      [[3, 7], [0, 8.5]],    // 8: Middle-left lower chamfer
      [[0, 8.5], [0, 11]],   // 9: Lower-left vertical
      [[0, 11], [3, 14]],    // 10: Bottom-left chamfer
      [[3, 14], [7, 14]],    // 11: Bottom horizontal
      [[7, 14], [10, 11]],   // 12: Bottom-right chamfer
      [[10, 11], [10, 8.5]],  // 13: Lower-right vertical
      [[10, 8.5], [7, 7]]     // 14: Middle-right lower chamfer
    ],
    bridges: [
      { seg: 2, t: 0.5 },
      { seg: 6, t: 0.5 },
      { seg: 9, t: 0.5 },
      { seg: 13, t: 0.5 }
    ]
  },
  '9': {
    segments: [
      [[10, 3], [10, 11]],   // 0: Right vertical stem
      [[10, 3], [7, 0]],      // 1: Top-right chamfer
      [[7, 0], [3, 0]],      // 2: Top horizontal
      [[3, 0], [0, 3]],      // 3: Top-left chamfer
      [[0, 3], [0, 6]],      // 4: Upper-left vertical
      [[0, 6], [3, 8]],      // 5: Loop-bottom chamfer
      [[3, 8], [7, 8]],      // 6: Middle horizontal
      [[7, 8], [10, 6]],     // 7: Loop-bottom-right chamfer
      [[10, 11], [7, 14]],   // 8: Bottom-right chamfer
      [[7, 14], [3, 14]]     // 9: Bottom horizontal
    ],
    bridges: [
      { seg: 0, t: 0.25 },
      { seg: 0, t: 0.75 },
      { seg: 4, t: 0.5 }
    ]
  },

  // --- JAPANESE KATAKANA (46 Standard Characters) ---
  'ア': { // a
    segments: [
      [[1, 2], [9, 2]],      // 0: Top horizontal
      [[9, 2], [9, 5]],      // 1: Top-right vertical stub
      [[9, 5], [6, 8]],      // 2: Slanted hook down-left
      [[4, 2], [1, 12]]      // 3: Left slanted curve
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'イ': { // i
    segments: [
      [[8, 1], [2, 7]],      // 0: Left slanted stroke
      [[5, 4], [5, 14]]      // 1: Right vertical stem
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'ウ': { // u
    segments: [
      [[5, 0], [5, 3]],      // 0: Top vertical tick
      [[1, 3], [9, 3]],      // 1: Top horizontal bar
      [[9, 3], [9, 6]],      // 2: Right vertical stub
      [[9, 6], [2, 14]]      // 3: Main slanted curve
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'エ': { // e
    segments: [
      [[2, 1], [8, 1]],      // 0: Top horizontal
      [[5, 1], [5, 13]],     // 1: Vertical stem
      [[0, 13], [10, 13]]    // 2: Bottom horizontal
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'オ': { // o
    segments: [
      [[1, 4], [9, 4]],      // 0: Horizontal bar
      [[5, 0], [5, 11]],     // 1: Vertical stem
      [[5, 11], [2, 14]],    // 2: Bottom-left hook
      [[6, 6], [9, 11]]      // 3: Diagonal tick on right
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'カ': { // ka
    segments: [
      [[1, 3], [8, 3]],      // 0: Horizontal top bar
      [[8, 3], [8, 6]],      // 1: Right vertical hook stub
      [[8, 6], [5, 14]],     // 2: Main slanted stroke
      [[3, 0], [1, 11]],     // 3: Left diagonal stroke
      [[6, 1], [9, 5]]       // 4: Right tick
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'キ': { // ki
    segments: [
      [[2, 3], [8, 3]],      // 0: Top horizontal
      [[1, 6], [9, 6]],      // 1: Middle horizontal
      [[5, 0], [3, 14]],     // 2: Slanted vertical stem
      [[3, 14], [6, 12]]     // 3: Bottom-right hook
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'ク': { // ku
    segments: [
      [[8, 1], [3, 6]],      // 0: Top-left slanted stroke
      [[3, 6], [9, 6]],      // 1: Top horizontal
      [[9, 6], [2, 14]]      // 2: Main slanted drop
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'ケ': { // ke
    segments: [
      [[8, 1], [3, 4]],      // 0: Top slanted stroke
      [[1, 6], [9, 6]],      // 1: Middle horizontal
      [[5, 4], [3, 14]]      // 2: Slanted vertical stem
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'コ': { // ko
    segments: [
      [[1, 2], [9, 2]],      // 0: Top horizontal
      [[9, 2], [9, 12]],     // 1: Right vertical
      [[1, 12], [9, 12]]     // 2: Bottom horizontal
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'サ': { // sa
    segments: [
      [[1, 4], [9, 4]],      // 0: Horizontal crossbar
      [[3, 1], [3, 9]],      // 1: Left vertical stub
      [[3, 9], [5, 11]],     // 2: Left bottom hook
      [[7, 1], [7, 14]]      // 3: Right vertical stem
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'シ': { // shi
    segments: [
      [[2, 3], [4, 4]],      // 0: Top tick
      [[2, 7], [4, 8]],      // 1: Middle tick
      [[2, 14], [8, 2]]      // 2: Main slanted swoop
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'ス': { // su
    segments: [
      [[1, 3], [8, 3]],      // 0: Top horizontal
      [[8, 3], [2, 14]],     // 1: Main diagonal leg
      [[5, 8], [9, 13]]      // 2: Left branch tick
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'セ': { // se
    segments: [
      [[1, 3], [9, 3]],      // 0: Top horizontal
      [[3, 3], [3, 11]],     // 1: Left vertical
      [[3, 11], [8, 11]],    // 2: Left bottom horizontal
      [[7, 0], [7, 14]],     // 3: Right vertical
      [[7, 14], [5, 14]]     // 4: Right bottom hook
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'ソ': { // so
    segments: [
      [[3, 2], [5, 5]],      // 0: Left tick
      [[8, 2], [2, 14]]      // 1: Main diagonal sweep
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'タ': { // ta
    segments: [
      [[8, 1], [3, 5]],      // 0: Top slanted
      [[3, 5], [9, 5]],      // 1: Top horizontal
      [[9, 5], [2, 14]],     // 2: Main slanted drop
      [[3, 9], [7, 9]]       // 3: Inner horizontal tick
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'チ': { // chi
    segments: [
      [[8, 1], [2, 3]],      // 0: Top slanted slash
      [[1, 6], [9, 6]],      // 1: Middle horizontal
      [[5, 3], [5, 11]],     // 2: Vertical stem
      [[5, 11], [2, 14]]     // 3: Bottom-left hook
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'ツ': { // tsu
    segments: [
      [[2, 2], [3, 4]],      // 0: Top tick
      [[5, 2], [6, 4]],      // 1: Middle tick
      [[8, 14], [2, 4]]      // 2: Main slanted swoop
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'テ': { // te
    segments: [
      [[3, 3], [7, 3]],      // 0: Top horizontal
      [[1, 6], [9, 6]],      // 1: Middle horizontal
      [[5, 6], [5, 10]],     // 2: Vertical stem stub
      [[5, 10], [1, 14]]     // 3: Slanted bottom-left leg
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'ト': { // to
    segments: [
      [[5, 1], [5, 14]],     // 0: Vertical stem
      [[5, 6], [9, 10]]      // 1: Side tick
    ],
    bridges: [
      { seg: 0, t: 0.5 }
    ]
  },
  'ナ': { // na
    segments: [
      [[1, 4], [9, 4]],      // 0: Horizontal bar
      [[5, 1], [2, 14]]      // 1: Slanted vertical stem
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'ニ': { // ni
    segments: [
      [[2, 3], [8, 3]],      // 0: Top horizontal
      [[1, 11], [9, 11]]     // 1: Bottom horizontal
    ],
    bridges: [] // No bridges needed, separate lines
  },
  'ヌ': { // nu
    segments: [
      [[1, 3], [8, 3]],      // 0: Top horizontal
      [[8, 3], [2, 14]],     // 1: Main diagonal leg
      [[3, 1], [8, 13]],     // 2: Cross diagonal slash
      [[7, 9], [9, 12]]      // 3: Small bottom-right tick
    ],
    bridges: [
      { seg: 1, t: 0.5 },
      { seg: 2, t: 0.5 }
    ]
  },
  'ネ': { // ne
    segments: [
      [[3, 0], [3, 2]],      // 0: Top tick
      [[1, 2], [7, 2]],      // 1: Horizontal top
      [[7, 2], [2, 12]],     // 2: Upper diagonal drop
      [[5, 2], [5, 14]],     // 3: Main vertical stem
      [[5, 7], [9, 12]]      // 4: Right diagonal tick
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'ノ': { // no
    segments: [
      [[8, 1], [2, 14]]      // 0: Single slanted sweep
    ],
    bridges: [
      { seg: 0, t: 0.5 }
    ]
  },
  'ハ': { // ha
    segments: [
      [[4, 2], [1, 13]],     // 0: Left slanted leg
      [[6, 2], [9, 13]]      // 1: Right slanted leg
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 1, t: 0.5 }
    ]
  },
  'ヒ': { // hi
    segments: [
      [[1, 3], [9, 3]],      // 0: Top horizontal
      [[3, 3], [3, 10]],     // 1: Left vertical stem
      [[3, 10], [7, 10]],    // 2: Bottom horizontal connector
      [[7, 10], [7, 14]]     // 3: Right vertical stem
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'フ': { // fu
    segments: [
      [[1, 3], [9, 3]],      // 0: Top horizontal
      [[9, 3], [5, 8]],      // 1: Upper slanted drop
      [[5, 8], [2, 14]]      // 2: Lower slanted sweep
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'ヘ': { // he
    segments: [
      [[1, 11], [4, 3]],     // 0: Upward slanted line
      [[4, 3], [9, 11]]      // 1: Downward slanted line
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'ホ': { // ho
    segments: [
      [[2, 3], [8, 3]],      // 0: Top horizontal
      [[5, 0], [5, 14]],     // 1: Center vertical stem
      [[3, 7], [1, 10]],     // 2: Left slanted branch
      [[7, 7], [9, 10]]      // 3: Right slanted branch
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'マ': { // ma
    segments: [
      [[2, 3], [8, 3]],      // 0: Top horizontal
      [[1, 7], [7, 7]],      // 1: Middle horizontal
      [[5, 3], [2, 14]]      // 2: Slanted vertical leg
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'ミ': { // mi
    segments: [
      [[2, 3], [8, 5]],      // 0: Top slanted stroke
      [[1, 7], [7, 9]],      // 1: Middle slanted stroke
      [[0, 11], [6, 13]]     // 2: Bottom slanted stroke
    ],
    bridges: [] // Separate strokes, no bridges needed
  },
  'ム': { // mu
    segments: [
      [[5, 2], [1, 10]],     // 0: Upper slanted drop
      [[1, 10], [7, 10]],    // 1: Bottom horizontal connector
      [[7, 10], [9, 6]],     // 2: Loop upward return
      [[5, 10], [8, 14]]     // 3: Bottom-right tick
    ],
    bridges: [
      { seg: 0, t: 0.5 }
    ]
  },
  'メ': { // me
    segments: [
      [[3, 2], [8, 14]],     // 0: Main diagonal slash
      [[7, 2], [2, 10]],     // 1: Crossing slanted upper
      [[2, 10], [1, 12]]     // 2: Crossing slanted lower hook
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 1, t: 0.5 }
    ]
  },
  'モ': { // mo
    segments: [
      [[2, 3], [8, 3]],      // 0: Top horizontal
      [[1, 6], [9, 6]],      // 1: Middle horizontal
      [[5, 0], [5, 11]],     // 2: Vertical stem
      [[5, 11], [8, 11]]     // 3: Bottom horizontal hook
    ],
    bridges: [
      { seg: 2, t: 0.5 }
    ]
  },
  'ヤ': { // ya
    segments: [
      [[1, 6], [8, 4]],      // 0: Horizontal hook top
      [[8, 4], [8, 8]],      // 1: Vertical hook drop
      [[8, 8], [5, 14]],     // 2: Diagonal hook bottom
      [[3, 1], [5, 4]],      // 3: Left tick slanted
      [[6, 1], [3, 14]]      // 4: Main slanted stem
    ],
    bridges: [
      { seg: 4, t: 0.5 }
    ]
  },
  'ユ': { // yu
    segments: [
      [[1, 3], [8, 3]],      // 0: Top horizontal
      [[8, 3], [8, 9]],      // 1: Right vertical
      [[8, 9], [1, 9]],      // 2: Bottom horizontal
      [[4, 0], [4, 14]]      // 3: Vertical cross stem
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'ヨ': { // yo
    segments: [
      [[1, 2], [8, 2]],      // 0: Top horizontal
      [[8, 2], [8, 12]],     // 1: Right vertical
      [[8, 12], [1, 12]],    // 2: Bottom horizontal
      [[3, 7], [8, 7]]       // 3: Middle horizontal
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'ラ': { // ra
    segments: [
      [[3, 2], [7, 2]],      // 0: Top horizontal tick
      [[2, 6], [8, 6]],      // 1: Middle horizontal
      [[8, 6], [8, 10]],     // 2: Right vertical drop
      [[8, 10], [3, 14]]     // 3: Slanted bottom-left hook
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'リ': { // ri
    segments: [
      [[3, 2], [3, 8]],      // 0: Left short vertical
      [[7, 1], [7, 12]],     // 1: Right vertical stem
      [[7, 12], [5, 14]]     // 2: Bottom hook
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  },
  'ル': { // ru
    segments: [
      [[2, 2], [2, 8]],      // 0: Left vertical stem stub
      [[2, 8], [6, 14]],     // 1: Left bottom diagonal
      [[7, 2], [7, 10]],     // 2: Right vertical stem
      [[7, 10], [4, 14]],    // 3: Right bottom diagonal
      [[4, 14], [7, 14]],    // 4: Bottom horizontal loop-base
      [[7, 14], [7, 12]]     // 5: Bottom vertical loop-up
    ],
    bridges: [
      { seg: 1, t: 0.5 },
      { seg: 2, t: 0.5 }
    ]
  },
  'レ': { // re
    segments: [
      [[2, 2], [2, 12]],     // 0: Left vertical stem
      [[2, 12], [8, 2]]      // 1: Right slanted up-tick
    ],
    bridges: [
      { seg: 0, t: 0.5 }
    ]
  },
  'ロ': { // ro
    segments: [
      [[1, 2], [9, 2]],      // 0: Top horizontal
      [[9, 2], [9, 12]],     // 1: Right vertical
      [[9, 12], [1, 12]],    // 2: Bottom horizontal
      [[1, 12], [1, 2]]      // 3: Left vertical
    ],
    bridges: [
      { seg: 1, t: 0.5 },
      { seg: 3, t: 0.5 }
    ]
  },
  'ワ': { // wa
    segments: [
      [[2, 2], [2, 14]],     // 0: Left vertical stem
      [[2, 2], [8, 2]],      // 1: Top horizontal
      [[8, 2], [8, 8]],      // 2: Right vertical drop stub
      [[8, 8], [3, 14]]      // 3: Slanted bottom-left hook
    ],
    bridges: [
      { seg: 0, t: 0.5 },
      { seg: 3, t: 0.5 }
    ]
  },
  'ヲ': { // wo
    segments: [
      [[2, 2], [8, 2]],      // 0: Top horizontal
      [[1, 6], [7, 6]],      // 1: Middle horizontal
      [[4, 6], [8, 10]],     // 2: Diagonal connector
      [[8, 10], [3, 14]]     // 3: Slanted bottom-left hook
    ],
    bridges: [
      { seg: 3, t: 0.5 }
    ]
  },
  'ン': { // n
    segments: [
      [[2, 3], [4, 5]],      // 0: Top slanted tick
      [[2, 14], [8, 2]]      // 1: Slanted swoop upward
    ],
    bridges: [
      { seg: 1, t: 0.5 }
    ]
  }
};

// Export for ES6 modules if loaded in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FONT_DATA };
} else {
  window.FONT_DATA = FONT_DATA;
}
