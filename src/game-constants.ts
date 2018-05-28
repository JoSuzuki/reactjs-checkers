import { IPlayer } from "./game-models";

export const NUMBER_OF_ROWS = 8;
export const NUMBER_OF_COLUMNS = 8;

export enum MovementDirection {
  Upwards,
  Downwards
}

export const PLAYER1: IPlayer = {
  id: 0,
  color: '#c92735',
  direction: MovementDirection.Upwards,
}

export const PLAYER2: IPlayer = {
  id: 1,
  color: '#403f3f',  
  direction: MovementDirection.Downwards,
}

export enum GameState {
  PieceSelect,
  PossibleMovement,
  Won
}

