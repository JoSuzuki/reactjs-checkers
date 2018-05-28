import * as React from 'react';
import { BoardRow, BoardSquare, Piece, BoardStyled, IconStyled } from './App.style';
import { IPiece } from './game-models';

interface IBoardProps {
  onClick: (piece: IPiece) => void;
  boardMatrix: any[][]
}

export function Board(props: IBoardProps) {
  return(
    <BoardStyled>
      <tbody>
      {props.boardMatrix.map((boardRow, rowIndex) => {
        return(
          <BoardRow key={'Row' + rowIndex}>
            {boardRow.map((piece, colIndex) => {
              const handleClick = () => piece.selectable ? props.onClick(piece) : null;
              return(   
              <BoardSquare key={'Square' + rowIndex + colIndex}>
                <Piece 
                  onClick={handleClick}
                  owner={piece.owner}
                  selectable={piece.selectable}
                >
                  {piece.king ? <IconStyled name='rocket'/> : null}
                </Piece>
              </BoardSquare>
              )
            })}
          </BoardRow>
        )
      })}
      </tbody>
    </BoardStyled>
  )

}