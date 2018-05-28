import { MovementDirection, NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, PLAYER1 } from './game-constants';
import { IPiece, IPlayer } from './game-models';

export function checkIfWon(boardMatrix: IPiece[][], players: IPlayer[]) {
  for (const player of players) {
    if (boardMatrix.some(boardRow => boardRow.some(piece => piece.owner === player)) === false) {
      return true;
    }
  }
  return false;
}

export function nextTurnOwner(currentTurnOwner: IPlayer, players: IPlayer[]): IPlayer {
  const index = players.indexOf(currentTurnOwner);
  return players[index + 1 >= players.length ? 0 : index + 1];
}

export function movePiece(boardMatrix: IPiece[][], selectedMovement: IPiece, currentPiece: IPiece) {
  boardMatrix[selectedMovement.coordinates.row][selectedMovement.coordinates.col].owner = currentPiece.owner;
  boardMatrix[selectedMovement.coordinates.row][selectedMovement.coordinates.col].king = 
    selectedMovement.coordinates.row === 0 || selectedMovement.coordinates.row === NUMBER_OF_ROWS - 1 ? true : currentPiece.king;
  boardMatrix[currentPiece.coordinates.row][currentPiece.coordinates.col].owner = undefined;
  boardMatrix[currentPiece.coordinates.row][currentPiece.coordinates.col].king = false;
  return boardMatrix;
}

export function hasKillablePieces(boardMatrix: IPiece[][]) {
  return boardMatrix.some(boardRow => boardRow.some(piece => Boolean(piece.killableByMovement)));
}

export function killPieceFn (boardMatrix: IPiece[][], selectedPiece: IPiece) {
  const killed = boardMatrix.some(boardRow => boardRow.some(piece => piece.killableByMovement === selectedPiece.coordinates));
  boardMatrix = boardMatrix.map(boardRow => boardRow.map(piece => {
    if (piece.killableByMovement === selectedPiece.coordinates) {
      piece.owner = undefined;
      piece.selectable = false;
      piece.king = false;
      piece.killableByMovement = undefined;
    }
    return piece;
  }));
  return {boardMatrix, killed}
}

export function clearHighlights(boardMatrix: IPiece[][]) {
  return boardMatrix.map(boardRow => boardRow.map(piece => {
    piece.selectable = false;
    piece.killableByMovement = undefined;
    return piece;
  }));
}

export function highlightPlayer(boardMatrix: IPiece[][], player: IPlayer): IPiece[][] {
  const newBoardMatrix = boardMatrix.map(boardRow => boardRow.map(piece => {
    if (piece.owner === player) {
      piece.selectable = true;            
    } else {
      piece.selectable = false;
    }
    return piece;
  }));
  return newBoardMatrix;
}

export function highlightPossibleMovement(boardMatrix: IPiece[][], piece: IPiece, onlyKillable: boolean): IPiece[][] {
  if (piece.owner) {
    if (piece.king) {
      boardMatrix = highlightMovement(boardMatrix, piece, onlyKillable, true);
      boardMatrix = highlightMovement(boardMatrix, piece, onlyKillable, false);
    } else if(piece.owner.direction === MovementDirection.Upwards) {
      boardMatrix = highlightMovement(boardMatrix, piece, onlyKillable, true);
    } else {
      boardMatrix = highlightMovement(boardMatrix, piece, onlyKillable, false);
    }
  }
  return boardMatrix;
}

export function highlightMovement(boardMatrix: IPiece[][], piece: IPiece, onlyKillable: boolean, upwards: boolean): IPiece[][] {
  piece.owner = piece.owner ? piece.owner : PLAYER1;
  const nextRow = upwards ? piece.coordinates.row - 1 : piece.coordinates.row + 1;
  const checkNext = upwards ? nextRow >= 0 : nextRow < NUMBER_OF_ROWS;
  const nextNextRow = upwards ? piece.coordinates.row - 2 : piece.coordinates.row + 2;
  const checkNextNext = upwards ? nextNextRow >= 0 : nextNextRow < NUMBER_OF_ROWS;
  const rightCol = piece.coordinates.col + 1;
  const checkRightNode = rightCol < NUMBER_OF_COLUMNS;
  const rightRightCol = piece.coordinates.col + 2;
  const checkRightRightNode = rightRightCol < NUMBER_OF_COLUMNS;
  const leftCol = piece.coordinates.col - 1;
  const checkLeftNode = leftCol >= 0;
  const leftLeftCol = piece.coordinates.col - 2;
  const checkLeftLeftNode = leftLeftCol >= 0;
  boardMatrix = hilightNextNodes(
    boardMatrix,
    piece,
    nextRow,
    rightCol,
    checkNext && checkRightNode,
    nextNextRow,
    rightRightCol,
    checkNextNext && checkRightRightNode,
    onlyKillable
  );
  boardMatrix = hilightNextNodes(
    boardMatrix,
    piece,
    nextRow,
    leftCol,
    checkNext && checkLeftNode,
    nextNextRow,
    leftLeftCol,
    checkNextNext && checkLeftLeftNode,
    onlyKillable
  )
  return boardMatrix;
}

export function hilightNextNodes(
    boardMatrix: IPiece[][],
    piece: IPiece,
    nextRow: number,
    nextCol: number,
    checkNext: boolean,
    nextNextRow: number,
    nextNextCol: number,
    checkNextNext: boolean,
    onlyKillable: boolean
  ) {
  if (piece.owner) {
    if (checkNext) {
      const nextNode = boardMatrix[nextRow][nextCol].owner;
      if (!nextNode) {
        if (!onlyKillable) {
          boardMatrix[nextRow][nextCol].selectable = true;
        }
      } else if(nextNode.id !== piece.owner.id) {
        if(checkNextNext) {
          if (!boardMatrix[nextNextRow][nextNextCol].owner) {
            boardMatrix[nextRow][nextCol].killableByMovement = boardMatrix[nextNextRow][nextNextCol].coordinates;
            boardMatrix[nextNextRow][nextNextCol].selectable =  true;
          }
        }
      }
    }
  }
  return boardMatrix;
}

export function mountBoardMatrix(player1: IPlayer, player2: IPlayer) {
  const boardMatrix = [];
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    const boardRow = [];
    for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
      if(i < 3 && ((!isOdd(i) && isOdd(j)) || isOdd(i) && !isOdd(j))) {
        boardRow.push(constructPiece(i, j, player2));
      } else if (i > 4 && ((!isOdd(i) && isOdd(j)) || isOdd(i) && !isOdd(j))) {
        boardRow.push(constructPiece(i, j, player1));
      } else {
        boardRow.push(constructPiece(i, j));
      }
    }
    boardMatrix.push(boardRow);
  }
  return boardMatrix;
}

export function constructPiece(row: number, col: number, player?: IPlayer): IPiece {
  if (player) {
    return {
      owner: player,
      coordinates: {
        row,
        col
      },
      selectable: player.id === PLAYER1.id,
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

export function isOdd(value: number): boolean {
  return value % 2 ? true : false;
}
