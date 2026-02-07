import { useState, useEffect } from "react"
import { type GameID } from './types'
import type { GameState } from "./go"

//const port = parseInt(process.env.PORT as string) || 3000
//const port = process.env.PORT || 3000
//const port = 3000
//const port = 11000

type LobbyViewProps = {
    onGameEnter: (id: GameID) => void
}

type GamesList = GameState[]

function LobbyView({ onGameEnter } : LobbyViewProps) {
    const [gamesList, setGamesList] = useState<GamesList>([])

    async function handleCreateGame() {
        const response = await fetch(`/create`, {
            method: "POST"
        })
        const data = await response.json()
        onGameEnter(data.id)
    }

    async function handleEnterGame(id: string) {
        onGameEnter(id)
    }

    async function loadGamesList() {
        const response = await fetch(`/list`)
        const data = await response.json()
        setGamesList(data)
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            loadGamesList()
        }, 500)
        return () => {clearInterval(interval)}
    }, [])

    return (
        <div>
            <h1>Lobby</h1>
            {gamesList.map((game) => {
                return (
                    <div className="buttonDiv">
                        <button onClick={() => handleEnterGame(game.id)}>
                            game {game.id.slice(0, 3)}
                        </button>
                    </div>
                )
            })}
            <div className="buttonDiv">
                <button onClick={handleCreateGame}>Create Game</button>
            </div>
        </div>
    )
}

export default LobbyView