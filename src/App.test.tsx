import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { PLAYER1, PLAYER2, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from './game-constants';
import { mountBoardMatrix, constructPiece } from './game-logic';

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
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:0},selectable:true,king:false},
          {coordinates:{row:5,col:1},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:2},selectable:true,king:false},
          {coordinates:{row:5,col:3},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:4},selectable:true,king:false},
          {coordinates:{row:5,col:5},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:5,col:6},selectable:true,king:false},
          {coordinates:{row:5,col:7},selectable:false,king:false}
        ],
        [
          {coordinates:{row:6,col:0},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:1},selectable:true,king:false},
          {coordinates:{row:6,col:2},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:3},selectable:true,king:false},
          {coordinates:{row:6,col:4},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:5},selectable:true,king:false},
          {coordinates:{row:6,col:6},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:6,col:7},selectable:true,king:false}
        ],
        [
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:0},selectable:true,king:false},
          {coordinates:{row:7,col:1},selectable:false,king:false}
          ,{owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:2},selectable:true,king:false},
          {coordinates:{row:7,col:3},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:4},selectable:true,king:false},
          {coordinates:{row:7,col:5},selectable:false,king:false},
          {owner:{id:PLAYER1.id,color:PLAYER1.color,direction:0},coordinates:{row:7,col:6},selectable:true,king:false},
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

// it ()