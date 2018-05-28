import * as React from 'react';
import { WinOverlay, WinBox, WinTitle, Button } from './App.style';
import { PLAYER1, PLAYER2, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, GameState, MovementDirection } from './game-constants';
import { IPlayer, IPiece } from './game-models';
import Icon from 'react-fa';
import { Board } from './board.component';

class App extends React.Component {
  public state = { 
    players: [
      PLAYER1,
      PLAYER2
    ],
    turnOwner: PLAYER1,
    boardMatrix: this.mountBoardMatrix(PLAYER1, PLAYER2),
    gameState: GameState.PieceSelect,
    currentPiece: {coordinates: {row: 0, col: 0}, selectable: false, king: false},
    canEndTurn: false
  }
  
  public render() {

    return (
      <React.Fragment>
        <Board
          boardMatrix={this.state.boardMatrix}
          onClick={this.handleClick}
        />
        {this.state.canEndTurn ? <Button onClick={this.handleEndTurn}>End turn</Button> : null}
        {this.state.gameState === GameState.Won ? 
        <React.Fragment>
          <WinOverlay/>
          <WinBox>
            <WinTitle>Player {this.state.turnOwner.id} won!</WinTitle>
            <Button onClick={this.handlePlayAgain}>Play again <Icon name='undo'/></Button>
          </WinBox>
        </React.Fragment>
         : null}
      </React.Fragment>
    );
  }

  private handleEndTurn = () => {
    const turnOwner = this.nextTurnOwner(this.state.turnOwner, this.state.players);
    const gameState = GameState.PieceSelect;
    let boardMatrix = this.clearHighlights(this.state.boardMatrix);
    boardMatrix = this.highlightPlayer(boardMatrix, turnOwner);            
    const canEndTurn = false;
    this.setState({turnOwner, gameState, boardMatrix, canEndTurn});
  }

  private handlePlayAgain = () => {
    this.setState({ 
      players: [
        PLAYER1,
        PLAYER2
      ],
      turnOwner: PLAYER1,
      boardMatrix: this.mountBoardMatrix(PLAYER1, PLAYER2),
      gameState: GameState.PieceSelect,
      currentPiece: {coordinates: {row: 0, col: 0}, selectable: false, king: false}
    });
    
  }

  private handleClick = (selectedPiece: IPiece) => {
    let boardMatrix = this.state.boardMatrix;
    let gameState = this.state.gameState;
    let currentPiece: IPiece = this.state.currentPiece;
    let turnOwner = this.state.turnOwner;
    let canEndTurn = this.state.canEndTurn;
    const players = this.state.players;
    switch (gameState) {
      case (GameState.PieceSelect):
        boardMatrix = this.highlightPossibleMovement(boardMatrix, selectedPiece, false);
        gameState = GameState.PossibleMovement;
        currentPiece = selectedPiece; 
        break;
      case (GameState.PossibleMovement):
        if (selectedPiece.owner === turnOwner) {
          boardMatrix = this.clearHighlights(boardMatrix);
          boardMatrix = this.highlightPlayer(boardMatrix, turnOwner);
          boardMatrix = this.highlightPossibleMovement(boardMatrix, selectedPiece, false);
          currentPiece = selectedPiece;
        } else {
          boardMatrix = this.movePiece(boardMatrix, selectedPiece, currentPiece);
          const killPiece = this.killPiece(boardMatrix, selectedPiece);
          boardMatrix = killPiece.boardMatrix;
          boardMatrix = this.clearHighlights(boardMatrix);
          if (killPiece.killed) {
            if (this.checkIfWon(boardMatrix, players)) {
              gameState = GameState.Won;
              break;
            }
            boardMatrix = this.highlightPossibleMovement(boardMatrix, selectedPiece, true);
          }
          if (this.hasKillablePieces(boardMatrix)) {
            currentPiece = selectedPiece;
            canEndTurn = true;
          } else {
            canEndTurn = false;
            turnOwner = this.nextTurnOwner(turnOwner, players);
            gameState = GameState.PieceSelect;
            boardMatrix = this.clearHighlights(boardMatrix);
            boardMatrix = this.highlightPlayer(boardMatrix, turnOwner);
          }
        }
        break;
      case (GameState.Won):
        break;
    }
    this.setState({ boardMatrix, gameState, turnOwner, currentPiece, canEndTurn});
  }

  private checkIfWon(boardMatrix: IPiece[][], players: IPlayer[]) {
    for (const player of players) {
      if (boardMatrix.some(boardRow => boardRow.some(piece => piece.owner === player)) === false) {
        return true;
      }
    }
    return false;
  }

  private nextTurnOwner(currentTurnOwner: IPlayer, players: IPlayer[]): IPlayer {
    const index = players.indexOf(currentTurnOwner);
    return players[index + 1 >= players.length ? 0 : index + 1];
  }

