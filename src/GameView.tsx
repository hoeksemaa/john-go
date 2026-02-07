import { useEffect, useState } from 'react'
import { createGame, type GameState } from "./go"
import { type GameID } from './types'

//const port = parseInt(process.env.PORT as string) || 3000
//const port = process.env.PORT || 3000
//const port = 3000
//const port = 11000

type GameViewProps = {
    gameID: GameID,
    onLobbyEnter: () => void
}

function GameView({ gameID, onLobbyEnter } : GameViewProps) {
    const [gameState, setGameState] = useState(createGame())

    async function handleMove(index: number, id: GameID) {
        const response = await fetch(`/move/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({position: index})
        })
        const data: GameState = await response.json()
        setGameState(data)
    }

    async function getGameState(id: GameID) {
        const response = await fetch(`/game/${id}`)
        const data: GameState = await response.json()
        setGameState(data)
    }

    function handleBackToLobby() {
        onLobbyEnter()
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getGameState(gameID)
        }, 500)

        return () => {clearInterval(interval)}
    }, [])

    return (
        <>
            <h1>
            Tic Tac Toe
            </h1>
            <div className="grid">
            <p className="cell" onClick={() => handleMove(0, gameID)}>{gameState.board[0]}</p>
            <p className="cell" onClick={() => handleMove(1, gameID)}>{gameState.board[1]}</p>
            <p className="cell" onClick={() => handleMove(2, gameID)}>{gameState.board[2]}</p>
            <p className="cell" onClick={() => handleMove(3, gameID)}>{gameState.board[3]}</p>
            <p className="cell" onClick={() => handleMove(4, gameID)}>{gameState.board[4]}</p>
            <p className="cell" onClick={() => handleMove(5, gameID)}>{gameState.board[5]}</p>
            <p className="cell" onClick={() => handleMove(6, gameID)}>{gameState.board[6]}</p>
            <p className="cell" onClick={() => handleMove(7, gameID)}>{gameState.board[7]}</p>
            <p className="cell" onClick={() => handleMove(8, gameID)}>{gameState.board[8]}</p>
            </div>
            <p>current player: {gameState.currentPlayer}</p>
            <p>winner: {gameState.winner}</p>
            <div className='buttonDiv'>
                <button onClick={handleBackToLobby}>Back to Lobby</button>
            </div>
        </>
    )
}

export default GameView