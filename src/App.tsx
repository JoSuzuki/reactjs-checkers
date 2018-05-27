import * as React from 'react';
import { BoardRow, BoardSquare, BoardStyled, Piece } from './App.style';

class App extends React.Component {
  public state = { 
    boardMatrix: [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
    ], 
  }

  

  public render() {
    return (
      <React.Fragment>
        <Board
          boardMatrix={this.state.boardMatrix}
        />
      </React.Fragment>
    );
  }
}

interface IBoardProps {
  boardMatrix: any[][]
}

function Board(props: IBoardProps) {
  return(
    <BoardStyled>
      {props.boardMatrix.map((boardRow, rowIndex) => {
        return(
          <BoardRow key={'Row' + rowIndex}>
            {boardRow.map((piece, squareIndex) => {
              return(   
              <BoardSquare key={'Square' + rowIndex + squareIndex}>
                <Piece/>
              </BoardSquare>
              )
            })}
          </BoardRow>
        )
      })}
    </BoardStyled>
  )

}

export default App;
