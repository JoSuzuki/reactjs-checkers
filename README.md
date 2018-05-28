# Reactjs-checkers
![image](https://user-images.githubusercontent.com/9583920/40598642-610a6a8c-621f-11e8-8701-f637fbb1a921.png)

## Description
This is a simple implementation of a local checkers game, if you want to see it running you can do it here [https://reactjs-checkers.herokuapp.com/](https://reactjs-checkers.herokuapp.com/) (it may take a while, since the server in heroku tends to sleep)

## Structure
This game has 8 important files

- App.style.tsx - This file contains the style of the app: divs and buttons.

- App.test.tsx - This file contains the tests of the app, mostly tests the functions of `game-logic.tsx`

- App.tsx - This file contains the game state and handles the events of the game

- board.component.tsx - This file contains the view logic, its resposability is to display the board it was given by the props

- board.component.style.tsx - This file contains the style of the board (implemented as a table)

- game-constants.tsx - This file contains the constants of the game such as the `NUMBER_OF_ROWS`, `NUMBER_OF_COLUMNS`, `MovementDirection` of the game

- game-logic.tsx - This file contain all the functions necessary to execute the game

- game-models.tsx - This file contais all the data models used in the game


## Classes, Models and Enums

There 5 classes were implemented
```typescript
export enum MovementDirection {
  Upwards,
  Downwards
}

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

export enum GameState {
  PieceSelect,
  PossibleMovement,
  Won
}

export interface AppState {
  players: IPlayer[];
  turnOwner: IPlayer;
  boardMatrix: IPiece[][]
  gameState: GameState;
  currentPiece: IPiece;
  canEndTurn: boolean;
}
```

## How does it work?

The game has three well defined faces, which can be seen in the `GameState`, PieceSelect, PossibleMovement and Won. There is an implicit initial state, which is called via React lifecycle hook `componentDidMount()`.

## Initial state
- Clears all selectable pieces
- Makes Player1 pieces selectable

### Won
![image](https://user-images.githubusercontent.com/9583920/40598825-66640f5a-6220-11e8-89a8-1f6544a6f34e.png)

This is the simplest state, the only possible action here is restarting the app.

### PieceSelect
![image](https://user-images.githubusercontent.com/9583920/40598642-610a6a8c-621f-11e8-8701-f637fbb1a921.png)

In this state all the player can click the piece which he wants to select. Upon selection
- It shows the possible movements for that piece via `highlightPossibleMovement`
- Changes the gamestate to PossibleMovement
- Changes the currentPiece to the selectedPiece

### PossibleMovement
![image](https://user-images.githubusercontent.com/9583920/40598679-92936cc0-621f-11e8-899d-dc1271f32333.png)
In this state the player can either click one of his pieces or a possible empty space shown in the board.
Upon selecting one of his pieces:
- It clears all selectable pieces
- Makes all player's pieces selectable again
- Makes that pieces possible movements selectable via `highlightPossibleMovement`

Upon selecting one possible empty space:
- It moves the piece to the selected empty space
- If the movement was should to kill another piece, kills the piece
- Clears all selectable pieces
- If the movement killed another piece it can go to one of two paths:
1. Killed piece -> sees if it can kill more pieces -> if it can -> makes those pieces selectable, if it cant -> end turn
2. Didnt kill -> end turn 

Upon ending turn:
- selects next player
- changes gameState to PieceSelect
- clears all selectable pieces
- makes the player's pieces selectable