  private movePiece(boardMatrix: IPiece[][], selectedMovement: IPiece, currentPiece: IPiece) {
    boardMatrix[selectedMovement.coordinates.row][selectedMovement.coordinates.col].owner = currentPiece.owner;
    boardMatrix[selectedMovement.coordinates.row][selectedMovement.coordinates.col].king = 
      selectedMovement.coordinates.row === 0 || selectedMovement.coordinates.row === NUMBER_OF_ROWS - 1 ? true : currentPiece.king;
    boardMatrix[currentPiece.coordinates.row][currentPiece.coordinates.col].owner = undefined;
    boardMatrix[currentPiece.coordinates.row][currentPiece.coordinates.col].king = false;
    return boardMatrix;
  }

  private hasKillablePieces(boardMatrix: IPiece[][]) {
    return boardMatrix.some(boardRow => boardRow.some(piece => Boolean(piece.killableByMovement)));
  }

  private killPiece (boardMatrix: IPiece[][], selectedPiece: IPiece) {
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

  private clearHighlights(boardMatrix: IPiece[][]) {
    return boardMatrix.map(boardRow => boardRow.map(piece => {
      piece.selectable = false;
      piece.killableByMovement = undefined;
      return piece;
    }));
  }

  private highlightPlayer(boardMatrix: IPiece[][], player: IPlayer): IPiece[][] {
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

  private highlightPossibleMovement(boardMatrix: IPiece[][], piece: IPiece, onlyKillable: boolean): IPiece[][] {
    if (piece.owner) {
      if (piece.king) {
        boardMatrix = this.highlightMovement(boardMatrix, piece, onlyKillable, true);
        boardMatrix = this.highlightMovement(boardMatrix, piece, onlyKillable, false);
      } else if(piece.owner.direction === MovementDirection.Upwards) {
        boardMatrix = this.highlightMovement(boardMatrix, piece, onlyKillable, true);
      } else {
        boardMatrix = this.highlightMovement(boardMatrix, piece, onlyKillable, false);
      }
    }
    return boardMatrix;
  }

  private highlightMovement(boardMatrix: IPiece[][], piece: IPiece, onlyKillable: boolean, upwards: boolean): IPiece[][] {
    piece.owner = piece.owner ? piece.owner : PLAYER1;
    const nextRow = upwards ? piece.coordinates.row - 1 : piece.coordinates.row + 1;
    const checkNext = upwards ? nextRow >= 0 : nextRow < NUMBER_OF_ROWS;
    const nextNextRow = upwards ? piece.coordinates.row - 2 : piece.coordinates.row + 2;
    const checkNextNext = upwards ? nextNextRow >= 0 : nextNextRow < NUMBER_OF_ROWS;
    const rightCol = piece.coordinates.col + 1;
    const checkRightNode = rightCol < NUMBER_OF_COLUMNS;
    const leftCol = piece.coordinates.col - 1;
    const checkLeftNode = leftCol >= 0;
    if (checkNext && checkRightNode) {
      const rightNode = boardMatrix[nextRow][rightCol].owner;
      if (!rightNode) {
        if (!onlyKillable) {
          boardMatrix[nextRow][rightCol].selectable = true;
        }
      } else if(rightNode.id !== piece.owner.id) {
        const rightRightCol = piece.coordinates.col + 2;
        const checkRightRightNode = rightRightCol < NUMBER_OF_COLUMNS;
        if(checkNextNext && checkRightRightNode) {
          if (!boardMatrix[nextNextRow][rightRightCol].owner) {
            boardMatrix[nextRow][rightCol].killableByMovement = boardMatrix[nextNextRow][rightRightCol].coordinates;
            boardMatrix[nextNextRow][rightRightCol].selectable =  true;
          }
        }
      }
    }
    if (checkNext && checkLeftNode) {
      const leftNode = boardMatrix[nextRow][leftCol].owner;
      if (!leftNode) {
        if (!onlyKillable) {
          boardMatrix[nextRow][leftCol].selectable = true;
        }
      } else if(leftNode.id !== piece.owner.id) {
        const leftLeftCol = piece.coordinates.col - 2;
        const checkLeftLeftNode = leftLeftCol >= 0;
        if(checkNextNext && checkLeftLeftNode) {
          if (!boardMatrix[nextNextRow][leftLeftCol].owner) {
            boardMatrix[nextRow][leftCol].killableByMovement = boardMatrix[nextNextRow][leftLeftCol].coordinates;
            boardMatrix[nextNextRow][leftLeftCol].selectable =  true;
          }
        }
      }
    }
    return boardMatrix;
  }

  private mountBoardMatrix(player1: IPlayer, player2: IPlayer) {
    const boardMatrix = [];
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
      const boardRow = [];
      for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
        if(i < 3 && ((!isOdd(i) && isOdd(j)) || isOdd(i) && !isOdd(j))) {
          boardRow.push(this.constructPiece(i, j, player2));
        } else if (i > 4 && ((!isOdd(i) && isOdd(j)) || isOdd(i) && !isOdd(j))) {
          boardRow.push(this.constructPiece(i, j, player1));
        } else {
          boardRow.push(this.constructPiece(i, j));
        }
      }
      boardMatrix.push(boardRow);
    }
    return boardMatrix;
  }

  private constructPiece(row: number, col: number, player?: IPlayer): IPiece {
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
}



function isOdd(value: number): boolean {
  return value % 2 ? true : false;
}

export default App;
