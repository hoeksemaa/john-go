import { useState, useEffect } from "react";
import { createGame, makeMove } from "./go";

function App() {
  let [gameState, setGameState] = useState(getInitialGame())

  // TODO: display the gameState, and call `makeMove` when a player clicks a button
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{gameState.board[0] ?? "_"}</td><td>{gameState.board[1] ?? "_"}</td><td>{gameState.board[2] ?? "_"}</td>
          </tr>
          <tr>
            <td>{gameState.board[3] ?? "_"}</td><td>{gameState.board[4] ?? "_"}</td><td>{gameState.board[5] ?? "_"}</td>
          </tr>
          <tr>
            <td>{gameState.board[6] ?? "_"}</td><td>{gameState.board[7] ?? "_"}</td><td>{gameState.board[8] ?? "_"}</td>
          </tr>
        </tbody>
      </table>
      <p>Hello World! current player: {gameState.currentPlayer}</p>
    </div>
  )
}

function getInitialGame() {
  let initialGameState = createGame()
  initialGameState = makeMove(initialGameState, 3)
  initialGameState = makeMove(initialGameState, 0)
  return initialGameState
}

export default App;