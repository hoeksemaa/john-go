//import axios from "axios"
import { useState, useEffect } from "react"
import { createGame, makeMove, type GameState } from "./go"
import './App.css'

function NotLoaded() {
  return <p>loading...</p>
}

function App() {
  let [gameState, setGameState] = useState(createGame())
  let [loading, setLoading] = useState(true)

  function handleClick(position: number) {
    fetch("http://localhost:3000/move", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({positionMessage: position})
    })
      .then(response => response.json())
      .then(data => {
        console.log("clicked!")
        console.log(data)
        setGameState(data)
      })
  }

  /* 
  function handleReset() {
    axios
      .post("http://localhost:3000/reset", positionMessage)
      .then(response => {
        console.log("clicked!")
        console.log(response)
        setGameState(response.data)
      })
  }
  */

  useEffect(() => {
    fetch("http://localhost:3000/game")
      .then(response => response.json())
      .then(data => {
        setGameState(data)
        setLoading(false)
      })
  }, [])

  // TODO: display the gameState, and call `makeMove` when a player clicks a button
  if (loading) {
    return <NotLoaded />
  } else {
    return (
      <div>
        <h1>
          Tic Tac Toe
        </h1>
        <div className="grid">
          <p className="cell" onClick={() => handleClick(0)}>{gameState.board[0]}</p>
          <p className="cell" onClick={() => handleClick(1)}>{gameState.board[1]}</p>
          <p className="cell" onClick={() => handleClick(2)}>{gameState.board[2]}</p>
          <p className="cell" onClick={() => handleClick(3)}>{gameState.board[3]}</p>
          <p className="cell" onClick={() => handleClick(4)}>{gameState.board[4]}</p>
          <p className="cell" onClick={() => handleClick(5)}>{gameState.board[5]}</p>
          <p className="cell" onClick={() => handleClick(6)}>{gameState.board[6]}</p>
          <p className="cell" onClick={() => handleClick(7)}>{gameState.board[7]}</p>
          <p className="cell" onClick={() => handleClick(8)}>{gameState.board[8]}</p>
        </div>
        <p>current player: {gameState.currentPlayer}</p>
        <p>winner: {gameState.winner}</p>
        <div className="buttonDiv">
          <button onClick={() => handleReset()}>reset</button>
        </div>
      </div>
    )
  }
}

/* not sure why this function was added but keeping for now
function getInitialGame() {
  let initialGameState = createGame()
  return initialGameState
}
*/ 

export default App;

/*
type cellProps = {
  position: number
}

function Cell({ position }: cellProps) {

  return (
    <p className="cell" onClick={() => handleClick(position)}>{gameState.board[position]}</p>
  )
}
*/

/*
        <p className="cell" onClick={() => handleClick(1)}>{gameState.board[1]}</p>
        <p className="cell" onClick={() => handleClick(2)}>{gameState.board[2]}</p>
        <p className="cell" onClick={() => handleClick(3)}>{gameState.board[3]}</p>
        <p className="cell" onClick={() => handleClick(4)}>{gameState.board[4]}</p>
        <p className="cell" onClick={() => handleClick(5)}>{gameState.board[5]}</p>
        <p className="cell" onClick={() => handleClick(6)}>{gameState.board[6]}</p>
        <p className="cell" onClick={() => handleClick(7)}>{gameState.board[7]}</p>
        <p className="cell" onClick={() => handleClick(8)}>{gameState.board[8]}</p>
*/