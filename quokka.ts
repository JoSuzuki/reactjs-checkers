import { IPiece, IPlayer } from "./src/game-models";
import { PLAYER1, PLAYER2, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from "./src/game-constants";


function constructPiece(row: number, col: number, player?: IPlayer): IPiece {
  if (player) {
    return {
      owner: player,
      coordinates: {
        row,
        col
      },
      selectable: player.turn,
      king: false
    }
  } else {
    return {
      coordinates: {
        row,
        col
      },
      selectable: false,
      king: false
    }
  }
}


const boardMatrix = [];
for (let i = 0; i < NUMBER_OF_ROWS; i++) {
  const boardRow = [];
  for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
    if(i < 3 && ((!isOdd(i) && isOdd(j)) || isOdd(i) && !isOdd(j))) {
      boardRow.push(constructPiece(i, j, PLAYER2));
    } else if (i > 4 && ((!isOdd(i) && isOdd(j)) || isOdd(i) && !isOdd(j))) {
      boardRow.push(constructPiece(i, j, PLAYER1));
    } else {
      boardRow.push(constructPiece(i, j));
    }
  }
  boardMatrix.push(boardRow);
}

console.log(boardMatrix);

// boardMatrix.map(row => row.map(item => console.log(item.alive)));

function isOdd(number: number): boolean {
  return number % 2 ? true : false;
}


const players = [
  PLAYER1,
  PLAYER2
];

// function calculatePossibleMovement(
//   matrixBoard: IPiece[][], 
//   movement: MovementDirection, 
//   row: number, col: number, id: number) {
    
// }

