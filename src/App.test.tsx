import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { PLAYER1, PLAYER2, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from './game-constants';
import { mountBoardMatrix, constructPiece, clearHighlights, highlightPlayer, highlightPossibleMovement } from './game-logic';
import { IPiece } from './game-models';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('mounts a board', () => {
  expect(mountBoardMatrix(PLAYER1, PLAYER2))
    .toEqual(
      [
        [
          {coordinates:{row:0,col:0},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:0,col:1},selectable:false,king:false},
          {coordinates:{row:0,col:2},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:0,col:3},selectable:false,king:false},
          {coordinates:{row:0,col:4},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:0,col:5},selectable:false,king:false},
          {coordinates:{row:0,col:6},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:0,col:7},selectable:false,king:false}
        ],
        [
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:1,col:0},selectable:false,king:false},
          {coordinates:{row:1,col:1},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:1,col:2},selectable:false,king:false},
          {coordinates:{row:1,col:3},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:1,col:4},selectable:false,king:false},
          {coordinates:{row:1,col:5},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:1,col:6},selectable:false,king:false},
          {coordinates:{row:1,col:7},selectable:false,king:false}
        ],
        [
          {coordinates:{row:2,col:0},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:2,col:1},selectable:false,king:false},
          {coordinates:{row:2,col:2},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:2,col:3},selectable:false,king:false},
          {coordinates:{row:2,col:4},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:2,col:5},selectable:false,king:false},
          {coordinates:{row:2,col:6},selectable:false,king:false},
          {owner:{id:PLAYER2.id,color:PLAYER2.color,direction:1},coordinates:{row:2,col:7},selectable:false,king:false}
        ],
        [
          {coordinates:{row:3,col:0},selectable:false,king:false},
          {coordinates:{row:3,col:1},selectable:false,king:false},
          {coordinates:{row:3,col:2},selectable:false,king:false},
          {coordinates:{row:3,col:3},selectable:false,king:false},
          {coordinates:{row:3,col:4},selectable:false,king:false},
          {coordinates:{row:3,col:5},selectable:false,king:false},
          {coordinates:{row:3,col:6},selectable:false,king:false},
          {coordinates:{row:3,col:7},selectable:false,king:false}
        ],
        [
          {coordinates:{row:4,col:0},selectable:false,king:false},
          {coordinates:{row:4,col:1},selectable:false,king:false},
          {coordinates:{row:4,col:2},selectable:false,king:false},
          {coordinates:{row:4,col:3},selectable:false,king:false},
          {coordinates:{row:4,col:4},selectable:false,king:false},
          {coordinates:{row:4,col:5},selectable:false,king:false},
          {coordinates:{row:4,col:6},selectable:false,king:false},
          {coordinates:{row:4,col:7},selectable:false,king:false}
        ],
        [
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:0},selectable:false,king:false},
          {coordinates:{row:5,col:1},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:2},selectable:false,king:false},
          {coordinates:{row:5,col:3},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:4},selectable:false,king:false},
          {coordinates:{row:5,col:5},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:6},selectable:false,king:false},
          {coordinates:{row:5,col:7},selectable:false,king:false}
        ],
        [
          {coordinates:{row:6,col:0},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:1},selectable:false,king:false},
          {coordinates:{row:6,col:2},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:3},selectable:false,king:false},
          {coordinates:{row:6,col:4},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:5},selectable:false,king:false},
          {coordinates:{row:6,col:6},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:7},selectable:false,king:false}
        ],
        [
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:0},selectable:false,king:false},
          {coordinates:{row:7,col:1},selectable:false,king:false}
          ,{owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:2},selectable:false,king:false},
          {coordinates:{row:7,col:3},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:4},selectable:false,king:false},
          {coordinates:{row:7,col:5},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:6},selectable:false,king:false},
          {coordinates:{row:7,col:7},selectable:false,king:false}
        ]
      ]
    );

    expect(mountBoardMatrix(PLAYER1, PLAYER2)).toHaveLength(NUMBER_OF_ROWS);
    expect(mountBoardMatrix(PLAYER1, PLAYER2)[0]).toHaveLength(NUMBER_OF_COLUMNS);


})

it('constructs pieces', () => {
  expect(constructPiece(0,0)).toEqual({
    coordinates: {
      row: 0,
      col: 0,
    },
    selectable: false,
    king: false
  });

  expect(constructPiece(9,9,PLAYER2)).toEqual({coordinates: {
      row: 9,
      col: 9,
    },
    owner: PLAYER2,
    selectable: false,
    king: false});
});

it ('clear highlights', () => {
  let boardMatrix: IPiece[][] = [
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: true},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {coordinates:{col: 2,row: 0},king: false,selectable: true},
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {coordinates:{col: 1,row: 1},king: false,selectable: true},
      {coordinates:{col: 2,row: 1},king: false,selectable: true},
    ],
  ];
  boardMatrix = clearHighlights(boardMatrix);
  expect(boardMatrix.every(boardRow => boardRow.every(piece => piece.selectable === false))).toBe(true);
});

