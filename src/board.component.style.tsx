import styled from 'styled-components';
import { IPiece } from './game-models';
import { Icon } from 'react-fa';

export const BoardStyled = styled.table`
/* margin: auto; */
border-collapse: collapse;
border: none;
`;

export const BoardRow = styled.tr`
`;

export const BoardSquare = styled.td`
height: 40px;
width: 40px;
border-style: solid;
border-width: 2px;
border-color: #734223;
align-items: center;
justify-content: center;
text-align: center;
background-color: #995931;

${BoardRow}:nth-child(odd) > &:nth-child(odd) {
  background-color: #ffde98;
}
${BoardRow}:nth-child(even) > &:nth-child(even) {
  background-color: #ffde98;
}
`;

export const Piece = styled.div`
margin: auto;
height: 30px;
width: 30px;
border-radius: 50%;
transition-duration: 0.15s;
box-shadow: ${(props: Partial<IPiece>) => props.owner ? `2px 2px #6b3f1f` : null};
background-color: ${(props: Partial<IPiece>) => props.owner ? props.owner.color : 'transparent'};
border-color: ${(props: Partial<IPiece>) => props.selectable ? 'white' : 'transparent'};
border-style: solid;
border-width: 2px;
cursor: ${(props: Partial<IPiece>) => props.selectable ? 'pointer' : 'default'};
`;

export const IconStyled = styled(Icon)`
margin: 7px 2px 0px 0px;
color: white;
`;