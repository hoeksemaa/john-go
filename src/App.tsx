import { useState } from "react"
import { createGame, makeMove, type GameState } from "./go"
import './App.css'

function App() {
  let [gameState, setGameState] = useState(getInitialGame())

  function handleClick(position: number) {
    const nextState = makeMove(gameState, position)
    setGameState(nextState)
  }

  // TODO: display the gameState, and call `makeMove` when a player clicks a button
  return (
    <div>
      <h1>
        Tic Tac Toe
      </h1>
      <div className="grid">
        <p className="cell" onClick={() => handleClick(0)}>{gameState.board[0] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(1)}>{gameState.board[1] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(2)}>{gameState.board[2] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(3)}>{gameState.board[3] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(4)}>{gameState.board[4] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(5)}>{gameState.board[5] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(6)}>{gameState.board[6] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(7)}>{gameState.board[7] ?? "_"}</p>
        <p className="cell" onClick={() => handleClick(8)}>{gameState.board[8] ?? "_"}</p>
      </div>
      <p>current player: {gameState.currentPlayer}</p>
      <p>winner: {gameState.winner}</p>
    </div>
  )
}

function getInitialGame() {
  let initialGameState = createGame()
  return initialGameState
}

export default App;
