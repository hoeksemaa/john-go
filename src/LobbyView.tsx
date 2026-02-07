import { useState, useEffect } from "react"
import { type GameID } from './types'
import type { GameState } from "./go"

const COLOR_CHANGE_INTERVAL = 1000 // milliseconds

type LobbyViewProps = {
    onGameEnter: (id: GameID) => void
}

type GamesList = GameState[]

function LobbyView({ onGameEnter } : LobbyViewProps) {
    const [gamesList, setGamesList] = useState<GamesList>([])
    const [gameButtonColor, setGameButtonColor] = useState('#f000ff')

    function getRandomColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

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

    useEffect(() => {
        const colorInterval = setInterval(() => {
            setGameButtonColor(getRandomColor())
        }, COLOR_CHANGE_INTERVAL)
        return () => clearInterval(colorInterval)
    }, [])

    return (
        <div>
            <h1>Lobby</h1>
            {gamesList.map((game) => {
                return (
                    <div className="buttonDiv" key={game.id}>
                        <button
                            className="gameButton"
                            onClick={() => handleEnterGame(game.id)}
                            style={{ backgroundColor: gameButtonColor }}
                        >
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