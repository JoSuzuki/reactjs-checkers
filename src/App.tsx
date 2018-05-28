import * as React from 'react';
import Icon from 'react-fa';
import { Button, WinBox, WinOverlay, WinTitle } from './App.style';
import { Board } from './board.component';
import { GameState, PLAYER1, PLAYER2 } from './game-constants';
import { checkIfWon, clearHighlights, hasKillablePieces, highlightPlayer, highlightPossibleMovement, killPieceFn, mountBoardMatrix, movePiece, nextTurnOwner } from './game-logic';
import { IPiece } from './game-models';

class App extends React.Component {
  public state = { 
    players: [
      PLAYER1,
      PLAYER2
    ],
    turnOwner: PLAYER1,
    boardMatrix: mountBoardMatrix(PLAYER1, PLAYER2),
    gameState: GameState.PieceSelect,
    currentPiece: {coordinates: {row: 0, col: 0}, selectable: false, king: false},
    canEndTurn: false
  }

  public componentDidMount() {
    let boardMatrix = clearHighlights(this.state.boardMatrix);
    boardMatrix = highlightPlayer(boardMatrix, this.state.turnOwner);
    this.setState({boardMatrix});
  }
  
  public render() {

    return (
      <React.Fragment>
        <Board
          boardMatrix={this.state.boardMatrix}
          onClick={this.handlePieceClick}
        />
        {this.state.canEndTurn ? <Button onClick={this.handleEndTurn}>End turn</Button> : null}
        {this.state.gameState === GameState.Won ? 
        <React.Fragment>
          <WinOverlay/>
          <WinBox>
            <WinTitle>{this.state.turnOwner.id} won!</WinTitle>
            <Button onClick={this.handlePlayAgain}>Play again <Icon name='undo'/></Button>
          </WinBox>
        </React.Fragment>
         : null}
      </React.Fragment>
    );
  }

  private handleEndTurn = () => {
    const turnOwner = nextTurnOwner(this.state.turnOwner, this.state.players);
    const gameState = GameState.PieceSelect;
    let boardMatrix = clearHighlights(this.state.boardMatrix);
    boardMatrix = highlightPlayer(boardMatrix, turnOwner);
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
      boardMatrix: mountBoardMatrix(PLAYER1, PLAYER2),
      gameState: GameState.PieceSelect,
      currentPiece: {coordinates: {row: 0, col: 0}, selectable: false, king: false}
    });
    
  }

  private handlePieceClick = (selectedPiece: IPiece) => {
    let boardMatrix = this.state.boardMatrix;
    let gameState = this.state.gameState;
    let currentPiece: IPiece = this.state.currentPiece;
    let turnOwner = this.state.turnOwner;
    let canEndTurn = this.state.canEndTurn;
    const players = this.state.players;
    switch (gameState) {
      case (GameState.PieceSelect):
        boardMatrix = highlightPossibleMovement(boardMatrix, selectedPiece, false);
        gameState = GameState.PossibleMovement;
        currentPiece = selectedPiece; 
        break;
      case (GameState.PossibleMovement):
        if (selectedPiece.owner === turnOwner) {
          boardMatrix = clearHighlights(boardMatrix);
          boardMatrix = highlightPlayer(boardMatrix, turnOwner);
          boardMatrix = highlightPossibleMovement(boardMatrix, selectedPiece, false);
          currentPiece = selectedPiece;
        } else {
          boardMatrix = movePiece(boardMatrix, selectedPiece, currentPiece);
          const killPiece = killPieceFn(boardMatrix, selectedPiece);
          boardMatrix = killPiece.boardMatrix;
          boardMatrix = clearHighlights(boardMatrix);
          if (killPiece.killed) {
            if (checkIfWon(boardMatrix, players)) {
              gameState = GameState.Won;
              break;
            }
            boardMatrix = highlightPossibleMovement(boardMatrix, selectedPiece, true);
          }
          if (hasKillablePieces(boardMatrix)) {
            currentPiece = selectedPiece;
            canEndTurn = true;
          } else {
            canEndTurn = false;
            turnOwner = nextTurnOwner(turnOwner, players);
            gameState = GameState.PieceSelect;
            boardMatrix = clearHighlights(boardMatrix);
            boardMatrix = highlightPlayer(boardMatrix, turnOwner);
          }
        } 
        break;
      case (GameState.Won):
        break;
    }
    this.setState({ boardMatrix, gameState, turnOwner, currentPiece, canEndTurn});
  }

}

export default App;
