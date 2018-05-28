import { MovementDirection } from "./game-constants";

export interface IPlayer {
  id: string;
  color: string;
  direction: MovementDirection;
}

export interface IPiece {
  owner?: IPlayer;  
  coordinates: ICoordinates;
  killableByMovement?: ICoordinates;
  selectable: boolean;
  king: boolean;
}

export interface ICoordinates {
  row: number;
  col: number;
}