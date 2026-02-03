import { useState, useEffect } from "react";
import { createGame, makeMove, type GameState } from "./go";

function App() {
  let [gameState, setGameState] = useState(getInitialGame())

  function handleClick(position: number) {
    const nextState = makeMove(gameState, position)
    setGameState(nextState)
  }

  // TODO: display the gameState, and call `makeMove` when a player clicks a button
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td onClick={() => handleClick(0)}>{gameState.board[0] ?? "_"}</td>
            <td onClick={() => handleClick(1)}>{gameState.board[1] ?? "_"}</td>
            <td onClick={() => handleClick(2)}>{gameState.board[2] ?? "_"}</td>
          </tr>
          <tr>
            <td onClick={() => handleClick(3)}>{gameState.board[3] ?? "_"}</td>
            <td onClick={() => handleClick(4)}>{gameState.board[4] ?? "_"}</td>
            <td onClick={() => handleClick(5)}>{gameState.board[5] ?? "_"}</td>
          </tr>
          <tr>
            <td onClick={() => handleClick(6)}>{gameState.board[6] ?? "_"}</td>
            <td onClick={() => handleClick(7)}>{gameState.board[7] ?? "_"}</td>
            <td onClick={() => handleClick(8)}>{gameState.board[8] ?? "_"}</td>
          </tr>
        </tbody>
      </table>
      <p>current player: {gameState.currentPlayer}</p>
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