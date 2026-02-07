import { useState, useEffect } from "react"
import { type GameID } from './types'
import type { GameState } from "./go"

const port = process.env.PORT || 3000

type LobbyViewProps = {
    onGameEnter: (id: GameID) => void
}

type GamesList = GameState[]

function LobbyView({ onGameEnter } : LobbyViewProps) {
    const [gamesList, setGamesList] = useState<GamesList>([])

    async function handleCreateGame() {
        const response = await fetch(`http://localhost:${port}/create`, {
            method: "POST"
        })
        const data = await response.json()
        onGameEnter(data.id)
    }

    async function handleEnterGame(id: string) {
        onGameEnter(id)
    }

    async function loadGamesList() {
        const response = await fetch(`http://localhost:${port}/list`)
        const data = await response.json()
        setGamesList(data)
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            loadGamesList()
        }, 1000)
        return () => {clearInterval(interval)}
    }, [])

    return (
        <>
            <h1>Lobby</h1>
            {gamesList.map((game) => {
                return (
                    <button onClick={() => handleEnterGame(game.id)}>
                        {game.id}
                    </button>
                )
            })}
            <button onClick={handleCreateGame}>Create Game</button>
        </>
    )
}

export default LobbyView