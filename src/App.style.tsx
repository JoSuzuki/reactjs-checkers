import styled from 'styled-components';

export const BoardStyled = styled.table`
  /* margin: auto; */
  border-collapse: collapse;
`;

export const BoardRow = styled.tr`
`;

export const BoardSquare = styled.td`
  height: 40px;
  width: 40px;
  border-style: solid;
  border-width: 2px;
  border-color: gray;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${BoardRow}:nth-child(odd) > &:nth-child(odd) {
    background-color: blue;
  }
  ${BoardRow}:nth-child(even) > &:nth-child(even) {
    background-color: blue;
  }
`;

export const Piece = styled.div`
  margin: auto;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: red;
`;
