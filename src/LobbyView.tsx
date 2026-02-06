import { useState, useEffect } from "react"
import { type GameID, type Games } from './types'
import type { GameState } from "./go"

type LobbyViewProps = {
    onGameEnter: (id: GameID) => void
}

type GamesList = GameState[]

function LobbyView({ onGameEnter } : LobbyViewProps) {
    const [gamesList, setGamesList] = useState<GamesList>([])

    async function handleCreateGame() {
        const response = await fetch("http://localhost:3000/create", {
            method: "POST"
        })
        const data = await response.json()
        //console.log(data)
        onGameEnter(data.id)
    }

    async function handleEnterGame(id: string) {
        onGameEnter(id)
    }

    async function loadGamesList() {
        // get games data as list
        const response = await fetch("http://localhost:3000/list")
        const data = await response.json()
        
        //console.log('ORIGINAL GAMES: ', gamesList)

        console.log('LOADING...')
        console.log(data)
        console.log('typeof data: ', typeof data)
        console.log('loaded!')

        // create new map from data
        //const convertedData = Object.entries(data)
        //console.log('convertedData: ', convertedData)
        //const newGamesMap = new Map<string, GameState>(convertedData)
        

        //const gameStates = data.values()
        //console.log('gameStates: ', gameStates)
        //for (const g in gameStates) {
        //    games.set(g.id, g)
        //}
        
        //
        setGamesList(data)
        console.log('gamesList: ', gamesList)
    }
    
    useEffect(() => {
        loadGamesList()
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