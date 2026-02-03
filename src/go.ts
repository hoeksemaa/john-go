export type Player = "X" | "O";

export type Cell = Player | null;

// Board is a 3x3 grid, represented as a 9-element array.
// Indices map to positions:
//  0 | 1 | 2
//  ---------
//  3 | 4 | 5
//  ---------
//  6 | 7 | 8
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export type GameState = {
  board: Board;
  currentPlayer: Player;
};

export function createGame(): GameState {
  return {
    board: [null, null, null, null, null, null, null, null, null],
    currentPlayer: "X",
  };
}

export function makeMove(state: GameState, position: number): GameState {

  // ERROR CHECKING
  // error 1. check whether position is number
  if (!Number.isInteger(position)){
    throw new Error("Position must be an integer")
  }

  // error 2. check whether position is in bounds
  if (position > 8 || position < 0){
    throw new Error("Position must be between 0 and 8")
  }

  // error 3. check whether square is occupied
  if (state.board[position] != null)
    throw new Error("Position is already occupied")

  // CHECK FOR VICTORY
  if (getWinner(state)){
    throw new Error("Game is already over")
  }

  // IMPLEMENT THE MOVE
  // create next gamestate
  const nextState = structuredClone(state)

  // implement move
  nextState.board[position] = nextState.currentPlayer

  // switch player
  if (nextState.currentPlayer == "X") {
    nextState.currentPlayer = "O"
  } else {
    nextState.currentPlayer = "X"
  }

  return nextState
}

export function getWinner(state: GameState): Player | null {
  // check verticals
  for (let i = 0; i < 3; i++){
    if ((state.board[i] == state.board[i+3]) && (state.board[i] == state.board[i+6]) && state.board[i]) {
      return state.board[i]
    }
  }

  // check horizontals
  for (let i = 0; i < 9; i+=3){
    if ((state.board[i] == state.board[i+1]) && (state.board[i] == state.board[i+2]) && state.board[i]) {
      return state.board[i]
    }
  }

  // check positive slope diagonal
  if ((state.board[0] == state.board[4]) && (state.board[0] == state.board[8]) && state.board[4]){
      return state.board[4]
  }

  // check negative slope diagonal
  if ((state.board[2] == state.board[4]) && (state.board[2] == state.board[6]) && state.board[4]){
      return state.board[4]
  }
  
  // no winners
  return null;
}
