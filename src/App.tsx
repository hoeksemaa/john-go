import { useState } from "react"
import LobbyView from './LobbyView'
import GameView from './GameView'
import { type GameID } from './types'
import './App.css'

type AppView = 'lobby' | 'game'

function App() {
  const [appView, setAppView] = useState<AppView>('lobby')
  const [gameID, setGameID] = useState<GameID>(null)

  function handleGameEnter(id: GameID) {
    setGameID(id)
    setAppView('game')
  }

  function handleLobbyEnter() {
    setGameID(null)
    setAppView('lobby')
  }

  return (appView == 'lobby') ? 
    <LobbyView onGameEnter={handleGameEnter}/>
    : 
    <GameView gameID={gameID} onLobbyEnter={handleLobbyEnter}/>
}

export default App;