it('highlights player', () => {
  const boardMatrix: IPiece[][] = [
    [
      {owner: PLAYER1, coordinates:{col: 0,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 1,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 3,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {owner: PLAYER1, coordinates:{col: 0,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 1,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {owner: PLAYER2, coordinates:{col: 0,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 1,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 2,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ];
  
  expect(highlightPlayer(boardMatrix, PLAYER2)).toEqual([
    [
      {owner: PLAYER1, coordinates:{col: 0,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 1,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 3,row: 0},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {owner: PLAYER1, coordinates:{col: 0,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 1,row: 1},king: false,selectable: true},
      {owner: PLAYER1, coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 1},king: false,selectable: true},
      {owner: PLAYER1, coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {owner: PLAYER2, coordinates:{col: 0,row: 2},king: false,selectable: true},
      {owner: PLAYER2, coordinates:{col: 1,row: 2},king: false,selectable: true},
      {owner: PLAYER2, coordinates:{col: 2,row: 2},king: false,selectable: true},
      {owner: PLAYER2, coordinates:{col: 3,row: 2},king: false,selectable: true},
      {owner: PLAYER2, coordinates:{col: 4,row: 2},king: false,selectable: true}
    ]
  ]);
  expect(highlightPlayer(boardMatrix, PLAYER1)).toEqual([
    [
      {owner: PLAYER1, coordinates:{col: 0,row: 0},king: false,selectable: true},
      {owner: PLAYER1, coordinates:{col: 1,row: 0},king: false,selectable: true},
      {owner: PLAYER1, coordinates:{col: 2,row: 0},king: false,selectable: true},
      {owner: PLAYER1, coordinates:{col: 3,row: 0},king: false,selectable: true},
      {owner: PLAYER1, coordinates:{col: 4,row: 0},king: false,selectable: true}
    ],
    [
      {owner: PLAYER1, coordinates:{col: 0,row: 1},king: false,selectable: true},
      {owner: PLAYER2, coordinates:{col: 1,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 1},king: false,selectable: true},
      {owner: PLAYER2, coordinates:{col: 3,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 4,row: 1},king: false,selectable: true}
    ],
    [
      {owner: PLAYER2, coordinates:{col: 0,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 1,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 2,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 2},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ]);
})

it('highlights movement player 1', () => {
  let boardMatrix: IPiece[][] = [
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: false},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 1,row: 1},king: false,selectable: false},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 1},king: false,selectable: false},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: false},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ];

  expect(highlightPossibleMovement(boardMatrix, boardMatrix[2][2], false)).toEqual([
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: true},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: true}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 1,row: 1},king: false,selectable: false, killableByMovement: {col:0, row: 0}},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 1},king: false,selectable: false, killableByMovement: {col:4, row: 0}},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: false},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ]);

  boardMatrix = [
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: false},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {coordinates:{col: 1,row: 1},king: false,selectable: false},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 1},king: false,selectable: false},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: false},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ];

  expect(highlightPossibleMovement(boardMatrix, boardMatrix[2][2], false)).toEqual([
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: false},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: true}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {coordinates:{col: 1,row: 1},king: false,selectable: true},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 3,row: 1},king: false,selectable: false, killableByMovement: {col:4, row: 0}},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: false},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ]);
});


it('highlights movement player 2', () => {
  let boardMatrix: IPiece[][] = [
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: false},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 1,row: 1},king: false,selectable: false},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 3,row: 1},king: false,selectable: false},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: false},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ];

  expect(highlightPossibleMovement(boardMatrix, boardMatrix[0][2], false)).toEqual([
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: false},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 1,row: 1},king: false,selectable: false, killableByMovement: {col:0, row: 2}},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 3,row: 1},king: false,selectable: false, killableByMovement: {col:4, row: 2}},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: true},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: true}
    ]
  ]);

  boardMatrix = [
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: false},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {coordinates:{col: 1,row: 1},king: false,selectable: false},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 3,row: 1},king: false,selectable: false, killableByMovement: {col:4, row: 2}},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: false},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: false}
    ]
  ];
  expect(highlightPossibleMovement(boardMatrix, boardMatrix[0][2], false)).toEqual([
    [
      {coordinates:{col: 0,row: 0},king: false,selectable: false},
      {coordinates:{col: 1,row: 0},king: false,selectable: false},
      {owner: PLAYER2, coordinates:{col: 2,row: 0},king: false,selectable: false},
      {coordinates:{col: 3,row: 0},king: false,selectable: false},
      {coordinates:{col: 4,row: 0},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 1},king: false,selectable: false},
      {coordinates:{col: 1,row: 1},king: false,selectable: true},
      {coordinates:{col: 2,row: 1},king: false,selectable: false},
      {owner: PLAYER1, coordinates:{col: 3,row: 1},king: false,selectable: false, killableByMovement: {col:4, row: 2}},
      {coordinates:{col: 4,row: 1},king: false,selectable: false}
    ],
    [
      {coordinates:{col: 0,row: 2},king: false,selectable: false},
      {coordinates:{col: 1,row: 2},king: false,selectable: false},
      {coordinates:{col: 2,row: 2},king: false,selectable: false},
      {coordinates:{col: 3,row: 2},king: false,selectable: false},
      {coordinates:{col: 4,row: 2},king: false,selectable: true}
    ]
  ]);
});